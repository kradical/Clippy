var keyWords = [];
var blackList = ['', 'A', 'TO', 'THE']
var currentWord = '';

(function loadImage() {
    var clippyImgURL = chrome.extension.getURL("images/clippy.gif");
    var html = '<img class="clippy_imageGIF" src="' + clippyImgURL + '"/>' +
               '<div class="clippy_textContainer">' +
                 '<div class="clippy_speechBubble">'+
                   '<div class="clippy_speechBubbleTip"></div>' +
                   '<div class="clippy_text"></div>' +
                   '<div class="clippy_textCancelButton">Cancel</div>' +
                 '</div>' +
               '</div>'
    $("body").append(html);
})();

function handleKeydown(e) {
    if (e.which >= 65 && e.which <= 90 ) {
        currentWord += String.fromCharCode(e.which)

    } else if(e.which === 8){
        currentWord = currentWord.slice(0,currentWord.length-1);
    } else {
        if (keyWords.length > 10) {
            keyWords.shift()
        }
        if (!($.inArray(currentWord, blackList) > -1)) {
            keyWords.push(currentWord);
        }
        currentWord = '';
    }
}

function makeSuggestion() {
    var clippyText;
    if(keyWords.length === 0) {
        clippyText = "Hi! I am Clippy, your office assistant. Would you like some assistance today?";
    } else {
        clippyText = keyWords.join(' ');
        $(".clippy_textCancelButton").show();
    }
    $(".clippy_text").text(clippyText);
    $(".clippy_textContainer").show();
}

window.setInterval(function() {
    makeSuggestion();
}, 5000)

$(document).on("keydown", function(e){
    handleKeydown(e);
});

$(".clippy_textCancelButton").on('click', function() {
    keyWords = [];
    $(".clippy_textCancelButton").hide();
    $(".clippy_textContainer").hide();
});