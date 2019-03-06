/* eslint-disable no-undef */
/* eslint-disable no-return-assign */
/* eslint-disable no-console */
// get horoscope logos

const signs = [
  {
    sign: 'Aries',
    url: 'https://astrology.com.au/wp-content/uploads/twelve_zodiac_icons/aries.png?x93593',
  },
  {
    sign: 'Taurus',
    url: 'https://astrology.com.au/wp-content/uploads/twelve_zodiac_icons/taurus.png?x93593',
  },
  {
    sign: 'Gemini',
    url: 'https://astrology.com.au/wp-content/uploads/twelve_zodiac_icons/gemini.png?x93593',
  },
  {
    sign: 'Cancer',
    url: 'https://astrology.com.au/wp-content/uploads/twelve_zodiac_icons/cancer.png?x93593',
  },
  {
    sign: 'Leo',
    url: 'https://astrology.com.au/wp-content/uploads/twelve_zodiac_icons/leo.png?x93593',
  },
  {
    sign: 'Virgo',
    url: 'https://astrology.com.au/wp-content/uploads/twelve_zodiac_icons/virgo.png?x93593',
  },
  {
    sign: 'Libra',
    url: 'https://astrology.com.au/wp-content/uploads/twelve_zodiac_icons/libra.png?x93593',
  },
  {
    sign: 'Scorpio',
    url: 'https://astrology.com.au/wp-content/uploads/twelve_zodiac_icons/scorpio.png?x93593',
  },
  {
    sign: 'Sagittarius',
    url: 'https://astrology.com.au/wp-content/uploads/twelve_zodiac_icons/sagittarius.png?x93593',
  },
  {
    sign: 'Capricorn',
    url: 'https://astrology.com.au/wp-content/uploads/twelve_zodiac_icons/capricorn.png?x93593',
  },
  {
    sign: 'Aquarius',
    url: 'https://astrology.com.au/wp-content/uploads/twelve_zodiac_icons/aquarius.png?x93593',
  },
  {
    sign: 'Pisces',
    url: 'https://astrology.com.au/wp-content/uploads/twelve_zodiac_icons/pisces.png?x93593',
  },
];

let username = '';

// added some basic validation for input.
const handleChange = (value) => {
  if (/^[a-zA-Z]{2,30}/.test(value) && value.length > 1) {
    username = value;
  } else {
    const errMsg = 'Your name is needed for a personalised horoscope - at least 2 letters long - with no numbers or special characters';
    document.getElementById('err-msg').innerHTML = errMsg;
    setTimeout(() => (document.getElementById('err-msg').innerHTML = ''), 3500);
    username = '';
  }
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
