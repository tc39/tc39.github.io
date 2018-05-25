function toggleMenu() {
  var menu = document.querySelector('#menu');
  var maxHeight = menu.style.maxHeight;
  menu.style.maxHeight = Boolean(maxHeight) ? '' : menu.scrollHeight + 'px';
  menu.parentNode.classList.toggle('open');
}

/**
 * Represents the start of this application
 */
function start() {
  var items = document.querySelectorAll('.featurelist__item .featurelist__item__intro');

  items.forEach(function (v) {
    v.addEventListener('click', function (ev) {
      var content = this.parentNode.querySelector('.featurelist__item__info');
      var maxHeight = content.style.maxHeight;
      content.style.maxHeight = Boolean(maxHeight) ? '' : content.scrollHeight + 'px';
      this.parentNode.classList.toggle('open');
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
