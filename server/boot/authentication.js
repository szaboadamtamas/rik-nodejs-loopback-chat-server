module.exports = function enableAuthentication(server) {
  // enable authentication
  server.enableAuth();

  var loopback = require('loopback');
  var options = {};
  var properties = {
    acls: [
      {
        accessType: '*',
        principalType: 'ROLE',
        principalId: 'admin',
        permission: 'ALLOW'
      }
    ]};
  loopback.Model.extend('User', properties, options);

};
