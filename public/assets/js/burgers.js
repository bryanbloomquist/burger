$(function() {

    $(".change-devoured").on("click", function(event) {
        var id = $(this).data("id");
        console.log(id);
        var devouredStatus = $(this).data("devoured");
        var eatIt;
        if (!devouredStatus) {
            eatIt = 1;
        } else {eatIt = 0};
        console.log(devouredStatus);
        var newStatus = {devoured: eatIt};
        console.log(newStatus);
        $.ajax("/api/burgers/" + id, {
            type: "PUT",
            data: newStatus
        }).then(
            function() {
                console.log("Changed devoured to " + devouredStatus);
                location.reload();
            }
        );
    });

    $(".burger-form").on("submit", function(event) {
        event.preventDefault();
        var valid = true;
        if ($("#burger-name").val().trim() === "") {
            valid = false;
        }
        if (valid === false) {
            $("#warning-message").html("Burger Name Can Not Be Empty");
        } else if (valid === true) {
            $("#warning-message").html("");
            var newBurger = {
                burger_name: $("#burger-name").val().trim(),
                devoured: 0
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
        }
    });

});