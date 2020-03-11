const express = require('express');
const Posts = require('../data/db.js');

const router = express.Router();

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
router.get('/:id', (req, res) => {
  Posts.findById(req.params.id)
    .then(post => {
      if(post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ error: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The post information could not be retrieved." });
    });
});

router.delete('/:id', (req, res) => {
  Posts.remove(req.params.id)
    .then(post => {
      if(!post) {
        res.status(404).json({ error: "The post with the specified ID does not exist." });
      } else {
        res.status(200).json({ message: "Post was deleted" });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "The post could not be removed" });
    })
});

router.put('/:id', (req, res) => {
  Posts.update(req.params.id, req.body)
    .then(post => {
      if(post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ error: "The post with the specified ID does not exist." });
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Post information could not be retrieved . . ." });
    });
});

/******** COMMENTS ENDPOINTS ********/
router.get('/:id/comments', (req, res) => {
  Posts.findPostComments(req.params.id)
    .then(post => {
      if(post) {
        res.status(200).json(post.comments);
      } else {
        res.status(404).json({ error: "The post with the specified ID does not exist." })
      }
    })
    .catch(err => {
      res.status(500).json({ error: "Error receiving comments data" })
    });
});

router.post("/:id/comments", (req, res) => {
	if (req.body.text.length === 0) {
		res.status(400).json({ errorMessage: "Please provide text for the comment." });
	} else {
		Posts.insertComment(req.body)
		  .then(comment => {
				if (comment) {
					Posts.findCommentById(comment.id)
						.then(comment => {
							res.status(201).json(comment);
						})
						.catch(error => {
							res.status(500).json({ error: "error retrieving data" });
						});
				} else {
					res.status(404).json({
							message: "The post with the specified ID does not exist."
						});
				}
			})
			.catch(error => {
				console.log(error);
				res.status(500).json({
					error: "There was an error while saving the comment to the database"
				});
			});
	}
});

module.exports = router;
