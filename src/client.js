const net = require('net');
const {noop} = require('./lib');
const msg = require('./messages')

module.exports = (serverHost, serverPort, incomeHost, incomePort, outcomeHost, outcomePort) => {
    const server = net.connect(serverPort, serverHost);
    server.write(`${msg.ESTABLISH_REQUEST}@${incomeHost}@${incomePort}`);
    const handleEstablish = data => {
        const [message, ...rest] = data.toString().split('@');
        if (message === msg.ESTABLISH_ACCEPTED) {
            console.log(`Forward remote ${incomeHost}:${incomePort} to ${outcomeHost}:${outcomePort} successful`);
            server.addListener('data', data => {
                const [message, uuid] = data.toString().split('@');
                if (message === msg.CONNECTION_REQUEST) {
                    const server = net.connect(serverPort, serverHost);
                    const outcome = net.connect(outcomePort, outcomeHost);
                    server.on('error', noop);
                    outcome.on('error', noop);
                    server.write(`${msg.CONNECTION_CREATED}@${uuid}`);
                    server.pipe(outcome);
                    outcome.pipe(server);
                }
            });
        };

        if (message === msg.ESTABLISH_REFUSED) {
            console.log(`Cannot forward remote ${incomeHost}:${incomePort} to ${outcomeHost}:${outcomePort} - ${rest.join('@')}`)
        }
        server.removeListener('data', handleEstablish);
    }

    server.on('error', noop);
    server.addListener('data', handleEstablish);
};
