// http://www.stucox.com/blog/you-cant-detect-a-touchscreen/#poke-it
var hasTouch;
window.addEventListener('touchstart', function setHasTouch () {
    hasTouch = true;
    window.removeEventListener('touchstart', setHasTouch);
}, false);

if (hasTouch) {
  var cards = document.getElementsByClassName("card");
  for (var i = 0; i < cards.length; i++) {
    cards[i].className = cards[i].className.replace(" hoverable", "");
  }
}