# API Requirements
The company stakeholders want to create an online storefront to showcase their great product ideas. Users need to be able to browse an index of all products, see the specifics of a single product, and add products to an order that they can view in a cart page. You have been tasked with building the API that will support this application, and your coworker is building the frontend.

These are the notes from a meeting with the frontend developer that describe what endpoints the API needs to supply, as well as data shapes the frontend and backend have agreed meet the requirements of the application. 

## API Endpoints
#### Products
- Index 
- Show
- Create [token required]
- Destroy

#### Users
- Index [token required]
- Show [token required]
- Create [token required]
- Destroy
- Authenticate
- Current Order by user (args: user id)[token required]

#### Orders
- Index
- Show
- Create
- Destroy

## Data Shapes
#### Product
-  id
- name
- price
- category (food, vehicles, clothing, furniture)

#### User
- id
- firstName
- lastName
- username
- password_digest

#### Orders
- id
- productOrderId - _id of each product in the order_
- quantity - quantity of each product in the order
- userId
- status of order (active or complete)

#### User Orders
- id
- quantity
- orderId
- userId

## Database Schemas

#### Product Schema

|  Column  |                                                                 Type                                                                      |
| :------- | :---------------------------------------------------------------------------------------------------------------------------------------- |
| id       | SERIAL PRIMARY KEY _(or integer)_                                                                                                         |
| name     | VARCHAR(64) NOT NULL _(or string)_                                                                                                        |
| price    | integer                                                                                                                                   |
| category | VARCHAR(64) NOT NULL CHECK (category IN ('food', 'vehicles', 'clothing', 'furniture')) _(or "food", "vehicles", "clothing", "furniture")_ |

#### User Schema

|     Column      |         Type         |
| :-------------- | :------------------- |
| id              | SERIAL PRIMARY KEY   |
| firstName       | VARCHAR(64) NOT NULL |
| lastName        | VARCHAR(64) NOT NULL |
| username        | VARCHAR(64) NOT NULL |
| password_digest | VARCHAR              |

#### Orders Schema

|     Column    |                                Type                                |
| :------------ | :----------------------------------------------------------------- |
|id             | SERIAL PRIMARY KEY                                                 |
|productOrderId | bigint REFERENCES products(id)                                     |
|quantity       | integer NOT NULL                                                   |
|userId         | bigint REFERENCES users(id)                                        |
|orderStatus    | VARCHAR(64) NOT NULL CHECK (orderStatus IN ('active', 'complete')) |

#### User Orders Schema

|  Column  |             Type             |
| :--- | :--- |
| id       | SERIAL PRIMARY KEY           |
| quantity | integer                      |
| orderId  | bigint REFERENCES orders(id) |
| userId   | bigint REFERENCES users(id)  |

## View Schemas in _psql_

1. Open Terminal
2. Input the command below into the terminal to switch to the postgres user
```
su postgres
```
3. Input the command below into the terminal to start psql
```
psql postgres
```
4. _If Steps 1-3 fail_, open **SQL Shell (psql)**
5. Input the following <ins>psql connection parameters</ins> to enable use of _SQL Shell (psql)_: **Server**, **Database**, **Username**, **Password**
6. Input the command shown below to view the database schema relations
```
\d
```
