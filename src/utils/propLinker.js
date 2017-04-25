import { renderToString } from 'react-dom/server';

const propLinker = (props, htmlComponent) => {
  const Root = htmlComponent;
  const dataProps = JSON.stringify(props);

  const appRoot = `
      <script id='app-props' type='application/json'>
        <![CDATA[${dataProps}]]>
      </script>
      <div>${renderToString(Root(props))}</div>
    `;

  return appRoot;
};

export default propLinker;