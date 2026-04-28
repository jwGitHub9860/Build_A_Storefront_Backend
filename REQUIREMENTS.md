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

## Data Shapes of Database Schemas
#### Product Schema
-  id
- name
- price
- category (food, vehicles, clothing, furniture)

#### User Schema
- id
- firstName
- lastName
- username
- password_digest

#### Orders Schema
- id
- productOrderId - _id of each product in the order_
- quantity - quantity of each product in the order
- userId
- status of order (active or complete)

#### User Orders Schema
- id
- quantity
- orderId
- userId
