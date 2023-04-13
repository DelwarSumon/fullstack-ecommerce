[Go Back to README.md](../README.md)

## Folder/File Structure of `src` Folder

```CLEA
.
│   App.tsx
│   index.tsx
│   reportWebVitals.ts
│   setupTests.ts
│
└───common
    └───axiosInstance.ts
|
└───components
    └───auth
        |   Signin.tsx
        └───Signup.tsx
    |
    └───cart
        └───DrawerCart.tsx
    |
    └───footer
        └───Footer.tsx
    |
    └───header
        └───Header.tsx
    |
    └───home
        |   HomeSlider.tsx
        └───NewProducts.tsx
    |
    └───product
        |   AddToCartButton.tsx
        |   ProductAddDrawer.tsx
        |   ProductBox.tsx
        |   ProductEditDrawer.tsx
        └───ProductSideFilter.tsx
|
└───hooks
    └───reduxHook.ts
|
└───pages
    |   Cart.tsx
    |   Home.tsx
    |   NotFound.tsx
    |   ProductDetail.tsx
    |   ProductList.tsx
    |   Products.tsx
    |   Profile.tsx
    └───Root.tsx
|
└───redux
    |   store.ts
    └───methods
        |   cartMethods.ts
        └───productMethods.ts
    |
    └───reducers
        |   cartReducer.ts
        |   categoryReducer.ts
        |   productReducer.ts
        └───userReducer.ts
|
└───routes
    |   ProtectedRoute.tsx
    └───ProtectedRouteAdmin.tsx
|
└───styles
    └───style.scss
|
└───types
    |   cart.ts
    |   category.ts
    |   error.ts
    |   product.ts
    └───user.ts
|
└─── validations
    |   loginSchema.ts
    |   productSchema.ts
    └───registrationSchema.ts
```

## Screenshots

#### `Home`

![pages](screenshots/home.png)

#### `Signup`

![pages](screenshots/signup.png)

#### `Signin`

![pages](screenshots/signin.png)

#### `Products`

![pages](screenshots/products.png)

#### `Products filter`

![pages](screenshots/product_search.png)

#### `Sidebar Cart`

![pages](screenshots/cart_side.png)

#### `Cart`

![pages](screenshots/cart.png)

#### `Admin - Product List`

![pages](screenshots/admin_products.png)

#### `Admin - Add Product`

![pages](screenshots/add_product.png)

#### `Admin - Edit Product`

![pages](screenshots/edit_product.png)

#### `Dark Theme`

![pages](screenshots/dark.png)
