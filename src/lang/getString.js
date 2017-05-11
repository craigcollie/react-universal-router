import en from './en';

function getString(string, args) {
  let actualString = en[string];

  const replaceArg = (str, arg, i) =>
    (str.replace(`{${i}}`, arg));

  if (Array.isArray(args)) {
    args.forEach((arg, i) => {
      actualString = replaceArg(actualString, arg, i);
    });
  } else {
    actualString = replaceArg(actualString, args, 0);
  }

  return actualString;
}

export default getString;
