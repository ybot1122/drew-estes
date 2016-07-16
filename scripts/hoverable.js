// http://www.stucox.com/blog/you-cant-detect-a-touchscreen/#poke-it
window.addEventListener('touchstart', function setHasTouch () {
    var cards = document.getElementsByClassName("card");
    for (var i = 0; i < cards.length; i++) {
      cards[i].className = cards[i].className.replace(" hoverable", "");
    }
    window.removeEventListener('touchstart', setHasTouch);
}, false);
