/* eslint-disable no-console */
// get horoscope logos

const signs = [
  {
    sign: 'Aries',
    url: 'https://cdn.pixabay.com/photo/2015/05/09/07/32/aries-759382_960_720.jpg',
  },
  {
    sign: 'Taurus',
    url: 'https://cdn.pixabay.com/photo/2015/05/09/07/32/bull-759381_960_720.jpg',
  },
  {
    sign: 'Gemini',
    url: 'https://cdn.pixabay.com/photo/2015/05/09/07/30/twins-759375_960_720.jpg',
  },
  {
    sign: 'Cancer',
    url: 'https://cdn.pixabay.com/photo/2015/05/09/07/31/cancer-759378_960_720.jpg',
  },
  {
    sign: 'Leo',
    url: 'https://cdn.pixabay.com/photo/2015/05/09/07/30/lion-759374_960_720.jpg',
  },
  {
    sign: 'Virgo',
    url: 'https://cdn.pixabay.com/photo/2015/05/09/07/31/virgin-759376__340.jpg',
  },
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
  {
    sign: 'Pisces',
    url: 'https://cdn.pixabay.com/photo/2015/05/09/07/32/fish-759384_960_720.jpg',
  },
];

let username = '';

const handleChange = (value) => {
  username = value;
};

// store username onChange and prevent submit on enter

const formInput = document.getElementById('input');
formInput.addEventListener('change', event => handleChange(event.target.value));
formInput.onkeypress = (e) => {
  const key = e.charCode || e.keyCode || 0;
  if (key === 13) {
    e.preventDefault();
  }
};

// add horoscope text to html onClick
const addText = (text, thisSign) => {
  const textSection = document.getElementById('details');
  // <img class="card-img-top" src="" alt="Card image cap">
  const textHtml = `
  <div class="card">
  <div class="card-body">
    <h5 class="card-title">Here's today's horoscope for ${thisSign}</h5>
    <p>${text}</p>
  </div>
</div>
`;
  const nameHtml = `
  <h2 class="font-weight-bold">Hey ${username}!</h2>
  `;
  if (username.length > 0) {
    textSection.innerHTML = nameHtml + textHtml;
  } else {
    textSection.innerHTML = textHtml;
  }
};

// dynamically create images and handleClick event
let signName = null;

const fetchHoroscope = (name) => {
  const api = 'https://www.horoscopes-and-astrology.com/json';
  fetch(api)
    .then(response => response.json())
    .then((data) => {
      const { dailyhoroscope } = data;
      const signKeys = Object.keys(dailyhoroscope);
      signKeys.forEach((sign) => {
        if (sign === name) {
          addText(dailyhoroscope[sign], name);
        }
      });
    })
    .catch(error => console.error(`Error message: ${error}`));
};

const handleClick = (event) => {
  signName = event.target.alt;
  fetchHoroscope(signName);
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

// get today's date in nav
const todaysDate = document.getElementById('date');
const newDay = new Date().toDateString().slice(0, 3);
const newDate = new Date().toLocaleDateString('en-GB');
todaysDate.innerHTML = `${newDay} ${newDate}`;

// get today's signName
const month = +newDate.slice(3, 5);
const day = +newDate.slice(0, 2);

const getTodaySign = () => {
  if ((month === 3 && day >= 21) || (month === 4 && day < 21)) {
    signName = 'Aries';
  } else if ((month === 4 && day >= 21) || (month === 5 && day < 22)) {
    signName = 'Taurus';
  } else if ((month === 5 && day >= 22) || (month === 6 && day < 22)) {
    signName = 'Gemini';
  } else if ((month === 6 && day >= 22) || (month === 7 && day < 24)) {
    signName = 'Cancer';
  } else if ((month === 7 && day >= 24) || (month === 8 && day < 24)) {
    signName = 'Leo';
  } else if ((month === 8 && day >= 24) || (month === 9 && day < 24)) {
    signName = 'Virgo';
  } else if ((month === 9 && day >= 24) || (month === 10 && day < 24)) {
    signName = 'Libra';
  } else if ((month === 10 && day >= 22) || (month === 11 && day < 23)) {
    signName = 'Scorpio';
  } else if ((month === 11 && day >= 23) || (month === 12 && day < 22)) {
    signName = 'Sagittarius';
  } else if ((month === 12 && day >= 22) || (month === 1 && day < 21)) {
    signName = 'Capricorn';
  } else if ((month === 1 && day >= 21) || (month === 2 && day < 20)) {
    signName = 'Aquarius';
  } else signName = 'Pisces';
  fetchHoroscope(signName);
};

window.addEventListener('load', () => getTodaySign());
