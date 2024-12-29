// BibTeX data
const bibtexData = `
@inproceedings{zuhudi2023on,
    title = {{On The Design of Non-CSS Quantum Error Correction Codes with High Quantum Information}}, 
    author = {Zuhudi, A. Muh. Mufqi and Anwar, Khoirul and Budiman, Gelar},
    booktitle = {2023 International Conference on Artificial Intelligence, Blockchain, Cloud Computing, and Data Analytics (ICoABCD)},
    publisher = {IEEE},
    year = {2023},
    volume = {},
    number = {},
    pages = {140-145},
    doi = {10.1109/ICoABCD59879.2023.10390974},
    note = {}
}
`;

// Theme toggle functionality
const themeToggle = document.getElementById('themeToggle');
const htmlElement = document.documentElement;
const toggleIcon = themeToggle.querySelector('i');

themeToggle.addEventListener('click', () => {
  if (htmlElement.getAttribute('data-theme') === 'dark') {
    htmlElement.setAttribute('data-theme', 'light');
    toggleIcon.classList.replace('fa-sun', 'fa-moon');
  } else {
    htmlElement.setAttribute('data-theme', 'dark');
    toggleIcon.classList.replace('fa-moon', 'fa-sun');
  }
});

// Back to top button functionality
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});

backToTopButton.addEventListener('click', e => {
  e.preventDefault();
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// Citation.js functionality
document.addEventListener('DOMContentLoaded', () => {
  const Cite = require('citation-js');

  const cite = new Cite(bibtexData);

  // Generate numbered citations
  const entries = cite.data;
  const numberedCitations = entries
    .map((entry, index) => {
      const authors = entry.author
        .map(
          author =>
            `${author.given
              .split(' ')
              .map(name => name.charAt(0))
              .join('. ')}. ${author.family}`
        )
        .join(', ');
      const title = entry.title;
      const year = entry.issued['date-parts'][0][0];
      const pages = entry.page ? entry.page : 'N/A';
      const conference = entry['container-title'] ? entry['container-title'] : 'N/A';
      const publisher = entry.publisher ? entry.publisher : 'N/A';

      let citation = `[${index + 1}] ${authors}, "${title},"`;
      if (conference !== 'N/A') citation += ` in ${conference},`;
      if (pages !== 'N/A') citation += ` pp. ${pages},`;
      if (publisher !== 'N/A') citation += ` ${publisher},`;
      citation += ` ${year}.`;
      return citation;
    })
    .join('<br>');

  document.getElementById('citation-list').innerHTML = numberedCitations;
});

// Contact form functionality
const contactForm = document.getElementById('contact-form');
const contactResult = document.getElementById('contact-result');

contactForm.addEventListener('submit', e => {
  e.preventDefault();
  const formData = new FormData(contactForm);
  const formObject = Object.fromEntries(formData);
  const json = JSON.stringify(formObject);
  console.log('Form submitted:', formObject);

  fetch('https://api.web3forms.com/submit', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: json
  })
  .then(async (response) => {
    let json = await response.json();
    if (response.status == 200) {
      alert('Message sent successfully!');
    } else {
      console.log(response);
      contactResult.innerHTML = json.message;
    }
  })
  .catch(error => {
    console.log(error);
    alert('Something went wrong!');
  })
  .then(function() {
    contactForm.reset();
    setTimeout(() => {
      contactResult.style.display = "none";
    }, 3000);
  });
});
