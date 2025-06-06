import http from 'http';
import { app } from './server/index.js';

const server = http.createServer(app);

const PORT = process.env.PORT

server.listen(PORT, () => {
    console.log('server initialized')
});

export default server;