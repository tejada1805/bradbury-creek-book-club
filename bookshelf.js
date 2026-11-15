// Edit this list whenever you want to add a book. Upload the cover into assets/ first.
const SUPABASE_URL = 'YOUR_SUPABASE_PROJECT_URL';
const SUPABASE_KEY = 'YOUR_SUPABASE_PUBLISHABLE_KEY';
const books = [
 {title:'Flock',author:'Kate Stewart',genre:'Romance',image:'assets/flock.jpg',description:'Add your club discussion notes or a short description here.',rating:'Not rated yet',meeting:'Meeting details to be added'},
 {title:'The Bayou Never Tells',author:'Chelley St. Clair',genre:'Psychological Thriller',image:'assets/bayou.jpg',description:'Add your club discussion notes or a short description here.',rating:'Not rated yet',meeting:'Meeting details to be added'},
 {title:'Dear Debbie',author:'Freida McFadden',genre:'Psychological Thriller',image:'assets/dear-debbie.jpg',description:'Add your club discussion notes or a short description here.',rating:'Not rated yet',meeting:'Meeting details to be added'},
 {title:'Gray After Dark',author:'Noelle W. Ihli',genre:'Psychological Thriller',image:'assets/gray-after-dark.jpg',description:'Add your club discussion notes or a short description here.',rating:'Not rated yet',meeting:'Meeting details to be added'},
 {title:'The Witch',author:'Freida McFadden',genre:'Psychological Thriller',image:'assets/the-witch.webp',description:'Add your club discussion notes or a short description here.',rating:'Not rated yet',meeting:'Meeting details to be added'},
 {title: 'Hooked',
  author: 'Emily McIntire',
  genre: 'Dark Romance / Fairy-Tale Retelling',
  image: 'assets/hooked.jpeg',
  description: 'A dark, twisted Peter Pan reimagining filled with revenge, dangerous secrets, forbidden attraction, and morally gray characters.',
  rating: 'Not rated yet',
  meeting: 'Meeting details to be added'}
];
// Genre choices can be assigned to any book in the list above.
const genres = ['All Books','Fantasy','Dark Romance','Romance','Psychological Thriller','Historical Fiction','Historical Nonfiction'];
let selectedGenre = 'All Books';
const filters=document.getElementById('genre-filter');
for(const genre of genres){
 const btn=document.createElement('button');btn.type='button';btn.textContent=genre;
 btn.className='genre-button';btn.dataset.genre=genre;
 btn.addEventListener('click',()=>{selectedGenre=genre;updateFilters();renderBooks(document.getElementById('search-books').value)});
 filters.append(btn);
}
function updateFilters(){
 filters.querySelectorAll('button').forEach(btn=>{
  const active=btn.dataset.genre===selectedGenre;
  btn.classList.toggle('active',active);btn.setAttribute('aria-pressed',String(active));
 });
}
updateFilters();
const grid=document.getElementById('library-grid');
const dialog=document.getElementById('book-dialog');
function renderBooks(search=''){
 grid.replaceChildren();
 const matching=books.filter(b=>(selectedGenre==='All Books'||b.genre===selectedGenre)&&[b.title,b.author,b.genre].some(v=>v.toLowerCase().includes(search.toLowerCase())));
 document.getElementById('empty-message').hidden=matching.length!==0;
 for(const b of matching){
  const button=document.createElement('button');button.className='library-book';button.dataset.genre=b.genre;button.type='button';
  const img=document.createElement('img');img.src=b.image;img.alt=`Cover of ${b.title}`;img.loading='lazy';
  const title=document.createElement('strong');title.textContent=b.title;
  const author=document.createElement('small');author.textContent=b.author;
  button.append(img,title,author);
  button.addEventListener('click',()=>{
   document.getElementById('dialog-image').src=b.image;
   document.getElementById('dialog-image').alt=`Cover of ${b.title}`;
   document.getElementById('dialog-title').textContent=b.title;
   document.getElementById('dialog-author').textContent=b.author;
   document.getElementById('dialog-genre').textContent=b.genre;
   document.getElementById('dialog-description').textContent=b.description;
openBookRatings(b);
   document.getElementById('dialog-meeting').textContent='Meeting: '+(b.meeting||'To be announced');
   dialog.dataset.genre=b.genre;
   dialog.showModal();
  });
  grid.append(button);
 }
}
document.getElementById('search-books').addEventListener('input',e=>renderBooks(e.target.value));
document.getElementById('close-dialog').addEventListener('click',()=>dialog.close());
dialog.addEventListener('click',e=>{if(e.target===dialog)dialog.close()});

