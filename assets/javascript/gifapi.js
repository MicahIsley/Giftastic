var gifCategory = ["cats", "dogs"];

function alertGifName() {
        var gifType = $(this).attr("data-name");

        console.log(gifType);
      }

function renderButtons() {

        // Deleting the movies prior to adding new movies
        // (this is necessary otherwise we will have repeat buttons)
        $("#buttons-go-here").empty();

        // Looping through the array of movies
        for (var i = 0; i < gifCategory.length; i++) {

          // Then dynamicaly generating buttons for each movie in the array
          // This code $("<button>") is all jQuery needs to create the start and end tag. (<button></button>)
          var a = $("<button>");
          // Adding a class of movie to our button
          a.addClass("gif");
          // Adding a data-attribute
          a.attr("data-name", gifCategory[i]);
          // Providing the initial button text
          a.text(gifCategory[i]);
          // Adding the button to the HTML
          $("#buttons-go-here").append(a);
        }
      }


$("#add-gif").on("click", function(event) {
        // Preventing the buttons default behavior when clicked (which is submitting a form)
        event.preventDefault();
        // This line grabs the input from the textbox
        var gif = $("#gif-input").val().trim();

        // Adding the movie from the textbox to our array
        gifCategory.push(gif);

        // Calling renderButtons which handles the processing of our movie array
        renderButtons();

      });

$(document).on("click", ".gif", alertGifName);

      // Calling the renderButtons function to display the intial buttons
      renderButtons();

function displayGifs() {
      var category = $(this).attr("data-name");
      var queryURL = "http://api.giphy.com/v1/gifs/search?q=" +
        category + "&api_key=dc6zaTOxFJmzC&limit=10";
      console.log($(this).attr("data-name"));
      $.ajax({
        url: queryURL,
        method: "GET"
      }).done(function(response) {
        // Step 1: Run this file, click a button, and see what the response object looks like in the browser's console.
        // Open up the data key, then open up the 0th, element. Study the keys and how the JSON is structured.

        console.log(response);

        // Step 2: since the image information is inside of the data key,
        // make a variable named results and set it equal to response.data

        // =============== put step 2 in between these dashes ==================
        var results = response.data
        // ========================

        for (var i = 0; i < results.length; i++) {

        // Step 3: uncomment the for loop above and the closing curly bracket below.
        var gifDiv = $("<div class='item'>");
        // Make a div with jQuery and store it in a variable named animalDiv.
        var p = $("<p>").text("Rating: "+results[i].rating);
        // Make a paragraph tag with jQuery and store it in a variable named p.
        // Set the inner text of the paragraph to the rating of the image in results[i].
        var gifImage = $("<img>");
        // Make an image tag with jQuery and store it in a variable named animalImage.
        gifImage.attr("src", results[i].images.fixed_height_still.url);
        // Set the image's src to results[i]'s fixed_height.url.
        gifImage.attr("data-state", "still");
        gifImage.attr("data-animate", results[i].images.fixed_height.url);
        gifImage.attr("data-still", results[i].images.fixed_height_still.url);
        gifDiv.append(p);
        // Append the p variable to the animalDiv variable.
        gifDiv.append(gifImage);
        // Append the animalImage variable to the animalDiv variable.
        $("#gifs-go-here").prepend(gifDiv);
        // Prepend the animalDiv variable to the element with an id of gifs-appear-here.

        // ============= put step 3 in between these dashes ======================

        // ==================================
        }

      });
    };    

    $(document).on("click", ".gif", displayGifs);

function pauseGifs() {
      // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
      var state = $(this).attr("data-state");
      // If the clicked image's state is still, update its src attribute to what its data-animate value is.
      // Then, set the image's data-state to animate
      // Else set src to the data-still value
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
        console.log("heyo");
      } else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
        console.log("something");
      }
    };

$(document).on("click", "img", pauseGifs);






