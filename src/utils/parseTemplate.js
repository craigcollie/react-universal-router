import forEach from 'lodash/forEach';

import getTemplateTokens from './getTemplateTokens';

function parseTemplate(templateStr, currentRoute, appRoot) {
  let tmp = templateStr;

  //  TODO - refactor this
  const tokens = getTemplateTokens(tmp, currentRoute);

  if (!tmp.match('<% appRoot %>')) return null;

  //  Replace the main appRoot token!
  tmp = tmp.replace('<% appRoot %>', appRoot);

  forEach(tokens, (val, key) => {
    tmp = tmp.replace(`<% ${key} %>`, val);
  });

  return tmp;
}

export default parseTemplate;
