var loopback = require('loopback');

module.exports = function(Message) {
  Message.observe('before save', function(ctx, next) {
    console.log("Message before save called");
    var message = ctx.instance;
    var accessToken = loopback.getCurrentContext().get("accessToken");
    if (!message.authorId && accessToken) {
      message.authorId = accessToken.userId;
    }
    next(null, message);
  });
};
