import getString from './../lang/getString';

export const handleSuccess = (res, response) => (
  res.send(response)
);

export const handleError = (res, error) => {
  const errorMessage = (typeof error === 'object')
    ? getString(error.msg, [error.error, error.args])
    : error;

  const message = getString('server.error', errorMessage);

  res.status(500).send(`
    <html style="background-color:#ff0000">
    <body>
        <div style="color: white;">
            <h1 style="color:#fff">
                TinyServer error
            </h1>
            <h4>${message}</h4>
        </div>
    </body>
    </html>
  `);
};
