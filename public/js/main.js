// Wait for the DOM content to load before executing the code
document.addEventListener("DOMContentLoaded", function() {
    // Function to load the login form template
    function loadLoginForm() {
        // Get the login container element
        var loginContainer = document.getElementById("custom-login-container");
        loginContainer.innerHTML = ""; // Clear the container before adding the form

        // Clone the content of the template using innerHTML
        var template = document.getElementById("login-template");
        var clone = document.createElement("div");
        clone.innerHTML = template.innerHTML;
        while (clone.firstChild) {
            loginContainer.appendChild(clone.firstChild);
        }

        // Show the form using UIkit modal
        UIkit.modal(loginContainer).show();
    }

    // Add a click event listener to the "Log In" button
    var loginButton = document.querySelector(".btn-login");
    loginButton.addEventListener("click", loadLoginForm);
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

// Add an event listener to trigger the showReviewForm function when the button is clicked
document.getElementById('writeBlogButton').addEventListener('click', showReviewForm);


