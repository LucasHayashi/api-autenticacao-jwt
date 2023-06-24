# API de Cadastro e Login com Autenticação JWT e Refresh Tokens

## Sobre
Esta API implementa o fluxo de autenticação utilizando JSON Web Tokens (JWT) e Refresh Tokens.

## Funcionalidades
- Cadastro de usuários.
- Login para obter um token de autenticação e refresh token.
- Logout baseado em tokens.
- Renovação do token de autenticação utilizando Refresh Tokens.
- Rota de Informações para testar o usuário logado.

## Tecnologias

- [Node JS](https://nodejs.org/en/)
- [Express JS](https://expressjs.com/pt-br/)
- [JWT](https://jwt.io/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose JS](https://mongoosejs.com/)
- [Moment.js](https://momentjs.com/)

## Endpoints

### Registro

>**Método Http : POST** /user/register

```sh
curl --location --request POST 'localhost:3200/user/register' \
--header 'Content-Type: application/json' \
--data-raw '{
	"name": "Lucas",
	"email": "lucas@gmail.com",
	"password": "Teste123"
}'
```

### Response

```sh
{
  "message": "Usuário registrado com sucesso!"
}
```

### Login

>**Método Http : POST** /user/login

```sh
curl --location --request POST 'localhost:3200/user/login' \
--header 'Content-Type: application/json' \
--data-raw '{
	"email": "lucas@gmail.com",
	"password": "Teste123"
}'
```

### Response

```sh
{
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTc3N2E3M2UxOTMyZjI1YmIyNGMyNyIsIm5hbWUiOiJMdWNhcyIsImVtYWlsIjoibHVjYXNAZ21haWwuY29tIiwiaWF0IjoxNjg3NjQ4MTk2LCJleHAiOjE2ODc2NDkwOTZ9.vfajqFSI5POuG6kZD92yWqkyXIX-jtap083-rqvKhzs",
	"refreshToken": "9cb414ea60529523a1fd049569a1ceb779e299be03953bff"
}
```

### Logout

>**Método Http : POST** /user/logout

```sh
curl --location --request POST 'localhost:3200/user/logout' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
--data-raw '{
	"refreshToken": "9cb414ea60529523a1fd049569a1ceb779e299be03953bff"
}'
```

### Response

```sh
{
	"message": "Logout efetuado com sucesso!"
}
```

### Refresh Token

>**Método Http : POST** /user/refresh-token

```sh
curl --location --request POST 'localhost:3200/user/refresh-token' \
--header 'Content-Type: application/json' \
--data-raw '{
	"refreshToken": "9cb414ea60529523a1fd049569a1ceb779e299be03953bff"
}'
```

### Response

```sh
{
	"accessToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY0OTc3N2E3M2UxOTMyZjI1YmIyNGMyNyIsIm5hbWUiOiJMdWNhcyIsImVtYWlsIjoibHVjYXNAZ21haWwuY29tIiwiaWF0IjoxNjg3NjQ4MjUyLCJleHAiOjE2ODc2NDkxNTJ9.5xUaIsnQVoPQvNoYPg-p0wzLDrr0W4q7fbvVULlue-0",
	"refreshToken": "e5f76fbfdc7fc62f90f7f6e0f3986d140421e3ce5d82b096"
}
```

### Informações

>**Método Http : GET** /informacoes

```sh
curl --location --request GET 'localhost:3200/informacoes' \
--header 'Authorization: Bearer <token>' \
--header 'Content-Type: application/json' \
```

### Response

```sh
{
	"message": "Bem vindo, Lucas. A sua sessão termina em 24/06/2023, 20:25:52"
}
```

## Swagger UI

Clique no link abaixo para testar a API no SwaggerHub

>[Link da documentação](https://app.swaggerhub.com/apis-docs/LUCASHAYASHI5/autenticacao-com-jwt/1.0.0#)