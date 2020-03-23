## First Task

### 사용 언어
- Laravel 5.6 이상 (PHP Framework)

### 내용
책 관리 `CRUD` 역할을 하는 REST API 의 라우트와 컨트롤러를 만들어주세요.
<br>
해당 과제는 세번째 과제(task-3)와 연관되어 있습니다.

### 조건
- 컨트롤러 네이밍: BookController

### 명세
GET /books

- 요청
```
{

}
```

- 응답
```
[
    {
        "id" : `ID`,
        "name" : `NAME`,
        "category" : `CATEGORY`,
        "price": `PRICE`
    },
    {
        "id" : `ID`,
        "name" : `NAME`,
        "category" : `CATEGORY`,
        "price": `PRICE`
    }...
]
```

POST /books

- 요청
```
{
    "name" : `NAME`,
    "category" : `CATEGORY`,
    "price": `PRICE`
}
```

- 응답
```
{
    "id" : `ID`,
    "name" : `NAME`
}
```

PUT /books

- 요청
```
{
    "id" : `ID`,
    "name" : `NAME`,
    "category" : `CATEGORY`,
    "price": `PRICE`
}
```

- 응답
```
{
    "id" : `ID`,
    "name" : `NAME`
}
```

DELETE /books

- 요청
```
{
    "id" : `ID`
}
```

- 응답
```
{
}
```