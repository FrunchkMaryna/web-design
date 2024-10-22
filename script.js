document.getElementById('cat-image').addEventListener('click', function() {
    const message = document.getElementById('message');
    if (message.style.display === 'none') {
      message.style.display = 'block';
    } else {
      message.style.display = 'none';
    }
  });
  