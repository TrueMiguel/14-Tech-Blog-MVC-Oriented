const router = require('express').Router();
const { User, Post } = require('../models');
// const withAuth = require('../utils/auth');

// route to get user
router.get('/', async (req, res) => {
    try {
        // fetching user data
        const userData = await User.findAll({
            attributes: { exclude: ['password'] },
            order: [['username', 'ASC']],
        });

        const users = userData.map((project) => project.get({ plain: true }));

        //fetching post data
        const postData = await Post.findAll({
            include: {model: User, required: true},
            attributes: ['user.username', 'post_content', 'createdAt']
        });

        const posts = postData.map((post) => [post.user.dataValues.username, post.dataValues.post_content, post.dataValues.rating]);

        res.render('homepage', {
            users,
            posts: posts,
            logged_in: req.session.logged_in, 
        });

    } catch (err) {
        res.status(500).json(err);
    }
});

// login route
router.get('/login', (req, res) => {
    if (req.session.logged_on) {
        res.redirect('/');
        return;
    }

    res.render('login');
 });

//Finds the logged in user using the session ID
router.get('/profile', async (req, res) => {
    try {
        const userData =await User.findByPk(req.session.user_id, {
            attributes: { exclude: ['password'] },
        });
        const user = userData.get({ plain: true });

        res.render('profile', {
            ...user, 
            logged_in: true
        });
    } catch (err) {
        res.status(500).json(err);
    }
 });

 // If user is already logged in
 router.get('/login', (req, res) => {
    if (req.session.logged_in) {
        return;
    }
    res.render('login');
 });

 // route to get all posts
router.get('/posts', async (req, res) => {

    try {
        const postData = await Post.findAll({
          include: { model: User, required: true },
          attributes: ['user.username', 'post_content']
        });
    
        const posts = postData.map((post) => ({
          username: post.user.username,
          post_content: post.post_content
        }));
    
        res.json(posts);
      } catch (err) {
        res.status(500).json({ error: 'An error occurred while fetching the posts.' });
      }

    // this will be for when handlebars are set up. testing with out in the mean time. 
    // const postData = await Post.findAll({
    //     include: {model: User, required: true},
    //     attributes: ['user.username', 'post_content']
    //     // attributes: ['user.username', 'post_content', 'createdAt']
    // }).catch((err) => { 
    //     res.json(err);
    //   });
      
    // const posts = postData.map((post) => [post.user.dataValues.username, post.dataValues.post_content]);

    // res.render('all-posts', { posts: posts });
      });

// route to get one post
router.get('/posts/:id', async (req, res) => {
    try{ 
        const postData = await Post.findByPk(req.params.id, {
            include: {model: User, required: true},
            attributes: ['user.username', 'post_content', 'createdAt']});
        if(!postData) {
            res.status(404).json({message: 'No post with this id!'});
            return;
        }
        const post = postData.get({ plain: true });
        console.log(post)
        
        res.render('post', {post: post});

      } catch (err) {
          res.status(500).json(err);
      };     
  });

 module.exports = router;