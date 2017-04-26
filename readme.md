# Tiny universal
A universal router for React.

### Requirements
* React
* Express (support for Koa on the way)

### Getting started
From inside your project, install package:
```bash
$ yarn add tiny-universal
```

### Client (The index.js file)
This file is used as the entry point for the React app. If using with
Webpack, ensure you point to this file as your entry.
```js
import React from 'react';
import { createTinyApp } from 'tiny-universal';

import App from './App';

//  Render the same App component
//  on the client side
createTinyApp(App, 'root');
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

### Index.ejs
Still a WIP. For now, bundles can't be hashed (not yet, anyway), and webpack-dev-server
must be running and serving bundle files (the location is up to you).
```ejs
<!doctype html>
<html lang="en">
<title><%- title %></title>
<meta name="description" content="<%- description %>" />
</head>
<body>
<div id="root"><%- appRoot %></div>
<script src="/vendor.bundle.js"></script>
<script src="/main.bundle.js"></script>
</body>
</html>
```

### That's it!
Yes and no. More documentation to follow, along with added the following features:
* Bundle hashing
* Additional route guarding (not just `resolve`)
* Ensuring CSS-Modules work with this router