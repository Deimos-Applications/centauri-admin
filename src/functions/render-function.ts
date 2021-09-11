import { Handler, builder } from '@netlify/functions';
import ReactDOMServer from 'react-dom/server';
import App from '../App';

const preHandler: Handler = async (event, context) => {
  const element = ReactDOMServer.renderToString(App as any);

  return {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
    },
    body: `
    <!DOCTYPE html>
	    <html>
		    <body>
		      Hello World

          <pre>${JSON.stringify(event)}</pre>
		    </body>
    </html>
    `,
  };
};

const handler = builder(preHandler);

export { handler };
