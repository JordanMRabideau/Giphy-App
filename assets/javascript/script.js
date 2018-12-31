var buttonArray = [
    "Final Fantasy",
    "Resident Evil",
    "Dark Souls",
];

localStorage.setItem("buttons", JSON.stringify(buttonArray));



function buttonMaker() {
    $(".buttons").empty();
    var retrievedData = JSON.parse(localStorage.getItem("buttons"));
    console.log(retrievedData.length)
    for (var i = 0; i < retrievedData.length; i++) {
        let button = $("<button>");
        button.text(retrievedData[i]);
        button.addClass("button")
        button.attr("data-name", retrievedData[i]);
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
            gif.addClass("gif");
            gif.attr("src", dataArray[i].images.fixed_height_small_still.url);
            gif.attr("data-state", "still");
            gif.attr("data-still", dataArray[i].images.fixed_height_small_still.url);
            gif.attr("data-loop", dataArray[i].images.fixed_height_small.url);
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
        localStorage.clear();
        buttonArray.push(search);
        localStorage.setItem("buttons", buttonArray);
        buttonMaker();
    } else if (buttonArray.indexOf(search) >= 0) {
        alert("That game is already in your list.");
    };
    console.log(buttonArray);
})

$(document).on("click", ".gif", function() {
    console.log("Click registered");
    var state = $(this).attr("data-state");
    console.log("Initial Data-state: " + state);
    if (state === "still") {
        $(this).attr("data-state", "loop");
        $(this).attr("src", $(this).attr("data-loop"));
    } else {
        $(this).attr("data-state", "still");
        $(this).attr("src", $(this).attr("data-still"));
    }
    console.log("Final Data-state: " + state);
})

buttonMaker();
console.log(buttonArray.indexOf("Halo"))

$(document).on("click", ".button", displayGif);

// Giphy API key: eu0i9BrdZG5H3Pht6B3h3zG1GUH1d0lU
