var async, request;

request = require("request");

async = require("async");

module.exports.createClient = function(options) {
  if (options == null) {
    options = {};
  }
  if (options.jar == null) {
    options.jar = request.jar();
  }
  if (options.cookies) {
    async.reduce(options.cookies, options.jar, function(result, cookie, cb) {
      var cookieStr;
      cookieStr = cookie.name + "=" + cookie.value;
      return options.jar.setCookie(cookieStr, options.url, function(err, c) {
        if (err) {
          return cb(err);
        } else {
          return cb(null, options.jar);
        }
      });
    }, function(err, result) {
      return options.jar = result;
    });
  }
  return request.defaults(options);
};