let activeBookId = null;
let ratingBusy = false;

const starsContainer = document.getElementById('rating-stars');
const ratingMessage = document.getElementById('rating-message');
const ratingDisplay = document.getElementById('dialog-rating');

function getBookId(book) {
  return `${book.title}-${book.author}`
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

function voteKey(bookId) {
  return `bradbury-rated-${bookId}`;
}

function setStars(value) {
  starsContainer.querySelectorAll('button').forEach(button => {
    const selected = Number(button.dataset.stars) <= value;
    button.textContent = selected ? '★' : '☆';
    button.style.color = selected ? '#d4a037' : '';
    button.setAttribute('aria-pressed',
      String(Number(button.dataset.stars) === value));
  });
}

function updateVoteButtons() {
  const alreadyRated = activeBookId &&
    localStorage.getItem(voteKey(activeBookId));

  starsContainer.querySelectorAll('button').forEach(button => {
    button.disabled = ratingBusy || Boolean(alreadyRated);
  });
}

async function ratingRequest(path, options = {}) {
  const response = await fetch(
    `${SUPABASE_URL.replace(/\/$/, '')}/rest/v1/${path}`,
    {
      ...options,
      headers: {
        apikey: SUPABASE_KEY,
        'Content-Type': 'application/json',
        ...(options.headers || {})
      }
    }
  );

  if (!response.ok) {
    throw new Error(`Database error: ${response.status}`);
  }

  return response.status === 204 ? null : response.json();
}

async function loadRatings(bookId) {
  const rows = await ratingRequest(
    `book_ratings?book_id=eq.${encodeURIComponent(bookId)}&select=stars`
  );

  if (activeBookId !== bookId) return;

  if (!rows.length) {
    ratingDisplay.textContent = 'Club rating: Not rated yet';
    return;
  }

  const total = rows.reduce((sum, row) => sum + row.stars, 0);
  const average = (total / rows.length).toFixed(1);

  ratingDisplay.textContent =
    `Club rating: ★ ${average}/5 (${rows.length} votes)`;
}

async function openBookRatings(book) {
  const bookId = getBookId(book);
  activeBookId = bookId;

  setStars(0);
  ratingDisplay.textContent = 'Loading ratings...';

  ratingMessage.textContent =
    localStorage.getItem(voteKey(bookId))
      ? 'You have already rated this book.'
      : 'Select 1 to 5 stars.';

  updateVoteButtons();

  try {
    await loadRatings(bookId);
  } catch (error) {
    console.error(error);
    if (activeBookId === bookId) {
      ratingDisplay.textContent = 'Ratings unavailable';
      ratingMessage.textContent = 'Please try again later.';
    }
  }
}

starsContainer.addEventListener('click', async event => {
  const button = event.target.closest('button[data-stars]');
  if (!button || button.disabled || ratingBusy) return;

  const bookId = activeBookId;
  if (!bookId || localStorage.getItem(voteKey(bookId))) return;

  const stars = Number(button.dataset.stars);
  ratingBusy = true;
  updateVoteButtons();
  ratingMessage.textContent = 'Submitting your rating...';

  try {
    await ratingRequest('book_ratings', {
      method: 'POST',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({ book_id: bookId, stars })
    });

    localStorage.setItem(voteKey(bookId), String(stars));

    if (activeBookId === bookId) {
      setStars(stars);
      ratingMessage.textContent = 'Thank you for rating!';
      await loadRatings(bookId);
    }
  } catch (error) {
    console.error(error);
    if (activeBookId === bookId) {
      ratingMessage.textContent =
        'Could not complete your request. Refresh to check your rating before trying again.';
    }
  } finally {
    ratingBusy = false;
    updateVoteButtons();
  }
});

renderBooks();
