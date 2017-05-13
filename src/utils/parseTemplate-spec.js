import { expect } from 'chai';

import parseTemplate from './parseTemplate';

describe('parseTemplate', () => {
  const tests = [
    {
      template: '<% meta.title %><% meta.description %><% appRoot %>',
      tokens: {
        'meta.title': 'foo',
        'meta.description': 'bar',
      },
      appRoot: 'AppRoot',
      result: 'foobarAppRoot',
    },
    {
      template: '<% appRoot %>',
      tokens: {},
      appRoot: 'AppRoot',
      result: 'AppRoot',
    },
    {
      template: '',
      tokens: null,
      appRoot: 'AppRoot',
      result: 'error.parseTemplate.noAppRoot',
    },
  ];

  tests.forEach(({
    template,
    tokens,
    result,
    appRoot,
  }) => {
    it(`should ensure ${template} is ${result}`, (done) => {
      parseTemplate(template, tokens, appRoot)
        .then((parsedTemplate) => {
          done();
          expect(parsedTemplate).to.equal(result);
        }, (errorTemplate) => {
          done();
          expect(errorTemplate.message).to.equal(result);
        });
    });
  });
});
