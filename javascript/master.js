'use strict';

// check local storage data


let mainColor = localStorage.getItem('main-color');
let isRandomBackground = localStorage.getItem('random-background');
let showBullets = localStorage.getItem('show-bullets');

if (showBullets == null) {
  document.querySelectorAll('.options-bullets span').forEach(span => {
    span.classList.remove('active');
    if (span.dataset.show == '1') {
      span.classList.add('active');
    }
    console.log('null');
  });


} else if (showBullets == '1') {
  document.querySelectorAll('.options-bullets span').forEach(span => {
    span.classList.remove('active');
    if (span.dataset.show == '1') {
      span.classList.add('active');
    }
    console.log('1');
  });
} else {
  document.querySelectorAll('.options-bullets span').forEach(span => {
    span.classList.remove('active');
    if (span.dataset.show == '0') {
      span.classList.add('active');
    }
    document.querySelector('.navigate-bullets').style.display = 'none';
  });
}


if (mainColor !== null) {
  document.documentElement.style.setProperty('--main-color', mainColor);

  document.querySelectorAll('.colors-list li').forEach(li => {
    li.classList.remove('active');

    if (li.dataset.color == mainColor) {
      li.classList.add('active');
    }
  })

}

if (isRandomBackground !== null && isRandomBackground == 1) {
  document.querySelectorAll('.options-bg div span').forEach(span => {
    span.classList.remove('active');
    if (span.dataset.background == 1) {
      span.classList.add('active');
    }
  });
} else if (isRandomBackground == null) {
  document.querySelectorAll('.options-bg div span').forEach(span => {
    span.classList.remove('active');
    if (span.dataset.background == 1) {
      span.classList.add('active');
    }
  });
} else {
  document.querySelectorAll('.options-bg div span').forEach(span => {
    span.classList.remove('active');
    if (span.dataset.background == 0) {
      span.classList.add('active');
    }
  });
}

// changing landing page images 

let interval;

function backgroundRandom() {
  let isRandomBackground = localStorage.getItem('random-background');
  if (isRandomBackground == '1' || isRandomBackground == null) {
    interval = setInterval(() => {
      let imageIndex = Math.floor(Math.random() * 6);
      document.querySelector('.landing').style.backgroundImage = `url(../assets/l${imageIndex}.jpg)`
    }, 10000)
  } else {
    clearInterval(interval);
    document.querySelector('.landing').style.backgroundImage = 'url(../assets/batata.png)'
  }
}

backgroundRandom()

// open settings box 

document.querySelector('.gear').onclick = () => {
  document.querySelector('.settings-box').classList.toggle('open');
}

// Switch the main color 

let colorsLi = document.querySelectorAll('.colors-list li');

colorsLi.forEach(li => {
  li.addEventListener('click', (e) => {
    document.documentElement.style.setProperty('--main-color', e.target.dataset.color);
    localStorage.setItem('main-color', e.target.dataset.color);

    li.parentElement.querySelectorAll('.active').forEach(element => {
      element.classList.remove('active');
    });

    li.classList.add('active');
  })
});

let bgOptions = document.querySelectorAll('.options-bg span');

bgOptions.forEach(span => {
  span.addEventListener('click', (e) => {
    span.parentElement.querySelectorAll('.active').forEach(element => {
      element.classList.remove('active');
    })
    span.classList.add('active');
    localStorage.setItem('random-background', e.target.dataset.background);
    backgroundRandom();
  });
});


let skillsArea = document.querySelector('.skills');


window.onscroll = function () {
  //skills top offset  (the destance from top until i reach the element) 
  let skillsOffsetTop = skillsArea.offsetTop

  //skills offset highet (the element highet without the margin)
  let skillsOffsetHighet = skillsArea.offsetHeight

  //find the total height of the window
  let windowHeight = window.innerHeight;

  //scroll spot 
  let scrollSpot = window.pageYOffset;

  if (scrollSpot > (skillsOffsetTop + skillsOffsetHighet - windowHeight)) {
    let skills = document.querySelectorAll('.skills-box .sk');
    skills.forEach(skill => {
      skill.children[1].children[0].style.width = skill.children[1].children[0].dataset.progress
    });
  }
}

// create image modal 

let images = document.querySelectorAll('.portfolio .images-box img')

images.forEach(img => {
  img.addEventListener('click', (e) => {
    let overlay = document.createElement('div');

    overlay.className = 'modal-background';
    document.body.appendChild(overlay);

    let imageBox = document.createElement('div');
    imageBox.className = 'image-box-popup'
    overlay.appendChild(imageBox);

    let image = document.createElement('img');

    image.src = img.src;
    if (img.alt !== '') {
      let description = document.createElement('p');
      description.className = 'description'
      description.textContent = img.alt
      imageBox.appendChild(image);
      imageBox.appendChild(description);


    } else {
      let description = document.createElement('p');
      description.className = 'description'
      description.textContent = 'No alternate text for this image :(';
      imageBox.appendChild(image);
      imageBox.appendChild(description);
    }
    overlay.addEventListener('click', (e) => {
      document.body.removeChild(overlay)
    })
  })
})


let allBullets = document.querySelectorAll('.navigate-bullets div')


allBullets.forEach(bullet => {
  bullet.addEventListener('click', (e) => {
    document.querySelector(`.${e.target.dataset.page}`).scrollIntoView({
      behavior: 'smooth',
    });
  })
});


let naviOptions = document.querySelectorAll('.options-bullets span');

naviOptions.forEach(span => {
  span.addEventListener('click', (e) => {
    console.log(span.parentElement)
    span.parentElement.querySelectorAll('span').forEach(span => {
      span.classList.remove('active');
    })
    localStorage.setItem('show-bullets', e.target.dataset.show);
    span.classList.add('active');
    if (span.dataset.show == '1') {
      document.querySelector('.navigate-bullets').style.display = 'flex';
    } else {
      document.querySelector('.navigate-bullets').style.display = 'none';
    }
  });
});

document.querySelector('.reset-button').addEventListener('click', () => {
  localStorage.clear();
  window.location.reload();
  alert('Settings Reloaded');
})