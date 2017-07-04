var H = 106;
var W = 79;
var FIELD_SIZE = 500;
var DIFFICULTY = 5;
var numFaces = 5;


function cleanPage() {
    var cleaner = document.getElementById("leftSide");
    while (cleaner.firstElementChild) {
        cleaner.removeChild(cleaner.firstElementChild);
    }
    cleaner = document.getElementById("rightSide");
    while (cleaner.firstElementChild) {
        cleaner.removeChild(cleaner.firstElementChild);
    }
}

function win() {
    alert("You win!");
    cleanPage();
    numFaces += DIFFICULTY;
    generateFaces();
}

function loose() {
    window.setTimeout(function(){
        alert("You loose!");
        cleanPage();
        numFaces = DIFFICULTY;
        generateFaces();
    },100);
}


function generateFaces(){
    var theLeftSide = document.getElementById("leftSide");
    var theRightSide = document.getElementById("rightSide");

    function setStyle(imageFancy, randomL, randomT, correct) {
        imageFancy.src = "smile.gif";
        imageFancy.style.left = randomL + "px";
        imageFancy.style.top =  randomT + "px";
        imageFancy.style.height = H;
        imageFancy.style.width = W;
        if (correct) {
            imageFancy.onclick = win;
        }
        else {
            imageFancy.onclick = loose;
        }
    }

    function setStyleDummy(imageFancy, randomL, randomT, correct) {
        imageFancy.src = "smile.gif";
        imageFancy.style.left = randomL + "px";
        imageFancy.style.top =  randomT + "px";
        imageFancy.style.height = H;
        imageFancy.style.width = W;
    }

    for (var i = 0; i < numFaces; i++){
            var randomLeft = Math.floor(Math.random() * (FIELD_SIZE - W));
            var randomTop = Math.floor(Math.random() * (FIELD_SIZE - H));

            var imageLeft = document.createElement("img");
            setStyleDummy(imageLeft, randomLeft, randomTop);
            theLeftSide.appendChild(imageLeft);

            var imageRight = document.createElement("img");
            setStyle(imageRight, randomLeft, randomTop);
            theRightSide.appendChild(imageRight);
    }

    var imageCorrect = document.createElement("img");
    var randomLeft = Math.random() * (FIELD_SIZE - W);
    var randomTop = Math.random() * (FIELD_SIZE - H);
    setStyle(imageCorrect, randomLeft, randomTop, true);

    theRightSide.appendChild(imageCorrect);
}
