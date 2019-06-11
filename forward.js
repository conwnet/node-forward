const net = require('net');

const forward = (localHost, localPort, remoteHost, remotePort) => {
    const server = net.createServer(local => {
        const remote = net.connect(remotePort, remoteHost, () => {
            local.pipe(remote);
            remote.pipe(local);
        });
        local.on('error', () => {});
        remote.on('error', () => {});
    }).on('error', () => {});

    server.listen(localPort, localHost);
}

module.exports = forward;

