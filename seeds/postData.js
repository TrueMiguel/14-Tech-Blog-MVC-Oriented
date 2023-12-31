const { Post } = require('../models')

const postData = [
    {
        title: "Custom Helpers",
        post_content: "Custom helpers in Handlebars are JavaScript functions that you can use to extend the functionality of your Handlebars templates. These functions allow you to perform custom logic and transformations on data before rendering it in your templates.",
        user_id: 1,
        createdAt: "11/21/2023",
        isComment: false
    }, 
    {
        title: "Get a Handle on Handlebars!",
        post_content: "Handlebars is a templating engine used to generate dynamic HTML content by embedding expressions within curly braces {{}}. these expressions are replaced with actual data when rendering the page.",
        user_id: 2,
        createdAt: "11/20/2023",
        isComment: false   
    },
    {
        title:"Partial Handlebars",
        post_content: "Partials in Handlebars are reusable templates snippets that can be defined and included within other Handlebars templates. They help you keep your code DRY (Don't Repeat Yourself) by allowing you to define a template for a specific component or section and then include that template wherever needed.",
        user_id: 3,
        createdAt: "11/19/2023",
        isComment: false
    },
    {
        post_content: "This is a test comment",
        user_id: 1,
        createdAt:"11/21/2023",
        isComment: true
    }
]

const seedPost = () => Post.bulkCreate(postData);
module.exports = seedPost