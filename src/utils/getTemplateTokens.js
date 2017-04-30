import get from 'lodash/get';

function getTemplateTokens(templateString, currentRoute) {
  return templateString
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
}

export default getTemplateTokens;
