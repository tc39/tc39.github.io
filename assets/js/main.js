function toggleMenu() {
  var menu = document.querySelector('#menu');
  var maxHeight = menu.style.maxHeight;
  menu.style.maxHeight = Boolean(maxHeight) ? '' : menu.scrollHeight + 'px';
  menu.parentNode.classList.toggle('open');
}

function toggleProposal(item) {
  var content = item.querySelector('.featurelist__item__info');
  var maxHeight = content.style.maxHeight;
  content.style.maxHeight = Boolean(maxHeight) ? '' : content.scrollHeight + 'px';
  content.setAttribute('aria-hidden', Boolean(maxHeight));
  if (Boolean(maxHeight)) {
    content.setAttribute('tabindex', '-1');
  } else {
    content.removeAttribute('tabindex');
  }
  item.classList.toggle('open');
}

/**
 * Represents the start of this application
 */
function start() {
  var items = document.querySelectorAll('.featurelist__item .featurelist__item__intro');

  items.forEach(function (v) {
    v.addEventListener('click', function (ev) {
      toggleProposal(this.parentNode);
    });
    v.addEventListener('keypress', function (ev) {
      if (ev.key === "Enter" || ev.key === " ") {
        ev.preventDefault();
        toggleProposal(this.parentNode);
      }
    });
    v.addEventListener('keydown', function (ev) {
      var nextItem = ev.target.parentNode.nextElementSibling;
      var prevItem = ev.target.parentNode.previousElementSibling;
      if (ev.key === "ArrowDown" && nextItem && nextItem.classList.contains('featurelist__item')) {
        ev.preventDefault();
        nextItem.firstElementChild.focus();
      }
      if (ev.key === "ArrowUp" && prevItem && prevItem.classList.contains('featurelist__item')) {
        ev.preventDefault();
        prevItem.firstElementChild.focus();
      }
    });

  });

  document.querySelector('.menu-toggle').addEventListener('click', function (ev) {
    ev.preventDefault();
    toggleMenu();
  });

  document.querySelectorAll('.menu-link').forEach(function (link) {
    link.addEventListener('click', function (ev) {
      ev.preventDefault();
      toggleMenu();
      var target = document.querySelector(ev.target.getAttribute('href'));
      window.scrollTo({
        behavior: 'smooth',
        top: Math.floor(target.getBoundingClientRect().top + document.body.scrollTop)
      });
      setTimeout(function () {
        target.focus();
      }, 400);
    });
  });
}

start();
