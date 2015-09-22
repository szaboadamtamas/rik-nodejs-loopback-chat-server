# rik-nodejs-loopback-chat-server

Live Loopback chat server demo

# Loopback Chat server demo

## How to run:

* Start mongo db locally: mongod --dbpath <path>
* Run application: slc run

## How to deploy

* Build: slc build -n
* Deploy to StrongPM: http://<user>:<password>@<host>:<port>

## Room ACL snippet:

```
{
  "accessType": "WRITE",
  "principalType": "ROLE",
  "principalId": "$unauthenticated",
  "permission": "DENY",
  "property": [
    "__create__messages",
    "__delete__messages",
    "__destroyById__messages",
    "__updateById__messages"
  ]
}
```

## Seed 1. gist:

```
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

    console.log("Seed complete");
  });
}
```

## Seed 2. snippet

```
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
  console.log(results);
});
```

## Seed 3. gist:
```
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
    console.log('Principal:', principal);
  });

```

## authentication.js skeleton:
```
var loopback = require('loopback');
var options = {};
var properties = {};
loopback.Model.extend('User', properties, options);
```

