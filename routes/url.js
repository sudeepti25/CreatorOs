const express = require('express');
const router = express.Router();
const Url = require('../model/url');
const { handleGenerateShortUrl, handleGetAnalytics } = require('../controller/url');
const protect = require('../middleware/auth');
const { preventContributorWrites } = require('../middleware/auth');

router.post('/', protect, preventContributorWrites, handleGenerateShortUrl);
router.get('/analytics/:shortId', handleGetAnalytics)

module.exports = router;
