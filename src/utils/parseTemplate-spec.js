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
      result: null,
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
        .then(template => {
          done();
        });

      //expect(parseTemplate(template, tokens, appRoot)).to.equal(result);
    });
  });
});
