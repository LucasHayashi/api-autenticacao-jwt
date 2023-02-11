# API de cadastro e login com autenticação Jwt

## Sobre 

Este projeto implementa o fluxo de autenticação com JWT ( JSON Web Tokens ), em uma API de login e cadastro de usuários.

Após realizar o cadastro, é necessário realizar o login para receber um token de autenticação para consumir a rota informacoes da API. O tempo de expiração do token é de 5 minutos, e após este tempo é necessário fazer a renovação.

## Tecnologias

- [Node JS](https://nodejs.org/en/)
- [Express JS](https://expressjs.com/pt-br/)
- [JWT](https://jwt.io/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose JS](https://mongoosejs.com/)

## Endpoints

### Registro

>**Método Http : POST** https://api-autenticacao-jwt.onrender.com/user/register

```sh
curl --location --request POST 'https://api-autenticacao-jwt.onrender.com/user/register' \
--header 'Content-Type: application/json' \
--data-raw '{
  "name": "Lucas Hayashi",
  "email": "teste@gmail.com",
  "password": "Teste123@"
}'
```

### Response

```sh
{
  "message": "Usuário registrado com sucesso!"
}
```

### Login

>**Método Http : POST** localhost:3200/user/login

```sh
curl --location --request POST 'https://api-autenticacao-jwt.onrender.com/user/login' \
--header 'Content-Type: application/json' \
--data-raw '{
  "email": "teste1@gmail.com",
  "password": "Teste123@"
}'
```

### Response

```sh
{
  "message": "Logado com sucesso!",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTHVjYXMgSGF5YXNoaSIsImVtYWlsIjoidGVzdGUxQGdtYWlsLmNvbSIsImlhdCI6MTY3NjA4OTc0NywiZXhwIjoxNjc2MDkwMDQ3fQ.E0zdPG9X7GJddb_z5Pw0SXH_LC31dKBCKKf53QYsIpQ"
}
```

### Informações

>**Método Http : GET** https://api-autenticacao-jwt.onrender.com/informacoes

```sh
curl --location --request GET 'https://api-autenticacao-jwt.onrender.com/informacoes' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
```

### Response

```sh
{
  "message": "Bem vindo, Lucas Hayashi. A sua sessão termina em 11/02/2023 01:34:07"
}
```