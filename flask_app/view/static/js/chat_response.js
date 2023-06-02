$(document).ready(function () {
    $("#submit_button").click(function () {
        var body = { "user_input": $("#user_input").val() };
        $.ajax({
            url: "/chatbot_answers",
            type: "post",
            data: JSON.stringify(body),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                $("#chat_answers").append("<p>" + response + "</p>");
            },
            error: function (xhr) {
                //Do Something to handle error
            }
        });
    });


    $("#user_input").on({
        press_enter: addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                console.log("fkinhell")
                event.preventDefault();
                document.getElementById("submit_button").click();
            }
        }),
        press_a: addEventListener("keypress", function (event) {
            if (event.key === "A") {
                console.log("fkinhell")
                event.preventDefault();

            }
        })

    });
});

