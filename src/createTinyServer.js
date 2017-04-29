import url from 'url';
import { renderToString } from 'react-dom/server';

import { resolveRoute } from './plugins/resolveRoutePlugin';
import matchRoute from './utils/matchRoute';

const propInjector = (props, htmlComponent) => {
  const RootComponent = htmlComponent;
  const dataProps = JSON.stringify(props);
  return `
      <script id='app-props' type='application/json'>
        <![CDATA[${dataProps}]]>
      </script>
      <div>${renderToString(RootComponent(props))}</div>
    `;
};

function createTinyServer(RootComponent, routes, template) {

  //  Express middleware
  return function (req, res, next) {
    const { pathname, search } = url.parse(req.url);

    const activeRoute = matchRoute(routes, pathname);
    if (activeRoute.length) {

      //  Perform any route resolves here first
      const currentRoute = activeRoute[0].props;
      const {
        resolve,
        routeParams,
        meta,
      } = currentRoute;

      //  Resolve data first, then render the route
      //  and pass props to the client app
      resolveRoute(currentRoute).then(resolvedData => {
        const props = {
          location: {
            pathname,
            search,
          },
          resolvedData,
          meta,
        };

        res.render(template, {
          appRoot: propInjector(props, RootComponent),
          title: meta.title,
          description: meta.description,
        });
      });

    } else {
      next();
    }
  }
}

export default createTinyServer;
