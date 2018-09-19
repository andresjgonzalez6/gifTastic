$(document).ready(function() {

    var animals = [
      "dog", "cat", "shark", "hamster", "skunk", "goldfish",
      "lion", "ferret", "turtle", "frog", "chinchilla",
      "hedgehog", "manta ray", "crab", "goat", "chicken",
      "capybara", "horse", "manatee", "salamander", "whale"
    ];
    console.log(animals);
  
    // function to make buttons and add to page
    function populateButtons(tempArray, classToAdd, areaToAddTo) {
      $(areaToAddTo).empty();
  
      for (var i = 0; i < tempArray.length; i++) {
        var b = $("<button>");
        b.addClass(classToAdd);
        b.attr("data-type", tempArray[i]);
        b.text(tempArray[i]);
        $(areaToAddTo).append(b);
      }
    }
  
    $(document).on("click", ".animal-button", function() {
      $("#animals").empty();
      $(".animal-button").removeClass("active");
      $(this).addClass("active");
  
      var type = $(this).attr("data-type");
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" + type + "&api_key=dc6zaTOxFJmzC&limit=10";
  
      $.ajax({
        url: queryURL,
        method: "GET"
      })
        .then(function(response) {
          var results = response.data;
  
          for (var i = 0; i < results.length; i++) {
            var animalDiv = $("<div class=\"animal-item\">");
  
            var rating = results[i].rating;
  
            var p = $("<p>").text("Rating: " + rating);
  
            var animated = results[i].images.fixed_height.url;
            var still = results[i].images.fixed_height_still.url;
  
            var animalImage = $("<img>");
            animalImage.attr("src", still);
            animalImage.attr("data-still", still);
            animalImage.attr("data-animate", animated);
            animalImage.attr("data-state", "still");
            animalImage.addClass("animal-image");
  
            animalDiv.append(p);
            animalDiv.append(animalImage);
  
            $("#animals").append(animalDiv);
            console.log(rating);
          }
        });
    });
  
    $(document).on("click", ".animal-image", function() {
  
      var state = $(this).attr("data-state");
  
      if (state === "still") {
        $(this).attr("src", $(this).attr("data-animate"));
        $(this).attr("data-state", "animate");
      }
      else {
        $(this).attr("src", $(this).attr("data-still"));
        $(this).attr("data-state", "still");
      }
    });
  
    $("#add-animal").on("click", function(event) {
      event.preventDefault();
      var newAnimal = $("input").eq(0).val();
  
      //if (newAnimal.length > 2) {
        animals.push(newAnimal);
    //  }
  
      populateButtons(animals, "animal-button", "#animal-buttons");
      console.log(animals);
      console.log("new animal:" + newAnimal);
    });
  
    populateButtons(animals, "animal-button", "#animal-buttons");
  });
  