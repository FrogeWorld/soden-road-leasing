import { createServer } from 'node:http';
import { readFile } from 'node:fs/promises';

const files = {
  '/': ['index.html', 'text/html; charset=utf-8'],
  '/index.html': ['index.html', 'text/html; charset=utf-8'],
  '/styles.css': ['styles.css', 'text/css; charset=utf-8'],
  '/script.js': ['script.js', 'text/javascript; charset=utf-8'],
};

const port = Number(process.env.PORT || 8088);

createServer(async (request, response) => {
  const [file, contentType] = files[new URL(request.url, 'http://localhost').pathname] || [];
  if (!file) {
    response.writeHead(404);
    response.end('Not found');
    return;
  }
  const body = await readFile(new URL(file, import.meta.url));
  response.writeHead(200, { 'Content-Type': contentType });
  response.end(body);
}).listen(port, () => console.log(`Preview at http://localhost:${port}`));

