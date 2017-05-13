import fs from 'fs';
import forEach from 'lodash/forEach';

import getTemplateTokens from './getTemplateTokens';

function parseTemplate(template, currentRoute, appRoot) {
  return new Promise((resolve, reject) => {
    fs.readFile(template, (err, data) => {
      try {
        let tmp = data.toString();

        const tokens = getTemplateTokens(tmp, currentRoute);

        if (!tmp.match('<% appRoot %>')) return null;

        //  Replace the main appRoot token!
        tmp = tmp.replace('<% appRoot %>', appRoot);

        forEach(tokens, (val, key) => {
          tmp = tmp.replace(`<% ${key} %>`, val);
        });
        //  Resolved the parsed template
        resolve(tmp);
      } catch (error) {
        //  Reject with any caught error
        reject({ msg: 'error.parseTemplate', error, args: [template] });
      }
    });
  });
}

export default parseTemplate;
