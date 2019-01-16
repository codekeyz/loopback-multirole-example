'use strict';

module.exports = function(app) {
  const Role = app.models.Role;

  Role.registerResolver('Admin', function(role, context, cb) {
    function reject() {
      process.nextTick(function() {
        cb(null, false);
      });
    }

    // do not allow anonymous users
    var userId = context.accessToken.userId;
    if (!userId) {
      return reject();
    }

    app.models.Admin.findById(userId, function(err, admin) {
      // A: The datastore produced an error! Pass error to callback
      if (err) return cb(err);
      // A: There's no wholeSaler by this ID! Pass error to callback
      if (!admin) return reject();

      return cb(null, true);
    });
  });

  Role.registerResolver('Client', function(role, context, cb) {
    function reject() {
      process.nextTick(function() {
        cb(null, false);
      });
    }

    // do not allow anonymous users
    var userId = context.accessToken.userId;
    if (!userId) {
      return reject();
    }

    app.models.Client.findById(userId, function(err, client) {
      // A: The datastore produced an error! Pass error to callback
      if (err) return cb(err);
      // A: There's no wholeSaler by this ID! Pass error to callback
      if (!client) return reject();

      return cb(null, true);
    });
  });
};
