import { IncomingMessage } from 'http';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const parseRequestBody = async (req: IncomingMessage): Promise<any> =>
  new Promise((resolve, reject) => {
    let body = '';

    req.on('data', (chunk) => {
      body += chunk.toString();
    });

    req.on('end', () => {
      try {
        const parsedBody = JSON.parse(body);

        resolve(parsedBody);
      } catch {
        reject(new Error('Invalid JSON'));
      }
    });

    req.on('error', (err) => {
      reject(err);
    });
  });
