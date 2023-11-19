class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }

  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }

  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }

  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

const phrases = [
  'Bjørnar Borge',
  'Norway',
  'ageTextPlaceholder',
  'DevOps Engineer',
  'Education:',
  'Bachelor in Computer Science',
  'Currently doing a Master in Cyber Security',
  'IT knowledge:',
  'App Development',
  'Web Development',
  'Desktop Applications Development',
  'DevOps',
  'Databases',
  'Cyber Security',
  'Ethical Hacking',
  'Coding Languages:',
  'Python',
  'C#',
  'Java',
  'JavaScript',
  'PHP',    
  'HTML',
  'CSS',
  'Bash',
  'PowerShell',
  'Databases:',
  'SQL',
  'MySQL',
  'PostgreSQL',
  'Firebase',
  'Technologies:',
  'Docker',
  'AWS',
  'Azure DevOps',
];

const el = document.querySelector('.text');
const fx = new TextScramble(el);
let counter = 0;
let ageText = getAgeText(); // Initialize age text

const next = () => {
  if (counter === 0) {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 1500);
    });
  } else if (counter === 2) {
    const newAgeText = getAgeText(); // Retrieve the updated age text
    if (newAgeText !== ageText) {
      ageText = newAgeText;
      phrases[2] = ageText; // Update the 'ageTextPlaceholder' with the new age text
    }
    fx.setText(ageText).then(() => {
      setTimeout(next, 1500);
    });
  } else {
    fx.setText(phrases[counter]).then(() => {
      setTimeout(next, 1500);
    });
  }
  
  counter = (counter + 1) % phrases.length;
};

function getAgeText() {
  const currentDate = new Date();
  const birthYear = 1991; // Replace with your birth year
  const birthDate = new Date(birthYear, 9, 16); // Replace 3 with the month index of your birth month (April is 3)
  
  let age = currentDate.getFullYear() - birthDate.getFullYear();
  
  // Check if birthday has occurred this year
  if (
    currentDate.getMonth() < birthDate.getMonth() ||
    (currentDate.getMonth() === birthDate.getMonth() && currentDate.getDate() < birthDate.getDate())
  ) {
    age--;
  }
  
  return `${age} years old`;
}    

next();
