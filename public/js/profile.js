const newFormHandler = async (event) => {
  event.preventDefault();

  const title = document.querySelector('#post-title').value.trim();
  const body = document.querySelector('#post-content').value.trim();

  if (title && body) {
    const response = await fetch(`/api/projects`, {
      method: 'POST',
      body: JSON.stringify({ title, body }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    if (response.ok) {
      const blog = { title, body };
      const blogs = JSON.parse(localStorage.getItem('blogs')) || [];
      blogs.push(blog);
      localStorage.setItem('blogs', JSON.stringify(blogs));

      document.location.reload();
    } else {
      alert('Failed to create blog');
    }
  }
};

document
  .querySelector('.new-post-form')
  .addEventListener('submit', newFormHandler);
