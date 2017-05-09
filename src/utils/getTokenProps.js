import reduce from 'lodash/reduce';
import set from 'lodash/set';

function getTokenProps(tokens) {
  return reduce(tokens, (acc, val, key) => {
    set(acc, key, val);
    return acc;
  }, {});
}

export default getTokenProps;
