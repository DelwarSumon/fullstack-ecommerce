[Go Back to README.md](../README.md)

## Shortcuts
- [Authentication](#Authentication)
- [User](#User)
- [Category](#Category)
- [Product](#Product)
- [Order](#Order)
- [Order Item](#OrderItem)

## Authentication
<a id="Authentication"></a>

Login and obtain an authentication token.

### Request:
```
 [POST] /api/v1/auth/login
```

```
Request body:
{
  "email": "string",
  "password": "string"
}

Responses:
{
  "token": "string",
  "expiration": "2023-04-11T14:44:00.739Z"
}
```
## User
<a id="User"></a>

Retrieve a list of all users.

### Request:
```
 [GET] /api/v1/users
```

```
Parameters:
    Sort : string
    Search : string
    SortBy : string [values : ASC, DESC]
    Limit : integer
    Skip : integer

Responses:
[
  {
    "name": "string",
    "email": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "role": "Admin",
    "image": {
      "url": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  }
]
```

Retrieve information about a specific user by ID.

### Request:
```
 [GET] /api/v1/users/{id}
```

```
Parameters:
    id : string (uuid)

Responses:
{
  "name": "string",
  "email": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "role": "Admin",
  "image": {
    "url": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  }
}
```

Create a new user.

### Request:
```
 [POST] /api/v1/users
```

```
Request body:
{
  "name": "string",
  "email": "string",
  "password": "string",
  "image": {
    "url": "string"
  }
}

Responses:
{
  "name": "string",
  "email": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "role": "Admin",
  "image": {
    "url": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  }
}
```

Update an existing user's information.

### Request:
```
 [PUT] /api/v1/users/{id}
```

```
Parameters:
    id : string (uuid)

Request body:
{
  "name": "string",
  "email": "string",
  "password": "string"
}

Responses:
{
  "name": "string",
  "email": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "role": "Admin",
  "image": {
    "url": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  }
}
```

Delete a user account.

### Request:
```
 [DELETE] /api/v1/users/{id}
```

```
Parameters:
    id : string (uuid)

Responses:
    success
```

## Category
<a id="Category"></a>

Retrieve a list of all categories.

### Request:
```
 [GET] /api/v1/categories
```

```
Parameters:
    Sort : string
    Search : string
    SortBy : string [values : ASC, DESC]
    Limit : integer
    Skip : integer

Responses:
[
  {
    "name": "string",
    "description": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  }
]
```

Retrieve information about a specific category by ID.

### Request:
```
 [GET] /api/v1/categories/{id}
```

```
Parameters:
    id : string (uuid)

Responses:
{
  "name": "string",
  "description": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

Create a new category.

### Request:
```
 [POST] /api/v1/categories
```

```
Request body:
{
  "name": "string",
  "description": "string"
}

Responses:
{
  "name": "string",
  "description": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

Update an existing category's information.

### Request:
```
 [PUT] /api/v1/categories/{id}
```

```
Parameters:
    id : string (uuid)

Request body:
{
  "name": "string",
  "description": "string"
}

Responses:
{
  "name": "string",
  "description": "string",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

Delete a category.

### Request:
```
 [DELETE] /api/v1/categories/{id}
```

```
Parameters:
    id : string (uuid)

Responses:
    success
```

## Product
<a id="Product"></a>

Retrieve a list of all products.

### Request:
```
 [GET] /api/v1/products
```

```
Parameters:
    Sort : string
    Search : string
    SortBy : string [values : ASC, DESC]
    Limit : integer
    Skip : integer
    CategoryId : string(uuid)
    Price_min : number(double)
    Price_max : number(double)

Responses:
[
  {
    "title": "string",
    "description": "string",
    "price": 0,
    "categoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "images": [
      {
        "url": "string",
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    ],
    "category": {
      "name": "string",
      "description": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  }
]
```

Retrieve information about a specific product by ID.

### Request:
```
 [GET] /api/v1/products/{id}
```

```
Parameters:
    id : string (uuid)

Responses:
{
  "title": "string",
  "description": "string",
  "price": 0,
  "categoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "images": [
    {
      "url": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "category": {
    "name": "string",
    "description": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  }
}
```

Create a new product.

### Request:
```
 [POST] /api/v1/products
```

```
Request body:
{
  "title": "string",
  "description": "string",
  "price": 0,
  "categoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "images": [
    {
      "url": "string"
    }
  ]
}

Responses:
{
  "title": "string",
  "description": "string",
  "price": 0,
  "categoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "images": [
    {
      "url": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "category": {
    "name": "string",
    "description": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  }
}
```

Update an existing product's information.

### Request:
```
 [PUT] /api/v1/products/{id}
```

```
Parameters:
    id : string (uuid)

Request body:
{
  "title": "string",
  "description": "string",
  "price": 0,
  "categoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}

Responses:
{
  "title": "string",
  "description": "string",
  "price": 0,
  "categoryId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "images": [
    {
      "url": "string",
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ],
  "category": {
    "name": "string",
    "description": "string",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  }
}
```

Delete a product.

### Request:
```
 [DELETE] /api/v1/products/{id}
```

```
Parameters:
    id : string (uuid)

Responses:
    success
```

## Order
<a id="Order"></a>

Retrieve a list of all orders.

### Request:
```
 [GET] /api/v1/orders
```

```
Parameters:
    Sort : string
    Search : string
    SortBy : string [values : ASC, DESC]
    Limit : integer
    Skip : integer

Responses:
[
  {
    "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "orderItems": [
      {
        "productId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "quantity": 0,
        "price": 0,
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    ]
  }
]
```

Retrieve information about a specific order by ID.

### Request:
```
 [GET] /api/v1/orders/{id}
```

```
Parameters:
    id : string (uuid)

Responses:
{
  "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "orderItems": [
    {
      "productId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "quantity": 0,
      "price": 0,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

Retrieve list of all orders by UserID.

### Request:
```
 [GET] /api/v1/orders/user/{userId}
```

```
Parameters:
    userId : string (uuid)

Responses:
[
  {
    "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "orderItems": [
      {
        "productId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
        "quantity": 0,
        "price": 0,
        "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
      }
    ]
  }
]
```

Create a new order.

### Request:
```
 [POST] /api/v1/orders
```

```
Request body:
{
  "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "orderItems": [
    {
      "productId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "quantity": 0,
      "price": 0
    }
  ]
}

Responses:
{
  "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "orderItems": [
    {
      "productId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "quantity": 0,
      "price": 0,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

Update an existing order's information.

### Request:
```
 [PUT] /api/v1/orders/{id}
```

```
Parameters:
    id : string (uuid)

Request body:
{
  "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "orderItems": [
    {
      "productId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "quantity": 0,
      "price": 0
    }
  ]
}

Responses:
{
  "userId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "orderItems": [
    {
      "productId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
      "quantity": 0,
      "price": 0,
      "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
    }
  ]
}
```

Delete a order.

### Request:
```
 [DELETE] /api/v1/orders/{id}
```

```
Parameters:
    id : string (uuid)

Responses:
    success
```

## OrderItem
<a id="OrderItem"></a>

Retrieve a list of all orderitems.

### Request:
```
 [GET] /api/v1/orderitems
```

```
Parameters:
    Sort : string
    Search : string
    SortBy : string [values : ASC, DESC]
    Limit : integer
    Skip : integer

Responses:
[
  {
    "productId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "quantity": 0,
    "price": 0,
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  }
]
```

Retrieve information about a specific order item by ID.

### Request:
```
 [GET] /api/v1/orderitems/{id}
```

```
Parameters:
    id : string (uuid)

Responses:
{
  "productId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "quantity": 0,
  "price": 0,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

Retrieve list of all orderitems by Order ID.

### Request:
```
 [GET] /api/v1/orderitems/order/{orderId}
```

```
Parameters:
    useorderIdrId : string (uuid)

Responses:
[
  {
    "productId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
    "quantity": 0,
    "price": 0,
    "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
  }
]
```

Create a new order item.

### Request:
```
 [POST] /api/v1/orderitems
```

```
Request body:
{
  "productId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "quantity": 0,
  "price": 0
}

Responses:
{
  "productId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "quantity": 0,
  "price": 0,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

Update an existing order item's information.

### Request:
```
 [PUT] /api/v1/orderitems/{id}
```

```
Parameters:
    id : string (uuid)

Request body:
{
  "productId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "quantity": 0,
  "price": 0
}

Responses:
{
  "productId": "3fa85f64-5717-4562-b3fc-2c963f66afa6",
  "quantity": 0,
  "price": 0,
  "id": "3fa85f64-5717-4562-b3fc-2c963f66afa6"
}
```

Delete a order item.

### Request:
```
 [DELETE] /api/v1/orderitems/{id}
```

```
Parameters:
    id : string (uuid)

Responses:
    success
```
