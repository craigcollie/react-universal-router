import { renderToString } from 'react-dom/server';

const propInjector = (props, htmlComponent) => {
  const Root = htmlComponent;
  const dataProps = JSON.stringify(props);

  return `
      <script id='app-props' type='application/json'>
        <![CDATA[${dataProps}]]>
      </script>
      <div>${renderToString(Root(props))}</div>
    `;
};

export default propInjector;