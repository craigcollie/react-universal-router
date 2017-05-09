import forEach from 'lodash/forEach';

function parseTemplate(templateString, tokens, appRoot) {
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
