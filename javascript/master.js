'use strict';

// check local storage for color theme

let mainColor = localStorage.getItem('main-color');

if (mainColor !== null) {
  document.documentElement.style.setProperty('--main-color', mainColor);

  document.querySelectorAll('.colors-list li').forEach(li => {
    li.classList.remove('active');
  })

  document.querySelectorAll('.colors-list li').forEach(li => {
    if (li.dataset.color == mainColor) {
      li.classList.add('active');
    }
  })
}

// changing landing page images 

setInterval(() => {
  let imageIndex = Math.floor(Math.random() * 6);
  document.querySelector('.landing').style.backgroundImage = `url(../assets/l${imageIndex}.jpg)`
}, 10000)


//open settings box 

document.querySelector('.gear').onclick = () => {
  document.querySelector('.settings-box').classList.toggle('open');

}

// Switch the main color 

let colorsLi = document.querySelectorAll('.colors-list li');

colorsLi.forEach((li, i) => {
  li.addEventListener('click', (e) => {
    document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
    localStorage.setItem('main-color', e.target.dataset.color);

    li.parentElement.querySelectorAll('.active').forEach(element => {
      element.classList.remove('active');
    });

    li.classList.add('active');
  })
});

