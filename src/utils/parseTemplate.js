import forEach from 'lodash/forEach';

import getTemplateTokens from './getTemplateTokens';

function parseTemplate(templateString, currentRoute, appRoot) {
  //  TODO - refactor this
  const tokens = getTemplateTokens(templateString, currentRoute);

  let tmp = templateString;

  if (!tmp.match('<% appRoot %>')) return null;

  //  Replace the main appRoot token!
  tmp = tmp.replace('<% appRoot %>', appRoot);

  forEach(tokens, (val, key) => {
    tmp = tmp.replace(`<% ${key} %>`, val);
  });

  return tmp;
}

export default parseTemplate;
