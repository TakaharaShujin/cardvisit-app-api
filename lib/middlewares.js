const bodyParser = require('body-parser');

module.exports = {
  load: function (app) {

    app.use(function (req, res, next) {
      response.header("Access-Control-Allow-Origin", "http://localhost:3000");
      response.header("Access-Control-Allow-Credentials", "true");

      next();
    });

    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));

  }
};
