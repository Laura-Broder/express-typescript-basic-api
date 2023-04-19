# API Documentation

This is a simple API that provides CRUD operations for users and articles with authentication and authorization.

The API is written in TypeScript and runs on Node.js with Express.

The data is stored in-memory.

## Table of Contents

- [Authentication](#authentication)
- [Routes](#routes)
  - [GET /api](#get-api)
  - [POST /api/user](#post-apiuser)
  - [POST /api/authenticate](#post-apiauthenticate)
  - [POST /api/logout](#post-apilogout)
  - [POST /api/articles](#post-apiarticles)
  - [GET /api/articles](#get-apiarticles)

## Authentication

The API uses a simple token-based authentication mechanism. To authenticate, the user needs to send an `Authorization` header with a valid token. The token can be obtained by sending a POST request to `/api/authenticate` with the user's login and password. Once authenticated, the user's information and token will be added to the request body and will be used in subsequent requests to authorized endpoints.

## Routes

### **GET /api**

Returns the database object as a JSON response.

#### Response

- `200 OK` \- Returns the database object as a JSON response.

### **POST /api/user**

Creates a new user in the database with the given `user_id`, `login`, and `password`.

#### Request Body

```js
{
  "user_id": "string",
  "login": "string",
  "password": "string"
}
```

#### Response

- `201 Created` \- The user was successfully created.
- `400 Bad Request` \- The request body is missing one or more required parameters.

### **POST /api/authenticate**

Authenticates the user with the given `login` and `password` and returns a token to be used in subsequent requests to authorized endpoints.

#### Request Body

```js
{
  "login": "string",
  "password": "string"
}
```

#### Response

- `200 OK` \- The user was successfully authenticated and a token was returned.
- `400 Bad Request` \- The request body is missing one or more required parameters.
- `401 Unauthorized` \- The user login and/or password are invalid.

### **POST /api/logout**

Logs out the authenticated user and invalidates the token.

#### Request Headers

- `Authorization`: A valid authentication token.

#### Response

- `200 OK` \- The user was successfully logged out.
- `401 Unauthorized` \- The user is not authenticated.

### **POST /api/articles**

Creates a new article in the database with the given `article_id`, `title`, `content`, `visibility`, and authenticated user's information.

#### Request Body

```js
{
  "article_id": "string",
  "title": "string",
  "content": "string",
  "visibility": "public" | "private" | "logged_in"
}
```

#### Response

- `201 Created` \- The article was successfully created.
- `400 Bad Request` \- The request body is missing one or more required parameters or the `visibility` value is invalid.
- `401 Unauthorized` \- The user is not authenticated.

### **GET /api/articles**

Returns a list of visible articles for the authenticated user.

#### Request Headers

- `Authorization`: A valid authentication token.

#### Response

- `200 OK` \- Returns a list of visible articles as a JSON response.
- `401 Unauthorized` \- The user is not authenticated.
