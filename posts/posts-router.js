const express = require('express');
const Posts = require('../data/db.js');

const router = express.Router();

module.exports = router;

/******** POSTS ENDPOINTS ********/
router.get('/', (req, res) => {
  // res.status(200).json({post: "here we are"});
  Posts.find(req.query)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(err => {
      res.status(500).json({ error: "Error receiving post data" });
    });
});

router.post('/', (req, res) => {
  Posts.insert(req.body)
    .then(post => {
      res.status(201).json(post);
    })
    .catch(err => {
      if(!req.body.title || !req.body.contents) {
        res.status(400).json({ error: "Please provide title and contents for the post." });
      } else {
        res.status(500).json({ error: "There was an error while saving the post to the database." });
      }
    });
});

/******** POSTS ENDPOINT BY ID ********/
