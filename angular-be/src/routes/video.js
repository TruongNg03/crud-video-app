const express = require('express');
const router = express.Router();

const VideoController = require('../app/controllers/VideoController');

router.get('', VideoController.getVideos);
router.post('/create', VideoController.createVideo);
router.put('/edit', VideoController.editVideo);
router.delete('/delete-permanent', VideoController.deletePermanentVideo);

module.exports = router;
