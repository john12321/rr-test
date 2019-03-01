/* eslint-disable no-console */
// get horoscope logos

const signs = [
  { sign: 'Aries', url: 'https://cdn.pixabay.com/photo/2015/05/09/07/32/aries-759382_960_720.jpg' },
  { sign: 'Taurus', url: 'https://cdn.pixabay.com/photo/2015/05/09/07/32/bull-759381_960_720.jpg' },
  {
    sign: 'Gemini',
    url: 'https://cdn.pixabay.com/photo/2015/05/09/07/30/twins-759375_960_720.jpg',
  },
  {
    sign: 'Cancer',
    url: 'https://cdn.pixabay.com/photo/2015/05/09/07/31/cancer-759378_960_720.jpg',
  },
  { sign: 'Leo', url: 'https://cdn.pixabay.com/photo/2015/05/09/07/30/lion-759374_960_720.jpg' },
  { sign: 'Virgo', url: 'https://cdn.pixabay.com/photo/2015/05/09/07/31/virgin-759376__340.jpg' },
  {
    sign: 'Libra',
    url: 'https://cdn.pixabay.com/photo/2015/05/09/07/31/horizontal-759380_960_720.jpg',
  },
  {
    sign: 'Scorpio',
    url: 'https://cdn.pixabay.com/photo/2015/05/09/07/31/scorpio-759377_960_720.jpg',
  },
  {
    sign: 'Sagittarius',
    url: 'https://cdn.pixabay.com/photo/2015/05/09/07/30/contactors-759373_960_720.jpg',
  },
  {
    sign: 'Capricorn',
    url: 'https://cdn.pixabay.com/photo/2015/05/09/07/31/capricorn-759379_960_720.jpg',
  },
  {
    sign: 'Aquarius',
    url: 'https://cdn.pixabay.com/photo/2015/05/09/07/32/aquarius-759383_960_720.jpg',
  },
  { sign: 'Pisces', url: 'https://cdn.pixabay.com/photo/2015/05/09/07/32/fish-759384_960_720.jpg' },
];

// add horoscope text to html onClick
const addText = (text = null, thisSign = null) => {
  const textSection = document.getElementById('details');
  const textHtml = `
  <h3>Today's horoscope for ${thisSign}...</h3>
  <p>${text}</p>
  `;
  textSection.innerHTML = textHtml;
};

// dynamically create images and handleClick event
let signName = null;

const handleClick = (event) => {
  signName = event.target.alt;
  const api = 'https://www.horoscopes-and-astrology.com/json';
  fetch(api)
    .then(response => response.json())
    .then((data) => {
      const { dailyhoroscope } = data;
      const signKeys = Object.keys(dailyhoroscope);
      signKeys.forEach((sign) => {
        if (sign === signName) {
          addText(dailyhoroscope[sign], signName);
        }
      });
    })
    .catch(error => console.error(`Error message: ${error}`));
};

signs.forEach(({ url, sign }) => {
  const img = document.createElement('img');
  const signsSection = document.getElementById('signs');
  img.className = 'img';
  img.src = url;
  img.alt = sign;
  img.addEventListener('click', event => handleClick(event), false);
  signsSection.appendChild(img);
});
