# E-Commerce REST API

## Deployed on Heroku:

https://ecommerce-rest-api1.herokuapp.com/

## Made with:

- Node.js
- MongoDB Atlas and Mongoose
- Express
- JWT

## Routes:

#### Sellers:

| Routes              | HTTP Method |
| ------------------- | ----------- |
| `/sellers/register` | `POST`      |
| `/sellers/login`    | `POST`      |
| `/sellers/:id`      | `GET`       |
| `/sellers/:id`      | `PATCH`     |
| `/sellers/:id`      | `DELETE`    |

#### Users:

| Routes            | HTTP Method |
| ----------------- | ----------- |
| `/users/register` | `POST`      |
| `/users/login`    | `POST`      |
| `/users/:id`      | `GET`       |
| `/users/:id`      | `PATCH`     |
| `/users/:id`      | `DELETE`    |

#### Products:

| Routes                               | HTTP Method |
| ------------------------------------ | ----------- |
| `/products`                          | `POST`      |
| `/products`                          | `GET`       |
| `/products/seller/:id`               | `GET`       |
| `/products/search?name=productsName` | `GET`       |
| `/products/search?seller=sellerName` | `GET`       |
| `/products/:id`                      | `PATCH`     |
| `/products/:id`                      | `DELETE`    |

#### Orders:

| Routes    | HTTP Method |
| --------- | ----------- |
| `/orders` | `POST`      |
| `/orders` | `GET`       |
