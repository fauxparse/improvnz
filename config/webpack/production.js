process.env.NODE_ENV = process.env.NODE_ENV || 'production';

const environment = require('./environment');

environment.plugins.prepend(['react-remove-properties', { properties: ['data-testid'] }]);

module.exports = environment.toWebpackConfig();
