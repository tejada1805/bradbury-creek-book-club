/* EDIT THIS FILE EACH MONTH. No MailerLite, email list, or backend required.
   The latest issue is shown at the top. Older issues appear in the archive.
   Set `published: false` while drafting an issue, then true when ready. */
const issues = [
  {
    id: '2026-11', published: true, month: 'November 2026',
    headline: 'A Cozy New Chapter',
    intro: 'Welcome to our November edition! Here is a little inspiration for a season of cozy reading and bookish connection.',
    featuredTitle: 'What are you reading this fall?',
    featuredBody: 'From fantasy worlds to heartfelt romances and historical stories, this is a perfect month to explore something new. Visit our bookshelf to revisit club favorites.',
    meetingTitle: 'Let’s get together',
    meetingBody: 'Our next gathering details and themes will be announced on the Meetings page. Check there for the latest updates.',
    challengeTitle: 'Your next reading adventure',
    challengeBody: 'Visit the Members page to try a genre-themed reading challenge and draw a conversation starter.',
    question: 'Which fictional character would you invite to Thanksgiving dinner, and why?',
    noteTitle: 'Dear fellow readers,',
    noteBody: 'Here’s to warm drinks, wonderful stories, and making space for every kind of reader. Happy reading!'
  }
  // To publish another issue, copy the object above, add a comma after the
  // previous object, change its id and content, and place the NEW object first.
];
const published = issues.filter(issue => issue.published);
const byId = id => document.getElementById(id);
function showIssue(issue) {
  const fields = {
    'issue-title': `${issue.month} · ${issue.headline}`,
    'issue-intro': issue.intro,
    'featured-title': issue.featuredTitle,
    'featured-body': issue.featuredBody,
    'meeting-title': issue.meetingTitle,
    'meeting-body': issue.meetingBody,
    'challenge-title': issue.challengeTitle,
    'challenge-body': issue.challengeBody,
    'question-title': issue.question,
    'note-title': issue.noteTitle,
    'note-body': issue.noteBody
  };
  for (const [id, value] of Object.entries(fields)) byId(id).textContent = value;
  const url = new URL(window.location.href);
  if (url.searchParams.get('issue') !== issue.id) {
    url.searchParams.set('issue', issue.id);
    window.history.replaceState(null, '', url);
  }
}
const selectedId = new URLSearchParams(location.search).get('issue');
const current = published.find(issue => issue.id === selectedId) || published[0];
if (current) showIssue(current);
else {
  byId('issue-title').textContent = 'Our first chapter is coming soon';
  byId('issue-intro').textContent = 'Check back for our first on-site issue!';
  document.querySelector('.issue-layout').hidden = true;
  document.querySelector('.question-card').hidden = true;
  document.querySelector('.editor-note').hidden = true;
}
const archive = byId('archive-list');
const previous = published.filter(issue => issue.id !== current?.id);
byId('archive-empty').hidden = previous.length > 0;
for (const issue of previous) {
  const card = document.createElement('article');
  card.className = 'archive-card';
  const eyebrow = document.createElement('span'); eyebrow.className = 'eyebrow'; eyebrow.textContent = issue.month;
  const title = document.createElement('h3'); title.textContent = issue.headline;
  const desc = document.createElement('p'); desc.textContent = issue.intro;
  const button = document.createElement('button'); button.type = 'button'; button.textContent = 'Read this issue →';
  button.addEventListener('click', () => { showIssue(issue); document.getElementById('current').scrollIntoView({behavior:'smooth'}); });
  card.append(eyebrow, title, desc, button); archive.append(card);
}
byId('copy-question').addEventListener('click', async () => {
  const question = byId('question-title').textContent;
  try { await navigator.clipboard.writeText(question); byId('copy-status').textContent = 'Question copied!'; }
  catch { byId('copy-status').textContent = 'Select the question above to copy it.'; }
});
