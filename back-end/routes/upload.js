const express = require('express');
const router = express.Router();
const multer = require('multer');
const path = require('path');
const { Storage } = require('@google-cloud/storage');
const fetch = require('node-fetch');
require('dotenv').config();

// 初始化雲端

const bucketName = 'nick_product_bucket';
const keyFileUrl = process.env.GCS_KEYFILE_URL;

async function initializeStorage() {
  const response = await fetch(keyFileUrl);
  if (!response.ok) {
    throw new Error(`Failed to fetch key file: ${response.statusText}`);
  }
  const credentials = await response.json();
  return new Storage({ credentials });
}

let storage;
(async () => {
  try {
    storage = await initializeStorage();
  } catch (err) {
    console.error('Failed to initialize Google Cloud Storage:', err);
  }
})();

const bucket = storage ? storage.bucket(bucketName) : null;
//設置存儲

const multerStorage = multer.memoryStorage();
const upload = multer({ storage: multerStorage });

router.post('/', upload.single('image'), async(req, res) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }
  if (!bucket) {
    return res.status(500).send('Google Cloud Storage not initialized');
  }
  //上傳到 Google Cloud Storage
  const blob = bucket.file(Date.now() + path.extname(req.file.originalname));
  const blobStream = blob.createWriteStream({
    resumable: false,
  });

  blobStream.on('error', (err) => {
    console.error('Upload error:', err);
    res.status(500).send('Upload error');
  });

  blobStream.on('finish', () => {
    // Make the file publicly accessible
    blob.makePublic().then(()=>{
      const publicUrl = `https://storage.googleapis.com/${bucketName}/${blob.name}`;
      res.json({ imagePath: publicUrl });
    }).catch(err=>{
      console.error('Make public error:', err);
      res.status(500).send('Error making file public');
    })
  });

  blobStream.end(req.file.buffer);

});

module.exports = router;
