$("#submit_button").click(function(){
    var body = {"user_input": $("textarea").val()};
    $.ajax({
      url: "/chatbot_answers",
      type: "post",
      data: JSON.stringify(body),
      contentType: 'application/json; charset=utf-8',
      success: function(response) {
        $("#chat_answers").append("<p>" + response + "</p>");
      },
      error: function(xhr) {
        //Do Something to handle error
      }
    });
});