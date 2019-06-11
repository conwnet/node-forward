#!/usr/bin/env node

const {getParameters} = require('./lib');
const forward = require('./forward.js');

forward(...getParameters(process.argv[2]));

