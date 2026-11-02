/*
 * PAST NEWSLETTER ARCHIVE
 * Add a new object after you publish each newsletter online.
 * Example:
 * {
 *   month: 'November 2026',
 *   title: 'Our First Bookish Letter',
 *   summary: 'This month’s reads, gathering details, and a new challenge.',
 *   url: 'https://YOUR-PUBLISHED-NEWSLETTER-URL'
 * }
 * Do not add a placeholder URL; the archive only displays published issues.
 */
const pastIssues = [];

const archive = document.getElementById('archive-list');
const emptyState = document.getElementById('archive-empty');
if (pastIssues.length) {
  emptyState.hidden = true;
  for (const issue of pastIssues) {
    if (!/^https:\/\//.test(issue.url)) continue;
    const article = document.createElement('article');
    article.className = 'issue-card';
    const date = document.createElement('div'); date.className = 'issue-date'; date.textContent = issue.month;
    const title = document.createElement('h3'); title.textContent = issue.title;
    const summary = document.createElement('p'); summary.textContent = issue.summary;
    const link = document.createElement('a'); link.href = issue.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = 'Read this issue →';
    article.append(date, title, summary, link);
    archive.append(article);
  }
  if (!archive.children.length) emptyState.hidden = false;
}
