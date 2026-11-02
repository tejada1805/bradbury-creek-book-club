const challenges=[
["Fantasy","Read a book with a magical world","Discover a place you wish you could visit."],
["Fantasy","Read a book with dragons or mythical creatures","Find a creature worth talking about."],
["Fantasy","Read a fantasy with a powerful heroine","Who surprised you most?"],
["Dark Romance","Read a dark romance with a morally gray character","Talk about boundaries and character choices."],
["Dark Romance","Read a dark romance by a new-to-you author","Explore a new voice in the genre."],
["Dark Romance","Read a book with a shocking secret","Did you predict the reveal?"],
["Romance","Read a slow-burn romance","Was the wait worth it?"],
["Romance","Read a second-chance love story","Would you give the characters another chance?"],
["Romance","Read a romance with an unexpected setting","How did the setting shape the story?"],
["Psychological Thriller","Read a thriller with an unreliable narrator","What clues did you miss?"],
["Psychological Thriller","Read a book with a jaw-dropping twist","Did you guess the ending?"],
["Psychological Thriller","Read a locked-room or isolated-setting mystery","Who did you suspect first?"],
["Historical Fiction","Read a story set before 1950","What felt most different from today?"],
["Historical Fiction","Read a historical novel inspired by real events","What did you want to research afterward?"],
["Historical Fiction","Read a book set in a country new to you","What did you learn about its setting?"],
["Historical Nonfiction","Read a biography or memoir from another era","What life lesson stayed with you?"],
["Historical Nonfiction","Read a history book about an overlooked event","What surprised you?"],
["Historical Nonfiction","Read about a historical figure you knew little about","Did your opinion change?"]
];
const prompts={
"All Genres":["What moment from this book will stay with you?","Which character changed the most, and why?","Would you recommend this book to a friend? Who?","What would you change about the ending?","What question would you ask the author?"],
"Fantasy":["What rules of the magic system would you change?","Would you survive in this fictional world?","Which magical object would you take home?","What did the world-building add to the story?"],
"Dark Romance":["How did the book handle trust and boundaries?","Which character decision was hardest to understand?","Did the emotional stakes feel convincing?","Where did the characters grow, if at all?"],
"Romance":["When did you first believe in the couple?","What obstacle felt most realistic?","Which romantic moment stood out?","Did the ending feel earned?"],
"Psychological Thriller":["At what point did you stop trusting the narrator?","Which clue was most cleverly hidden?","Did the twist feel fair?","Who did you suspect halfway through?"],
"Historical Fiction":["How did the time period influence the characters?","Which historical detail surprised you?","What did the book make you want to learn more about?","How did the setting shape the conflict?"],
"Historical Nonfiction":["What evidence did you find most compelling?","What new perspective did this book give you?","What question would you ask the subject or historian?","How does this history connect with today?"]
};
const genres=["All Genres",...new Set(challenges.map(c=>c[0]))];
const grid=document.getElementById("challenge-grid"),filters=document.getElementById("filters"),genreSelect=document.getElementById("genre");
let checked;try{checked=JSON.parse(localStorage.getItem("bc-reading-v1")||"[]");if(!Array.isArray(checked))checked=[]}catch{checked=[]}
let currentFilter="All Genres";
function render(){grid.replaceChildren();challenges.forEach(([genre,title,desc],i)=>{if(currentFilter!=="All Genres"&&genre!==currentFilter)return;const card=document.createElement("article");card.className="challenge"+(checked.includes(i)?" done":"");card.dataset.genre=genre;const chip=document.createElement("div");chip.className="genre-chip";chip.textContent=genre;const label=document.createElement("label");const box=document.createElement("input");box.type="checkbox";box.checked=checked.includes(i);box.addEventListener("change",()=>{checked=box.checked?[...checked,i]:checked.filter(n=>n!==i);try{localStorage.setItem("bc-reading-v1",JSON.stringify(checked))}catch{}render()});const titleNode=document.createElement("span");titleNode.textContent=title;label.append(box,titleNode);const description=document.createElement("p");description.textContent=desc;card.append(chip,label,description);grid.append(card)});document.getElementById("progress-text").textContent=checked.length+" / "+challenges.length;document.getElementById("progress-fill").style.width=(checked.length/challenges.length*100)+"%";filters.querySelectorAll("button").forEach(b=>{b.classList.toggle("active",b.textContent===currentFilter);b.setAttribute("aria-pressed",String(b.textContent===currentFilter))})}
genres.forEach(g=>{const btn=document.createElement("button");btn.className="filter";btn.textContent=g;btn.onclick=()=>{currentFilter=g;render()};filters.append(btn);const option=document.createElement("option");option.value=g;option.textContent=g;genreSelect.append(option)});
render();
document.getElementById("reset").onclick=()=>{if(confirm("Clear all your completed reading challenges?")){checked=[];try{localStorage.removeItem("bc-reading-v1")}catch{}render()}};
document.getElementById("print").onclick=()=>window.print();
let lastQuestion="";
document.getElementById("draw").onclick=()=>{const list=prompts[genreSelect.value];const options=list.filter(q=>q!==lastQuestion);lastQuestion=options[Math.floor(Math.random()*options.length)]||list[0];document.getElementById("question").textContent=lastQuestion};
document.getElementById("copy").onclick=async()=>{if(!lastQuestion){document.getElementById("question").textContent="Draw a question first!";return}try{await navigator.clipboard.writeText(lastQuestion);document.getElementById("copy").textContent="Copied!";setTimeout(()=>document.getElementById("copy").textContent="Copy question",1500)}catch{window.prompt("Copy this question:",lastQuestion)}};
