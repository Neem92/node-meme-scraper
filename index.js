import fs from 'node:fs';
import fetch from 'node-fetch';
import { parse } from 'node-html-parser';

// directory path
const dir = './memes';

if (fs.existsSync(dir)) {
  console.log('Directory exists!');
} else {
  fs.mkdir(dir, (err) => {
    if (err) {
      throw err;
    }
    console.log('Directory is created.');
  });
}

// create new directory

const response = await fetch(
  'https://memegen-link-examples-upleveled.netlify.app/',
);
const data = await response.text();

const root = parse(data);

const images = root.querySelectorAll('img');

const links = [];

images.forEach((image, index) => {
  if (index < 10) {
    links.push(image.getAttribute('src'));
  }
});

for (let i = 0; i < 10; i++) {
  console.log('downloading', i, links[i]);
  const imageResponse = await fetch(links[i]);
  // ternary operator
  const name = i > 8 ? `./memes/${i + 1}.jpg` : `./memes/0${i + 1}.jpg`;
  imageResponse.body.pipe(fs.createWriteStream(name));
}
