// Get elements
const bookmarkForm = document.getElementById('bookmark-form');
const bookmarksList = document.getElementById('bookmarks-list');

// Load bookmarks from localStorage
function loadBookmarks() {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  bookmarksList.innerHTML = '';
  bookmarks.forEach((bookmark, index) => {
    const div = document.createElement('div');
    div.className = 'bookmark';
    div.innerHTML = `
      <a href="${bookmark.url}" target="_blank">${bookmark.name}</a>
      <button onclick="deleteBookmark(${index})">Delete</button>
    `;
    bookmarksList.appendChild(div);
  });
}

// Add bookmark
bookmarkForm.addEventListener('submit', (e) => {
  e.preventDefault();
  const name = document.getElementById('name').value.trim();
  const url = document.getElementById('url').value.trim();

  if (!name || !url) {
    alert('Please provide valid inputs');
    return;
  }

  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  bookmarks.push({ name, url });
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));

  bookmarkForm.reset();
  loadBookmarks();
});

// Delete bookmark
function deleteBookmark(index) {
  const bookmarks = JSON.parse(localStorage.getItem('bookmarks')) || [];
  bookmarks.splice(index, 1);
  localStorage.setItem('bookmarks', JSON.stringify(bookmarks));
  loadBookmarks();
}

// Initial load
document.addEventListener('DOMContentLoaded', loadBookmarks);
