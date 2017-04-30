import url from 'url';
import set from 'lodash/set';
import get from 'lodash/get';
import forEach from 'lodash/forEach';
import { renderToString } from 'react-dom/server';

import { resolveRoute } from './plugins/resolveRoutePlugin';
import matchRoute from './utils/matchRoute';

function generateServerProps(props, htmlComponent) {
  const RootComponent = htmlComponent;
  const dataProps = JSON.stringify(props);
  return `
      <script id='app-props' type='application/json'>
        <![CDATA[${dataProps}]]>
      </script>
      <div>${renderToString(RootComponent(props))}</div>
    `;
};

function createTinyServer({ clientApp, routes, template }) {
  return function (req, res, next) {
    const { pathname, search } = url.parse(req.url);
    const routeNodes = routes().props.children;
    const activeRoute = matchRoute(routeNodes, pathname);

    //  Handoff to the next middleware if
    //  no routes match
    if (!activeRoute.length) next();

    //  Perform any route resolves here first
    const currentRoute = activeRoute[0].props;
    const { resolve, routeParams } = currentRoute;

    resolveRoute(currentRoute)
      .then(resolvedData => {

        let templateString = template.toString();
        const templateTokens = templateString
          //  Match any <% value %> tokens
          .match(/\<%(.*?)\%>/g)
          //  Sanitize the token
          .map(token => (token.replace(/<|>|%|\s/g, '')))
          //  Filter the required appRoot token
          .filter(token => (token !== 'appRoot'))
          //  Map the token back to the <Route /> prop
          .map(token => ({
            [token]: get(currentRoute, token)
          }))
          //  Convert to key:value pairs
          .reduce((acc, token) => {
            acc[Object.keys(token)[0]] = Object.values(token)[0];
            return acc;
          }, {});

        //  Populate the token and apply any
        let tokenProps = {};
        forEach(templateTokens, (val, key) => {
          set(tokenProps, key, val);
          templateString = templateString.replace(`<% ${key} %>`, val);
        });

        const props = {
          location: {
            pathname,
            search
          },
          resolvedData,
          tokenProps,
        };

        //  Populate the appRoot with the
        //  injected server-side props
        templateString = templateString.replace(
          '<% appRoot %>', generateServerProps(props, clientApp)
        );

        res.send(templateString);
      });
  }
}

export default createTinyServer;
