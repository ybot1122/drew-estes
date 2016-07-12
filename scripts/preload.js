// preload images
var imagesToPreload = [
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image()
];

var imageFilenames = [
    "./hero.jpg",
    "./images/h_city.jpg",
    "./images/s_treehouse.jpg",
    "./images/h_cow.jpg",
    "./images/h_city.jpg"
];

var loadedCount = 0;

var incrementLoadedCount = function() {
    this.onload = this.onerror = this.onabort = null;
    loadedCount++;
    console.log(loadedCount);
    if (loadedCount === imagesToPreload.length) {
        // TODO: iterator instead of hardcoded deletions
        delete imagesToPreload[0];
        delete imagesToPreload[1];
        delete imagesToPreload[2];
        delete imagesToPreload[3];
        delete imagesToPreload[4];
        // static 250ms delay, always
        setTimeout(function() {
            document.getElementById("header").style.display = "block";
            document.getElementById("main").style.display = "block";

            document.body.removeChild(
                document.getElementById("preload")
            );

            var nav = function() {
                window.location.href = "./list.html";
            }

            document.getElementById("a").onclick 
                = document.getElementById("b").onclick
                = document.getElementById("c").onclick
                = document.getElementById("d").onclick = nav;
        }, 250);
    }
}

imagesToPreload.forEach(function(img, ind) {
    img.onload = img.onerror = img.onabort = incrementLoadedCount;
    img.src = imageFilenames[ind];
});