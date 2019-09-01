const net = require('net');
const {noop} = require('./lib');
const msg = require('./messages');

const generateUuid = () => {
    return '' + Date.now() + Math.random();
};

const connectionMap = new Map();
const guardServer = net
    .createServer(clientSocket => {
        clientSocket.on('data', data => {
            const [message, hostname, port] = data.toString().split('@');

            if (message === msg.ESTABLISH_REQUEST && hostname && port) {
                const incomeServer = net
                    .createServer(incomeSocket => {
                        const uuid = generateUuid();
                        clientSocket.write(`${msg.CONNECTION_REQUEST}@${uuid}`);
                        incomeSocket.on('error', noop);
                        connectionMap.set(uuid, incomeSocket);
                    })
                    .on('error', error => {
                        clientSocket.write(
                            `${msg.ESTABLISH_REFUSED}@${error.message}`
                        );
                    });
                incomeServer.listen(port, hostname, () => {
                    clientSocket.write(msg.ESTABLISH_ACCEPTED);
                    clientSocket.on('end', () => incomeServer.close());
                });
                return;
            }

            if (message === msg.CONNECTION_CREATED) {
                const uuid = hostname;
                const incomeSocket = connectionMap.get(uuid);
                connectionMap.delete(uuid);

                clientSocket.pipe(incomeSocket);
                incomeSocket.pipe(clientSocket);
            }
        });
        clientSocket.on('error', noop);
    })
    .on('error', err => {
        throw err;
    });

module.exports = (hostname, port) => {
    guardServer.listen(port, hostname, () => console.log(`Server listen at ${hostname}:${port}`));
};
