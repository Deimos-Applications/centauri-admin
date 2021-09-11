import { Handler, builder } from '@netlify/functions';

const preHandler: Handler = async (event, context) => {
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
