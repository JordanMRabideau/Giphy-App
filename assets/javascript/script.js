var buttonArray = [
    "Final Fantasy",
    "Resident Evil",
    "Dark Souls",
];

function buttonMaker() {
    $(".buttons").empty();
    for (var i = 0; i < buttonArray.length; i++) {
        let button = $("<button>");
        button.text(buttonArray[i]);
        button.addClass("button")
        button.attr("data-name", buttonArray[i]);
        $(".buttons").append(button);
    };
};

function displayGif() {
    $(".gifs").empty()
    var game = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + game + "&limit=10&rating=pg-13&api_key=eu0i9BrdZG5H3Pht6B3h3zG1GUH1d0lU"

    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function(response) {
        console.log(response);
        var dataArray = response.data;
        console.log(dataArray);
        for (i = 0; i < dataArray.length; i++) {
            var gifDiv = $("<div class='gif'>")
            gifDiv.css("float", "left");
            var rating = $("<p>").text("Rating: " + dataArray[i].rating);
            var gif = $("<img>");
            gif.attr("src", dataArray[i].images.fixed_height_small_still.url);
            gifDiv.append(rating);
            gifDiv.append(gif);
            $(".gifs").append(gifDiv);
        };
    });
};

$("#addButton").click(function(event) {
    event.preventDefault();
    var search = $("#searchBar").val().trim();
    console.log(search);
    $("#searchBar").val("");
    if ((buttonArray.indexOf(search) == -1) && (search !== "")) {
        buttonArray.push(search);
        buttonMaker();
    } else if (buttonArray.indexOf(search) >= 0) {
        alert("That game is already in your list.");
    };
    console.log(buttonArray);
})

buttonMaker();
console.log(buttonArray.indexOf("Halo"))

$(document).on("click", ".button", displayGif);

// Giphy API key: eu0i9BrdZG5H3Pht6B3h3zG1GUH1d0lU
