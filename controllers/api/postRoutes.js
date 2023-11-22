const router = require('express').Router();
const { Post } = require('../../models');

// CREATE new blog post
router.post('/blog', async (req, res) => {
    try {
      const dbReviewData = await Post.create({
        post_content: req.body.post_content,
        title: req.body.title,
        user_id: req.body.user_id,
        isComment: false
      });
  
        res.status(200).json(dbReviewData);
    } catch (err) {
      console.log(err);
      res.status(500).json(err);
    }
  });
  
// create a comment
router.post('/comment', async (req, res) => {
    try {
    const dbReviewData = await Post.create({
        post_content: req.body.post_content,
        user_id: req.body.user_id,
        isComment: true
    });

        res.status(200).json(dbReviewData);
    } catch (err) {
    console.log(err);
    res.status(500).json(err);
    }
});

  module.exports = router;