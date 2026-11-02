// EDIT YOUR CLUB DETAILS HERE. All example dates are intentionally unspecified.
const club = {
  book: {
    title: "The Witch",
    author: "Freida Mcfadden",
    description: "Psychological thriller with a dual timeline.",
    genre: "Thriller"
  },
  events: [
    {date:"DATE TO BE ANNOUNCED",title:"Next Book Club Gathering",description:"Our next discussion, theme, and meeting details will be posted here."},
    {date:"COMING SOON",title:"Themed Reading Night",description:"A cozy evening inspired by the stories we love."},
    {date:"COMING SOON",title:"Bookish Activity",description:"Games, conversation, and surprises for our reading circle."}
  ],
  bookshelf: [
    {title:"Flock",author:"Kate Stewart",genre:"Romance"},
    {title:"The Bayou Never Tells",author:"Chelley St. Clair",genre:"Mystery / Thriller"},
    {title:"Dear Debbie",author:"Freida McFadden",genre:"Thriller"}
  ],
  // Add your Facebook group's complete URL when ready, e.g. https://www.facebook.com/groups/...
  facebookUrl: "",
  // Replace this with a real contact address before publishing, or use your Facebook URL.
  contactEmail: ""
};
document.getElementById("current-title").textContent=club.book.title;
document.getElementById("current-author").textContent=club.book.author;
document.getElementById("current-description").textContent=club.book.description;
document.getElementById("current-genre").textContent=club.book.genre;
document.getElementById("event-list").innerHTML=club.events.map(e=>`<article class="mini-card"><p class="event-date"></p><h3></h3><p></p></article>`).join("");
[...document.querySelectorAll("#event-list .mini-card")].forEach((card,i)=>{card.querySelector(".event-date").textContent=club.events[i].date;card.querySelector("h3").textContent=club.events[i].title;card.querySelector("p:last-child").textContent=club.events[i].description});
document.getElementById("shelf-list").innerHTML=club.bookshelf.map(()=>`<article class="mini-card"><div class="mini-icon">✧</div><h3></h3><p class="author"></p><span class="tag"></span></article>`).join("");
[...document.querySelectorAll("#shelf-list .mini-card")].forEach((card,i)=>{const b=club.bookshelf[i];card.querySelector("h3").textContent=b.title;card.querySelector(".author").textContent=b.author;card.querySelector(".tag").textContent=b.genre});
const join=document.getElementById("facebook-link");
if(club.facebookUrl){join.href=club.facebookUrl;join.target="_blank";join.rel="noopener noreferrer";join.textContent="Visit Our Facebook Group"}
else if(club.contactEmail){join.href="mailto:"+encodeURIComponent(club.contactEmail)+"?subject=Bradbury%20Creek%20Book%20Club%20Membership"}
else{join.removeAttribute("href");join.textContent="Membership Details Coming Soon";join.setAttribute("aria-disabled","true")}
document.getElementById("year").textContent=new Date().getFullYear();
const toggle=document.querySelector(".menu-toggle"),nav=document.getElementById("nav");
toggle.addEventListener("click",()=>{const open=nav.classList.toggle("open");toggle.setAttribute("aria-expanded",String(open))});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");toggle.setAttribute("aria-expanded","false")}));
