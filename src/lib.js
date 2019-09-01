const splitEnv = env => {
    const result = [];
    let open = false, prev = 0, i = 0;

    for (let i = 0, l = env.length; i < l; i++) {
        if (env.charAt(i) === '[') {
            open = true;
        } else if (env.charAt(i) === ']') {
            open = false;
        } else if (env.charAt(i) === ':' && !open) {
            const segment = env.slice(prev, i);

            result.push(segment.charAt(0) === '[' ? segment.slice(1, -1) : segment);
            prev = i + 1;
        }
    }

    result.push(env.slice(prev));
    return result;
};

const getParameters = env => {
    const defaultLocalHost = '0.0.0.0';
    const defaultRemoteHost = '127.0.0.1';

    if (!env) {
        console.log('Please specify forward config');
        process.exit(-1);
    }

    const args = splitEnv(env);

    if (args.length === 2) {
        return [defaultLocalHost, +args[0], defaultRemoteHost, +args[1]];
    }

    if (args.length === 3) {
        return [defaultLocalHost, +args[0], args[1], +args[2]];
    }

    if (args.length === 4) {
        return [args[0], +args[1], args[2], +args[3]];
    }

    console.log('Invalid forward config');
    process.exit(-1);
};

const noop = () => {};

module.exports = {
    noop,
    getParameters,
};
