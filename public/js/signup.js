document
  .querySelector('.signup-form')
  .addEventListener('submit', async (event) => {
    event.preventDefault();

    const name = document.getElementById('name-signup').value;
    const email = document.getElementById('email-signup').value;
    const password = document.getElementById('password-signup').value;

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    alert(data.message);

    if (response.ok) {
      window.location.replace('/dashboard');
    }
  });
