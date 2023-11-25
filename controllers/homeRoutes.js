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

        //fetching 6 most recent post data
        const blogData = await Post.findAll({
            include: { model: User, required: true },
            attributes: ['title', 'user.username', 'post_content', 'createdAt'],
            where: { isComment: false },
            // sort by createdAt in descending order
            order: [['createdAt', 'DESC']], 
            // limits the results to 6 posts
            limit: 6, 
          });
      
          const blogs = blogData.map((blog) => ({
            title: blog.title,
            username: blog.user.username,
            post_content: blog.post_content,
            createdAt: blog.createdAt,
          }));

        res.render('homepage', {
            users,
            blog: blogs,
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

 // route to dashboard
router.get('/dashboard', async (req, res) => {

    try {

        // some test code for when I am working with userID
        // const userId = req.session.user_id
        const blogData = await Post.findAll({
          include: { model: User, required: true },
          attributes: ['title', 'user.id', 'createdAt'],
          where: { isComment: false, id:1 }, // replace 1 with userId const
          order: [['createdAt', 'DESC']],
        });
    
        const blogs = blogData.map((blog) => ({
            id: blog.user.id,
            title: blog.title,
            createdAt: blog.createdAt
        }));
    
        res.render('user-blogs', {blogs: blogs});
      } catch (err) {
        res.status(500).json({ error: 'An error occurred while fetching the posts.' });
      }
      
});

 // route to get all blogs
router.get('/blogs', async (req, res) => {

    try {
        const blogData = await Post.findAll({
          include: { model: User, required: true },
          attributes: ['title', 'user.username', 'post_content', 'createdAt'],
          where: { isComment: false}
        });
    
        const blogs = blogData.map((blog) => ({
          title: blog.title,
          username: blog.user.username,
          post_content: blog.post_content,
          createdAt: blog.createdAt
        }));
    
        res.json(blogs);
      } catch (err) {
        res.status(500).json({ error: 'An error occurred while fetching the posts.' });
      }
      
});

// route to get all comments
router.get('/comments', async (req, res) => {

    try {
        const postData = await Post.findAll({
          include: { model: User, required: true },
          attributes: ['user.username', 'post_content', 'createdAt'],
          where: { isComment: true}
        });
    
        const posts = postData.map((post) => ({
          username: post.user.username,
          post_content: post.post_content,
          createdAt: post.createdAt
        }));
    
        res.json(posts);
      } catch (err) {
        res.status(500).json({ error: 'An error occurred while fetching the posts.' });
      }
      
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