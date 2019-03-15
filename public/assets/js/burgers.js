$(function() {

    $(".change-devoured").on("click", function(event) {
        var id = $(this).data("id");
        var eatenStatus = $(this).data("newdevoured");
        var newStatus = {eaten: eatenStatus};
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newStatus
        }).then(
            function() {
                console.log("Changed list to " + newStatus);
                location.reload();
            }
        );
    });

    $(".add-burger").on("submit", function(event) {
        event.preventDefault();
        var newBurger = {
            burger_name: $("burger-name").val().trim(),
            devoured: false
        };
        $.ajax("/api/burgers", {
            type: "POST",
            data: newBurger
        }).then(
            function() {
                console.log("Added new burger");
                location.reload();
            }
        );
    });

});