'use strict';
const merge = require('webpack-merge');
const prodEnv = require('./prod.env');

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"',
  AWS_REGION: '"us-east-2"',
  COGNITO_IDENTITY_POOL_ID: '"us-east-2:e0ee00a0-389e-4ed3-ae6b-0d773cdad435"',
  COGNITO_USER_POOL_ID: '"us-east-2_aRo6Xa58p"',
  COGNITO_CLIENT_ID: '"6r5l1vmua09uqgp11i5gs880je"'
});
