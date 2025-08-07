const mongoose = require('mongoose');
const mongooseDelete = require('mongoose-delete');

const Schema = mongoose.Schema;

const Video = new Schema(
  {
    idVideo: { type: String },
    title: { type: String, default: 'Default title' },
    img: { type: String, default: 'Default img' },
  },
  {
    timestamps: true,
  },
);

Video.index({ idVideo: 1 }, { unique: true, sparse: true });

Video.plugin(mongooseDelete, {
  deletedAt: true,
  overrideMethods: 'all',
});

module.exports = mongoose.model('Video', Video);
