const mongoose = require('mongoose');
const isValidObjectId = mongoose.isValidObjectId;
const Video = require('../models/Video');

class VideoController {
  // [GET] /videos?id='...'
  getVideos(req, res, next) {
    const { id, idVideo } = req.query;

    const filter = {
      ...(id && { _id: id }),
      ...(idVideo && { idVideo: idVideo }),
    };
    // log query
    console.log({
      '--Time-executed:': new Date().toLocaleString(),
      '--Find video with:': { query: req.query, filter: filter },
    });

    if (id && !isValidObjectId(id)) {
      return res.status(404).json({ mgs: 'Không tìm thấy video nào' });
    }

    Video.find(filter)
      .lean()
      .then((videos) => {
        if (videos.length > 0) {
          res.status(200).json({ videos });
        } else {
          res.status(404).json({ mgs: 'Không tìm thấy video nào' });
        }
      })
      .catch(next);
  }

  // create video
  // [POST] /videos/create
  createVideo(req, res, next) {
    const createVideo = new Video(req.body);

    Video.findOne({ idVideo: createVideo.idVideo })
      .then((findVideo) => {
        if (findVideo) {
          res.status(400).json({ msg: 'Id video này đã tồn tại, hãy đổi sang id video khác' });
        } else {
          createVideo
            .save()
            .then(() => {
              console.log({
                '--Time-executed:': new Date().toLocaleString(),
                '--Created a video:': createVideo,
              });
              res.status(200).json({ msg: 'Đã thêm video' });
            })
            .catch(next);
        }
      })
      .catch(next);
  }

  // update video
  // [PUT] /videos/edit?id=...
  editVideo(req, res, next) {
    const id = req.query.id;
    console.log('check edit id:', id);
    if (!id || !isValidObjectId(id)) {
      return res.status(404).json({ msg: 'Video không tồn tại' });
    }

    Video.findOne({ _id: id })
      .then((findVideo) => {
        if (!findVideo) {
          res.status(404).json({ msg: 'Video không tồn tại' });
        } else {
          Video.updateOne({ _id: id }, req.body)
            .lean()
            .then(() => {
              console.log({
                '--Time executed:': new Date().toLocaleString(),
                '--Edited video with id:': id,
              });
              res.status(200).json({ msg: 'Đã chỉnh sửa video' });
            })
            .catch(next);
        }
      })
      .catch(next);
  }

  // delete permanent video
  // [DELETE] /videos/delete-permanent?id=...
  deletePermanentVideo(req, res, next) {
    const id = req.query.id;
    console.log('check delete id:', id);

    if (!id || !isValidObjectId(id)) {
      return res.status(404).json({ msg: 'Video không tồn tại' });
    }

    Video.deleteOne({ _id: req.query.id })
      .then(() => {
        console.log({
          '--Time executed:': new Date().toLocaleString(),
          '--Deleted permanent video with idVideo:': req.query.id,
        });
        console.log(`--Deleted permanent video with idVideo: ${req.query.id}`);
        res.status(200).json({ msg: 'Đã xóa video này' });
      })
      .catch(next);
  }
}

module.exports = new VideoController();
