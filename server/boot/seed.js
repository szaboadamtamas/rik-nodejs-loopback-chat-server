var async = require('async');
module.exports = function (app) {
  var User = app.models.User;
  var Role = app.models.Role;
  var RoleMapping = app.models.RoleMapping;
  var models = [
    'AccessToken',
    'Role',
    'ACL',
    'RoleMapping',
    'User',
    'Room',
    'Message'];

  var db = app.dataSources.mongoDev;
  db.autoupdate(models, function (err) {
    if (err) {
      return console.error(err);
    }

    async.parallel({
      adminUser: function(callback){
        User.findOrCreate(
          { where: { email: 'admin@test.com' } },
          { username: 'admin', email: 'admin@test.com', password: '123456' },
          callback);
      },
      adminRole: function(callback) {
        Role.findOrCreate(
          { where: { name: 'admin' } },
          { name: 'admin'
          },
          callback);
      }
    }, function(err, results){
      if (err) {
        return console.error(err);
      }
      RoleMapping.findOrCreate(
        { where: { principalId: results.adminUser[0].id, roleId: results.adminRole[0].id } },
        {
          principalType: RoleMapping.USER,
          principalId: results.adminUser[0].id,
          roleId: results.adminRole[0].id
        }, function(err, principal) {
          if (err) {
            return console.error(err);
          }
        });
    });
    console.log("Seed complete");
  });
}
