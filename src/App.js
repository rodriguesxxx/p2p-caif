const express = require('express');
const app = express();
const http = require('http').createServer(app);
const host = '0.0.0.0';
const cors = require('cors'); // Importe o pacote cors

require('./SocketService')(http);

class App {
    constructor(port) {
        this.port = port ? port : 3000;
    }

    start() {
        // Use o middleware CORS para permitir origens diferentes
        app.use(cors());

        app.get('/health', (req, res) => {
            res.send({
                status: 'UP'
            });
        });

        app.use(express.static('public'));

        http.listen(this.port, host, () => {
            console.log(`server up at port: ${this.port}`);
        });
    }
}

module.exports = (port) => {
    return new App(port);
};
