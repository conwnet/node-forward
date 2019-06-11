const {getParameters} = require('./lib');
const forward = require('./forward.js');

forward(...getParameters(process.env['NODE_FORWARD']));

