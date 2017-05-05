import { expect } from 'chai';

import getTemplateTokens from './getTemplateTokens';

describe('getTemplateTokens', () => {
  const tests = [
    {
      template: `<% appRoot %><% foo %><% meta.title %>`,
      route: { foo: '123', meta: { title: 'blah' } },
      result: { foo: '123', 'meta.title': 'blah' },
    }, {
      template: `<% appRoot %>`,
      route: { foo: '123', meta: { title: 'blah' } },
      result: {},
    }, {
      template: `<% foo.blah.wee %>`,
      route: { foo: { blah: { wee: 'woo!' } } },
      result: { 'foo.blah.wee': 'woo!' },
    }
  ];

  tests.forEach(({ template, route, result }) => {
    it(`should get all tokens from ${template}`, () => {
      expect(getTemplateTokens(template, route)).to.eql(result);
    });
  });
});
