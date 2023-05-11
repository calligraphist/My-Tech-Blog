const commentFormHandler = async (event) => {
    event.preventDefault();

    const blogId = document.querySelector('.new=comment-form').dataset.blogId;
    const commentText = document.querySelector('#comment-text').value.trim();
  
    if (commentText) {
        const response = await fetch(`/api/blog`, {
          method: 'POST',
          body: JSON.stringify({ commentText }),
          headers: {
            'Content-Type': 'application/json',
          },
        });

          document.location.reload; 
      }
};

const delButtonHandler = async (event) => {
    if (event.target.hasAttribute('data-id')) {
      const id = event.target.getAttribute('data-id');
  
      const response = await fetch(`/comment/${id}`, {
        method: 'DELETE',
      });

        document.location.reload;
      
    }
  };

document
    .querySelector('.new-comment-form')
    .addEventListener('submit', newFormHandler);

    document
    .querySelector('.comment-list')
    .addEventListener('click', delButtonHandler);