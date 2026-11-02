// Edit this list whenever you want to add a book. Upload the cover into assets/ first.
const books = [
 {title:'Flock',author:'Kate Stewart',genre:'Romance',image:'assets/flock.jpg',description:'Add your club discussion notes or a short description here.',rating:'Not rated yet',meeting:'Meeting details to be added'},
 {title:'The Bayou Never Tells',author:'Chelley St. Clair',genre:'Psychological Thriller',image:'assets/bayou.jpg',description:'Add your club discussion notes or a short description here.',rating:'Not rated yet',meeting:'Meeting details to be added'},
 {title:'Dear Debbie',author:'Freida McFadden',genre:'Psychological Thriller',image:'assets/dear-debbie.jpg',description:'Add your club discussion notes or a short description here.',rating:'Not rated yet',meeting:'Meeting details to be added'},
 {title:'Gray After Dark',author:'Noelle W. Ihli',genre:'Psychological Thriller',image:'assets/gray-after-dark.jpg',description:'Add your club discussion notes or a short description here.',rating:'Not rated yet',meeting:'Meeting details to be added'},
 {title:'The Witch',author:'Freida McFadden',genre:'Psychological Thriller',image:'assets/the-witch.webp',description:'Add your club discussion notes or a short description here.',rating:'Not rated yet',meeting:'Meeting details to be added'}
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
   document.getElementById('dialog-rating').textContent='Club rating: '+(b.rating||'Not rated yet');
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
renderBooks();
