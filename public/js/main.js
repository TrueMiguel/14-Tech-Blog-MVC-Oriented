// Wait for the DOM content to load before executing the code
document.addEventListener("DOMContentLoaded", function() {
    document.getElementById('logIn-btn').addEventListener('click', (event) => {
        if (event.target.id === 'logIn-btn'){
            document.location.replace('/login')
        }
    });
});

// JavaScript function to display the blog post form when the button is clicked
function showBlogPostForm() {
    // Get the post form template content
    const templateSource = document.getElementById('blogPostFormTemplate').innerHTML;

    // Compile the template using Handlebars
    const template = Handlebars.compile(templateSource);

    // Render the template into the desired container
    const blogPostFormContainer = document.getElementById('blogPostFormContainer');
    blogPostFormContainer.innerHTML = template();
}

// event listener to change to the home page
document.getElementById('home-btn').addEventListener('click', (event) => {
    if (event.target.id === 'home-btn'){
        document.location.replace('/')
    }
});

// event listener to change the page to /dashboard
document.getElementById('dashboard').addEventListener('click', (event) => {
    if (event.target.id === 'dashboard'){
        document.location.replace('/dashboard')
    }
});

// event listener to change the page to /create account
document.getElementById('new-account-btn').addEventListener('click', (event) => {
    if (event.target.id === 'new-account-btn'){
        document.location.replace('/create_account')
    }
});

