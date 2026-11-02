// EDIT YOUR MEETINGS HERE. Dates are left unannounced until you confirm them.
const upcomingMeetings = [
  { title: 'Our Next Book Club Meeting', date: 'Date to be announced', description: 'Our next book discussion and meeting details will be shared soon.', genre: 'fantasy', icon: '✦', tag: 'Upcoming' },
  { title: 'Themed Reading Night', date: 'Coming soon', description: 'A special evening inspired by our favorite genres and stories.', genre: 'romance', icon: '❦', tag: 'Planning' }
];
const pastMeetings = [
  { title: 'Flock', date: 'July 31, 2026', description: 'A book club gathering inspired by Kate Stewart’s Flock.', genre: 'romance', icon: '♥', tag: 'Past Meeting' },
  { title: 'The Bayou Never Tells', date: 'August 21, 2026', description: 'A mysterious, atmospheric book club gathering.', genre: 'thriller', icon: '☽', tag: 'Past Meeting' },
  { title: 'Dear Debbie: Murder at the Book Club', date: 'October 9, 2026', description: 'A themed gathering with a murder mystery activity and awards.', genre: 'thriller', icon: '✧', tag: 'Past Meeting' }
];
// Replace or remove past entries if your final club records differ.
function renderEvents(id,events){const container=document.getElementById(id);for(const e of events){const article=document.createElement('article');article.className='event '+(e.genre||'');const banner=document.createElement('div');banner.className='banner';banner.textContent=e.icon||'✦';const content=document.createElement('div');content.className='content';const date=document.createElement('div');date.className='date';date.textContent=e.date;const title=document.createElement('h3');title.textContent=e.title;const desc=document.createElement('p');desc.textContent=e.description;const tag=document.createElement('span');tag.className='pill';tag.textContent=e.tag||'Meeting';content.append(date,title,desc,tag);article.append(banner,content);container.append(article)}}
renderEvents('upcoming-events',upcomingMeetings);renderEvents('past-events',pastMeetings);
const menu=document.getElementById('menu'),nav=document.getElementById('nav');menu.addEventListener('click',()=>{const opened=nav.classList.toggle('open');menu.setAttribute('aria-expanded',String(opened))});
