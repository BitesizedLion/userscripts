// ==UserScript==
// @name         Hacker News Post Filter
// @namespace    https://github.com/BitesizedLion/userscripts
// @version      1.0.1
// @description  Filter out Hacker News posts containing certain words or phrases, with a toggle button.
// @author       BitesizedLion
// @match        https://news.ycombinator.com/new*
// @match        https://news.ycombinator.com/threads*
// @match        https://news.ycombinator.com/front*
// @match        https://news.ycombinator.com/ask
// @match        https://news.ycombinator.com/show*
// @match        https://nwes.ycombinator.com/jobs
// @grant        none
// ==/UserScript==

const blockedWords = ['ChatGPT', 'AI', 'GPT'];
let showFiltered = false;

const button = document.createElement('button');
button.textContent = 'Show Filtered Results';
button.style.cssText = `
  background-color: red;
  color: white;
  padding: 5px;
  position: fixed;
  bottom: 20px;
  right: 20px;
  z-index: 9999;
`;

document.body.appendChild(button);

function toggleFilteredResults() {
  //const showFiltered = button.textContent === 'Hide Filtered Results';
  const postRows = document.querySelectorAll('.athing');

  const blockedRegex = new RegExp(`\\b(${blockedWords.join('|')})\\b`, 'i'); // lol im sorry

  postRows.forEach(row => {
    const title = row.querySelector('.title a');
    const postText = title.textContent.toLowerCase();
    const containsBlockedWord = blockedRegex.test(postText);

    if (containsBlockedWord) {
      const subRow = row.nextElementSibling;
      const spacerRow = subRow.nextElementSibling;

      [row, subRow, spacerRow].forEach(element => {
        element.style.display = showFiltered ? 'table-row' : 'none';
        element.style.backgroundColor = showFiltered ? 'red' : 'white';
      });
    }
  });

  showFiltered = !showFiltered;
  button.textContent = showFiltered ? 'Hide Filtered Results' : 'Show Filtered Results';
  button.style.backgroundColor = showFiltered ? 'green' : 'red';
}

toggleFilteredResults();
button.addEventListener('click', toggleFilteredResults);
