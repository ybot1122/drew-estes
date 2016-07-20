
// hide content
document.getElementById("main").style.display = "none";
document.getElementById("engage").style.display = "none";
document.getElementById("mailing-list").style.display = "none";

// preload images
var imagesToPreload = [
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image(),
    new Image()
];

var imageFilenames = [
    "./images/v_monkeytree-min.jpg",
    "./images/v_crab.jpg",
    "./images/v_hallway-min.jpg",
    "./images/h_city.jpg",
    "./images/hero.jpg",
    "./images/logo.jpg"
];

var loadedCount = 0;


var incrementLoadedCount = function() {
    this.onload = this.onerror = this.onabort = null;
    loadedCount++;
    if (loadedCount === imagesToPreload.length) {
        // TODO: iterator instead of hardcoded deletions
        delete imagesToPreload[0];
        delete imagesToPreload[1];
        delete imagesToPreload[2];
        delete imagesToPreload[3];
        delete imagesToPreload[4];

        setTimeout(function() {
            document.getElementById("preload").className = "done";
            setTimeout(function() {
                document.body.removeChild(
                    document.getElementById("preload")
                );
                document.getElementById("main").style.display = "block";
                document.getElementById("engage").style.display = "block";
                document.getElementById("mailing-list").style.display = "block";
            }, 500); // .5 sec for loader to fade out
        }, 250); // 250 ms hardcoded delay
    }
}

imagesToPreload.forEach(function(img, ind) {
    img.onload = img.onerror = img.onabort = incrementLoadedCount;
    img.src = imageFilenames[ind];
});