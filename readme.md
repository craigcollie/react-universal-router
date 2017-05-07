# Tiny universal [![Build Status](https://travis-ci.org/craigcollie/tiny-universal.svg?branch=master)](https://travis-ci.org/craigcollie/tiny-universal)
A universal router for React.

### Requirements
* React
* React-dom
* Express (Or Koa)

### Getting started
From inside your project, install package:
```bash
$ yarn add tiny-universal
```
Feel free to clone the [tiny-universal-seed](https://github.com/craigcollie/tiny-universal-seed) repository to see it in action, without having to configure anything.

### Included components
#### RouterProvider
The router provider is the outer most required component. Your outer most
app component (the one provided to the server and the client) will have
all server props passed to it, and these props must be applied
to the `<RouterProvider />`.
```js
import { RouterProvider } from 'tiny-universal';
<RouterProvider {...serverProps} routes={<Routes Component>} />
```

#### Router (may be removed)
The Router component ensures all `<Route />` components have server data
available at the time of render.
```js
<Router />
```

#### Route
This component allows you to define routes for your application. The `path` attribute
is required, and will be matched on both the server-side and client-side.
```js
<Route
  path={<string>}
  component={<component>}
  resolve={<fn|promise>}
  routeParams={<object>}
  meta={<object>}
/>
```
WIP: More docs to follow!

#### Link
A text link component to update the route client-side.
```js
<Link to="/foo" text="Go to foo" />
```


### Client (The index.js file)
This file is used as the entry point for the React app. If using with
Webpack, ensure you point to this file as your entry. The `createTinyApp` function
will wrap your root application component and inject any server-side props.
```js
import React from 'react';
import ReactDOM from 'react-dom';
import { createTinyApp } from 'tiny-universal';

import App from './App';

//  Render the same App component
//  on the client side
createTinyApp(createTinyApp(App), document.getElementById('root'));
```

### App
This file is used for both server-side and client-side rendering. Ensure
you are exporting your `Routes` as a React component, as this will be used
in both the server and client.
```js
import React from 'react';
import { Router, RoutingProvider } from 'tiny-universal';

import Header from './routes/common/Header';
import Routes from './routes/Routes';

//  Root router component
//  Data from the original isomorphic fetch
//  will be provided here along with location data
const App = (serverProps) => (
  <RoutingProvider {...serverProps} routes={Routes}>
    <Router />
  </RoutingProvider>
);

export default App;
```

### Routes
Routing is written as per React Router's declarative nature. The simplest way of writing
the route is as below:
```js
import React from 'react';
import { Route } from 'tiny-universal';
import MyComponent from './MyComponent';

const Routes = () => (
  <Route
    path="/home"
    component={MyComponent}
  />
);
export default Routes;

```

### Server (Currently only Express)
Start your express server and ensure you're applying the `createTinyServer` middleware
to your application. This function matches the current route with the supplied
`Routes` file, otherwise the request is handed to the next middleware.
```js
import express from 'express';
import { createTinyServer } from 'tiny-universal';

import App from './App';
import Routes from './routes/Routes';
const indexTemplate = 'index.ejs';

const app = express();
const tinyServer = createTinyServer(App, Routes, indexTemplate);

//  Apply tinyServer as middleware
app.use(tinyServer);

app.listen(8080);
```

### Index.html
Your index file is served statically through Tiny Universal, and requires one small token to be added `<% appRoot %>`. This token will be replaced by your applications base component and provides the connection between the initial route props and the client-side application.

You can also use custom tokens with your template, provided you supply the data with the routes. I.e. in the template below, you can see a few metadata tags `<% meta.title %> <% meta.description %>`, which are supplied with data that is provided by the route definitions. 
```html
<!doctype html>
<html lang="en">
<title><% meta.title %></title>
<meta name="description" content="<% meta.description %>" />
</head>
<body>
<div id="root"><% appRoot %></div>
<hr/>
<script src="/bundle.js"></script>
</body>
</html>
```
