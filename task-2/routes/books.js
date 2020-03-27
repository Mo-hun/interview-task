var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');
var mysql = require('mysql');

var dbconfig = require('../config/dbconfig');
var db = mysql.createConnection(dbconfig);

db.connect((err)=>{
  if(err){
    console.log('db-'+err);
    return;
  }
  console.log('mysql connected');
  var setquery1 = " set character_set_client = utf8";
  db.query(setquery1, (error, results)=>{
    var setquery2 = " set character_set_connection = utf8";
    db.query(setquery2, (error, results)=>{
      var setquery3 = " set character_set_results = utf8";
      db.query(setquery3, (error, results)=>{
      
      });
    });
  });
});

router.get('/', (req, res, next)=>{
    var selectsql = "SELECT * FROM `books`";
    db.query(selectsql, (error, results)=> {
        if(error){
            console.log(error);
            res.json({ code: "error" });
        }else{
            console.log(results);
            res.json(results);
        }
    });
});

router.post('/', (req, res, next)=>{
    var data = req.body; 
    var insertsql = "INSERT  INTO `books` ( `name`, `category`, `price`) VALUES (?, ?, ?)";
    db.query(insertsql,[data.name || "NONAME", data.category || "NO CATEGORY", data.price || 0], (error, results)=> {
        if(error){
            console.log(error);
            res.json({ code: "error" });
        }else{
            res.json(results);
        }
    });
});

router.put('/', (req, res, next)=>{
    var data = req.body;
    if(data.id){
        var insertsql = "INSERT INTO books (id, name, category, price) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE name = ?, category = ?, price = ?";
        db.query(insertsql,[data.id, data.name || "NO NAME", data.category || "NO CATEGORY", data.price || 0,  data.name || "NO NAME", data.category || "NO CATEGORY", data.price || 0], (error, results)=> {
            if(error){
                console.log(error);
                res.json({ code: "error" });
            }else{
                res.json(results);
            }
        });
    }
    
});

router.delete('/', (req, res, next)=>{
    var data = req.body; 
    var deletesql = "DELETE  FROM `books` WHERE `id` = ?";
    db.query(deletesql,[data.id], (error, results)=> {
        if(error){
            console.log(error);
            res.json({ code: "error" });
        }else{
            res.json({});
        }
    });
});

router.get('/convertCategoriesPrice', (req, res, next)=>{
    fs.readFile(path.join('./public/datas/books.json'), 'utf8', (err, data)=>{
        if (err){
          res.send('error - rfs');
        }else{
            var newCategory = new Array();
            var newPrice = new Array();
            data = JSON.parse(data);
            for(var i = 0; i < data.length; i++){
                if(newCategory.indexOf(data[i].category) !== -1){
                    newPrice[newCategory.indexOf(data[i].category)] += Number(data[i].price);
                }else{
                    newCategory.push(data[i].category);
                    newPrice.push(Number(data[i].price));
                }
            }
            var newData = [];
            for(var i = 0; i < newCategory.length; i++){
                newData[i] = {'category' : newCategory[i], 'price' : newPrice[i]};
            }
            fs.writeFile((path.join('./public/datas/result1.json')),JSON.stringify(newData), 'utf8', (err) => {
                if (err){
                res.send('error - wfs');
                }else{
                res.json(newData);
                }
            });
        }
      });
});

router.get('/mergeCategoriesName', (req, res, next)=>{
    fs.readFile(path.join('./public/datas/books.json'), 'utf8', (err, data)=>{
        if (err){
          res.send('error - rfs');
        }else{
            var newCategory = new Array();
            var newPrice = new Array();
            data = JSON.parse(data);
            for(var i = 0; i < data.length; i++){
                if(newCategory.indexOf(data[i].category) !== -1){
                    newPrice[newCategory.indexOf(data[i].category)] += ", "+data[i].name;
                }else{
                    newCategory.push(data[i].category);
                    newPrice.push(data[i].name);
                }
            }
            var newData = [];
            for(var i = 0; i < newCategory.length; i++){
                newData[i] = {'category' : newCategory[i], 'price' : newPrice[i]};
            }
            fs.writeFile((path.join('./public/datas/result2.json')),JSON.stringify(newData), 'utf8', (err) => {
                if (err){
                res.send('error - wfs');
                }else{
                res.json(newData);
                }
            });
        }
      });
});


module.exports = router;
