/**
 * Represents the start of this application
 */
function start() {
  var items = document.querySelectorAll('.featurelist__item .featurelist__item__intro');

  items.forEach(function (v) {
    v.addEventListener('click', function (evt) {
      var content = this.parentNode.querySelector('.featurelist__item__info');
      var maxHeight = content.style.maxHeight;
      content.style.maxHeight = Boolean(maxHeight) ? '' : content.scrollHeight + 'px';
      this.parentNode.classList.toggle('open');
    });
  });
}

start();
