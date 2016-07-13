var hoverableEnabled = window.touchstart === undefined;

if (hoverableEnabled) {
  var cards = document.getElementsByClassName("card");
  for (var i = 0; i < cards.length; i++) {
    console.log(cards[i].className);
    cards[i].className += " hoverable";
  }
}