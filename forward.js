const net = require('net');

const noop = () => {};
const forward = (localHost, localPort, remoteHost, remotePort) => {
    const server = net.createServer(local => {
        const remote = net.connect(remotePort, remoteHost, () => {
            local.pipe(remote);
            remote.pipe(local);
        });
        local.on('error', noop);
        remote.on('error', noop);
    }).on('error', noop);

    server.listen(localPort, localHost);
};

module.exports = forward;
