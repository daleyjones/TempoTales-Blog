const commentId = document.querySelector('input[name="comment-id"]').value;

const editFormHandler = async function(event) {
  event.preventDefault();

  const body = document.querySelector('textarea[name="comment-body"]').value;

<<<<<<< HEAD
  await fetch(`/api/comment/${commentId}`, {
=======
  await fetch(`/api/projectRoutes/${commentId}`, {
>>>>>>> 680b8cb43d43ed4a55792ddf0a912d6123b52ee6
    method: 'PUT',
    body: JSON.stringify({
      body
    }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  document.location.replace('/profile');
};

const deleteClickHandler = async function() {
<<<<<<< HEAD
  await fetch(`/api/comment/${commentId}`, {
=======
  await fetch(`/api/projectRoutes/${commentId}`, {
>>>>>>> 680b8cb43d43ed4a55792ddf0a912d6123b52ee6
    method: 'DELETE'
  });

  document.location.replace('/profile');
};

document
  .querySelector('#edit-comment-form')
  .addEventListener('submit', editFormHandler);
document
  .querySelector('#delete-btn')
  .addEventListener('click', deleteClickHandler);
