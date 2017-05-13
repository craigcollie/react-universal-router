import getString from './../lang/getString';

export const handleSuccess = (res, response) => (
  res.send(response)
);

export const handleError = (res, error) => {
  const message = getString(error.message, error.args);
  const stack = error.stack ? error.stack.toString() : '';

  const template = `
    <html style="background-color:#ff0000; font-family: 'Helvetica Neue', Helvetica, Arial, sans-serif;">
    <body>
      <div style="color: white;">
        <h1 style="color:#fff">
          TinyServer error
        </h1>
        <h4>${message}</h4>
        <p>${stack}</p>
      </div>
    </body>
    </html>
  `;

  res.status(500).send(template);
};
