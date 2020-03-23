var express = require('express');
var router = express.Router();
var path = require('path');
var fs = require('fs');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'INTERVIEW-TASK' });
});


router.get('/books', (req, res, next)=>{
  fs.readFile(path.join('./public/datas/books.json'), 'utf8', (err, data)=>{
    if (err){
      res.send('error - fs');
    }else{
      data = JSON.parse(data);
      res.json(data['books']);
    }
  });
});

router.post('/books', (req, res, next)=>{
  fs.readFile(path.join('./public/datas/books.json'), 'utf8', (err, data)=>{
    if (err){
      res.send('error - rfs');
    }else{
      data = JSON.parse(data);
      data = data['books'];
      var newData = { id: data.length}
      var returnData = data;
      newData.name = req.body.name || "NAME";
      newData.category = req.body.category || "CATEGORY";
      newData.price = req.body.price || 0;
      returnData.push(newData);
      fs.writeFile((path.join('./public/datas/books.json')),JSON.stringify({"books" : returnData }), 'utf8', (err) => {
        if (err){
          res.send('error - wfs');
        }else{
          res.json(newData);
        }
      });
    }
  });
});

router.delete('/books', (req, res, next)=>{
  fs.readFile(path.join('./public/datas/books.json'), 'utf8', (err, data)=>{
    if (err){
      res.send('error - rfs');
    }else{
      data = JSON.parse(data);
      data = data['books'];
      for(var i in data.length){
        if()
      }
      returnData.push(newData);
      fs.writeFile((path.join('./public/datas/books.json')),JSON.stringify({"books" : returnData }), 'utf8', (err) => {
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
