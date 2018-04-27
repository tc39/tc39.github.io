/**
 * Represents the start of this application
 */
function start() {
  var items = document.querySelectorAll('.featurelist__item .featurelist__item__intro');
  items.forEach(function(v) {
    v.addEventListener('click', function(evt) {
      console.log(this);
      this.parentNode.classList.toggle('open');
    })
  })

}

start();
