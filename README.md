<p align="center"><a href="https://delwar-ecommerce.netlify.app/" target="_blank" ><img src="https://github.com/DelwarSumon/fs13-CSS-SASS/blob/main/logo.png?raw=true" style="width:150px; height:auto;"></a></p>

# Fullstack Project

![TypeScript](https://img.shields.io/badge/TypeScript-v.4-green)
![SASS](https://img.shields.io/badge/SASS-v.4-hotpink)
![React](https://img.shields.io/badge/React-v.18-blue)
![Redux toolkit](https://img.shields.io/badge/Redux-v.1.9-brown)
![.NET Core](https://img.shields.io/badge/.NET%20Core-v.7-purple)
![EF Core](https://img.shields.io/badge/EF%20Core-v.7-cyan)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-v.14-drakblue)

- Frontend: SASS, TypeScript, React, Redux Toolkit
- Backend: ASP .NET Core, Entity Framework Core, PostgreSQL

## Front-end Featurs

- Cover slider, Most Recommended Products slider in Home page
- In products page user can see all the products by pagination, other functionalities like search product by title, change per page view, sort product, filter product list by category, price.
- Product detail page has image slide and detail information
- User can add product to cart, remove from cart, increase/decrease product quantity from cart and can make the cart empty
- User can create an account, login to the portal
- User can see profile after login
- Admin user can see the product list page and can create, edit, delete product
- 404 page if route is not exists

### Installation Procedure

- git clone https://github.com/DelwarSumon/fs13-FullStack.git
- change your directory to frontend (Ex: `cd frontend`)
- `npm install`

### Available Scripts

In the project directory, you can run:

### `npm run start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### Folder/File Structure and Screenshots
- [See here](./documentations/frontend_structure.md)

### Live site

- [Ecommerce - Netlify](https://delwar-ecommerce.netlify.app/)

## Back-end Featurs

A simple backend project by ASP .NET Core (7), PostgreSql

### Installation Procedure
- change your directory to backend (Ex: `cd backend`)
- run `dotnet restore` to Install dependencies
- Provide PostgreSql connection string in `appsettings.Development.json`
- run `dotnet ef migrations add firstMigration` for migration
- run `dotnet ef database updated` to create tables in database
- `dotnet watch` to run the server and see new changes

### Folder/File Structure and API Information
- [See here](./documentations/backend_structure.md)

### API Documentation
- [API Documentation](./documentations/APIDocumentation.md)


## Github Link
[https://github.com/DelwarSumon/fullstack-ecommerce.git](https://github.com/DelwarSumon/fullstack-ecommerce.git)