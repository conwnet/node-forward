const {getParameters} = require('./src/lib');
const forward = require('./src/forward.js');

forward(...getParameters(process.env['NODE_FORWARD']));
