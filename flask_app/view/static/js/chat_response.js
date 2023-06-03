class TextToType {
    text_to_rotate
    element
    period
    txt
    tick

    constructor(element, text_to_rotate, period) {
        this.text_to_rotate = text_to_rotate
        this.element = element
        this.period = period ? parseInt(period, 10) : 2000
        this.txt = ''
        this.tick()
    }


    tick = function (iteration = 0) {
        var fulltext = !iteration ? this.text_to_rotate[0] : this.text_to_rotate.substring(0, iteration)

        this.txt = fulltext.substring(0, this.txt.length + 1)
        this.element.innerHTML = '<span class="wrap" style="border-right: 0.08em solid #fff">' + this.txt + '</span>'

        var that = this
        var time_delta = 200 - (Math.random() * 100)



        if (iteration < this.text_to_rotate.length)
            setTimeout(function () {
                that.tick(iteration = iteration + 1);
            }, time_delta)
        else {
            this.element.innerHTML = '<span class="wrap">' + this.txt + '</span>'
        }
    }
}
function type_writer(element_id) {

    console.log(element_id)
    var element = document.getElementById(element_id)
    console.log(element)

    if (element) {
        var to_rotate = element.getAttribute('data-type')
        var period = element.getAttribute('data-period')

        console.log(to_rotate)
        console.log(period)

        if (to_rotate) {
            new TextToType(element, to_rotate, period)
        }
    }
}



$(document).ready(function () {
    $("#submit_button").click(function () {
        var body = { "user_input": $("#user_input").val() };
        $.ajax({
            url: "/chatbot_answers",
            type: "post",
            data: JSON.stringify(body),
            contentType: 'application/json; charset=utf-8',
            success: function (response) {
                var item_id = parseInt((Math.random() * 1000).toString()).toString()
                $("#chat_answers").append("<p id=" + item_id + " data-type='" + response + "'>" + "</p>");
                type_writer(item_id)
            },
            error: function (xhr) {
                //Do Something to handle error
            }
        });
    });


    $("#user_input").on({
        press_enter: addEventListener("keypress", function (event) {
            if (event.key === "Enter") {
                event.preventDefault();
                document.getElementById("submit_button").click();
            }
        }),
        press_a: addEventListener("keypress", function (event) {
            if (event.key === "A") {
                event.preventDefault();

            }
        })

    });
});

