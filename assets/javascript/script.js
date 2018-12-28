var buttonArray = [
    "Final Fantasy",
    "Resident Evil",
    "Dark Souls",
];

function buttonMaker() {
    // $(".buttons").empty();
    for (var i = 0; i < buttonArray.length; i++) {
        let button = $("<button>");
        button.text(buttonArray[i]);
        button.addClass("button")
        button.attr("data-name", buttonArray[i]);
        $(".buttons").append(button);
    };
};

function displayGif() {

    var game = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + game + "&limit=10&rating=pg-13&api_key=eu0i9BrdZG5H3Pht6B3h3zG1GUH1d0lU"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var gameDiv = $("<div class='game'>");

    })
}

buttonMaker();

$(".button").click(displayGif);


// Giphy API key: eu0i9BrdZG5H3Pht6B3h3zG1GUH1d0lU
