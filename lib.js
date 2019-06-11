const getParameters = (env) => {
    const defaultLocalHost = '0.0.0.0';
    const defaultRemoteHost = '127.0.0.1';

    if (!env) {
        throw new Error('Please specify forward config');
    }

    const args = env.split(':');

    if (args.length === 2) {
        return [defaultLocalHost, +args[0], defaultRemoteHost, +args[1]];
    }

    if (args.length === 3) {
        return [defaultLocalHost, +args[0], args[1], +args[2]];
    }

    if (args.length === 4) {
        return [args[0], +args[1], args[2], +args[3]];
    }

    throw new Error('Invalid forward config');
};

module.exports = {
    getParameters,
};

