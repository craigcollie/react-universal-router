import fs from 'fs';
import forEach from 'lodash/forEach';

import getTemplateTokens from './getTemplateTokens';
import TinyError from './../handlers/TinyError';

function parseTemplateWithTokens(templateString, currentRoute, appRoot) {
  let tmp = templateString;
  const tokens = getTemplateTokens(tmp, currentRoute);

  if (!tmp.match('<% appRoot %>')) return null;
  tmp = tmp.replace('<% appRoot %>', appRoot);

  forEach(tokens, (val, key) => {
    tmp = tmp.replace(`<% ${key} %>`, val);
  });
  return tmp;
}

function parseTemplate(template, currentRoute, appRoot) {
  return new Promise((resolve, reject) => {
    const requiresFileLoad = template.match('.html');
    if (!requiresFileLoad) {
      //  We don't need to load a template here, just use
      //  the string provided and try to parse that
      resolve(parseTemplateWithTokens(template, currentRoute, appRoot));
    } else {
      //  If we have a .html file, then we need to read the file and
      //  then try to parse the tokens in it
      fs.readFile(template, (err, data) => {
        if (!err) {
          resolve(parseTemplateWithTokens(data.toString(), currentRoute, appRoot));
        }
        reject(new TinyError('error.parseTemplate', template, err));
      });
    }
  });
}

export default parseTemplate;
