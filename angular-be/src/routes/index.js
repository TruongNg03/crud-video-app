const videoRouter = require('./video.js');

function route(app) {
  app.use('/api/videos', videoRouter);
}

module.exports = route;
