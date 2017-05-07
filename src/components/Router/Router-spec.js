import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';

import Router from './Router';
import Route from './../Route/Route';

const Foo = () => (<div>Foo</div>);
Foo.displayName = 'Foo';

const Bar = () => (<div>Bar</div>);
Bar.displayName = 'Bar';

const Wee = () => (<div>Wee</div>);
Wee.displayName = 'Wee';

const routeConfig = () => (
  <div>
    <Route path="/foo" component={Foo} />
    <Route path="/bar/:someId" component={Bar} />
    <Route path="/wee" component={Wee} />
  </div>
);

describe('Component: Router', () => {
  const tests = [
    {
      location: { pathname: '/foo' },
      routes: routeConfig,
      resolvedData: {},
      routeParams: {},
      result: Foo,
    },
    {
      location: { pathname: '/bar/123' },
      routes: routeConfig,
      resolvedData: {},
      routeParams: {
        someId: '123',
      },
      result: Bar,
    },
    {
      location: { pathname: '/wee', search: 'foo=bar' },
      routes: routeConfig,
      resolvedData: {},
      routeParams: {},
      result: Wee,
    },
  ];

  tests.forEach(({
    location,
    routes,
    resolvedData,
    routeParams,
    result,
  }) => {
    it(`should render the ${result.displayName} component for pathname: ${location.pathname}`, () => {
      const wrapper = shallow(<Router />, {
        context: {
          getLocation: () => location,
          getRoutes: () => routes,
          getResolvedData: () => resolvedData,
        },
      });
      const route = wrapper.find(result);
      const routeProps = route.props();

      expect(route.length).to.equal(1);
      expect(routeProps.resolvedData).to.eql(resolvedData);
      expect(routeProps.routeParams).to.eql(routeParams);
      expect(route.shallow().text()).to.equal(result.displayName);
    });
  });
});
