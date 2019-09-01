#!/usr/bin/env node

const {getParameters} = require('./src/lib');
const forward = require('./src/forward');
const client = require('./src/client');
const server = require('./src/server');

const argv = process.argv;
const reverseIndex = argv.findIndex(arg => arg === '-r' || arg === '-R');
const listenIndex = argv.findIndex(arg => arg === '-l');
const parseAddress = address => {
    const lastColonIndex = address.lastIndexOf(':');
    const hostname = lastColonIndex !== -1 ? address.slice(0, lastColonIndex) : undefined;
    const port = address.slice(lastColonIndex + 1);

    return [hostname, port];
}

if (listenIndex !== -1) {
    const serverAddress = argv[listenIndex + 1];
    if (!serverAddress) {
        console.log(`usage: forward -l [<remote_host>:]<remote_port>`);
        console.log(`Example: forward my_server.com:8080 8081:localhost:1080`);
    }

    const [serverHost = '0.0.0.0', serverPort] = parseAddress(serverAddress);
    server(serverHost, serverPort);
} else if (reverseIndex !== -1) {
    const serverAddress = argv[reverseIndex + 1];

    if (!serverAddress) {
        console.log(`usage: forward -r <remote_host>:<remote_port> <remote_socket>:<local_socket>`);
        console.log(`Example: forward my_server.com:8080 8081:localhost:1080`);
    }
    const [serverHost, serverPort] = parseAddress(serverAddress);
    const clientParams = argv.find(
        (_, index) => (index > 1 && index !== reverseIndex && index !== reverseIndex + 1)
    );
    client(serverHost, serverPort, ...getParameters(clientParams));
} else {
    forward(...getParameters(process.argv[2]));
}
