const file = require('../controllers/file');
const express = require("express");
const router = express.Router();


router.get("/getSecretFilesFromApi", file.getSecretFilesFromApi);

module.exports = router;
