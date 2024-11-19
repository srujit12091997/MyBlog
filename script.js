let posts = JSON.parse(localStorage.getItem('blog-posts')) || [];

// Function to create a new post
function createPost() {
    const titleInput = document.getElementById('post-title');
    const contentInput = document.getElementById('post-content');

    if (!titleInput.value || !contentInput.value) {
        alert('Please fill in both title and content!');
        return;
    }

    const post = {
        id: Date.now(),
        title: titleInput.value,
        content: contentInput.value,
        date: new Date().toLocaleDateString()
    };

    posts.unshift(post);
    savePosts();
    displayPosts();

    // Clear inputs
    titleInput.value = '';
    contentInput.value = '';
}

// Function to delete a post
function deletePost(postId) {
    if (confirm('Are you sure you want to delete this post?')) {
        posts = posts.filter(post => post.id !== postId);
        savePosts();
        displayPosts();
    }
}

// Function to save posts to localStorage
function savePosts() {
    localStorage.setItem('blog-posts', JSON.stringify(posts));
}

// Function to display all posts
function displayPosts() {
    const postsContainer = document.getElementById('posts-container');
    postsContainer.innerHTML = '';

    posts.forEach(post => {
        const postElement = document.createElement('div');
        postElement.className = 'post';
        postElement.innerHTML = `
            <div class="post-header">
                <h2 class="post-title">${post.title}</h2>
                <span class="post-date">${post.date}</span>
            </div>
            <div class="post-content">${post.content}</div>
            <button class="delete-btn" onclick="deletePost(${post.id})">Delete Post</button>
        `;
        postsContainer.appendChild(postElement);
    });
}

// Initial display of posts
displayPosts();