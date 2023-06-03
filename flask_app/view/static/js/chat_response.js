class TextToType {
    text_to_rotate
    element
    period
    txt
    tick
    erase_text_cursor
    light_text_cursor

    constructor(element, text_to_rotate, period) {
        this.text_to_rotate = text_to_rotate
        this.element = element
        this.period = period ? parseInt(period, 10) : 2000
        this.txt = ''
    }

    light_text_cursor = function () {
        this.element.style.setProperty("border-right", "0.08em solid #fff")
        this.element.innerText = "."
    }
    erase_text_cursor = function (elipses = false) {
        this.element.style.setProperty("border-right", "0em")
        if (elipses) this.element.innerText = "."
    }
    tick = function (iteration = 0) {
        var fulltext = !iteration ? this.text_to_rotate[0] : this.text_to_rotate.substring(0, iteration)

        this.txt = fulltext.substring(0, this.txt.length + 1)
        this.element.style.setProperty("border-right", "0.08em solid #fff")
        this.element.style.setProperty("width", "fit-content")
        this.element.innerText = this.txt

        var that = this
        var time_delta = 200 - (Math.random() * 100)

        if (iteration < this.text_to_rotate.length) {
            setTimeout(function () {
                that.tick(iteration = iteration + 1);
            }, time_delta)
        } else {
            setTimeout(function () {
                that.erase_text_cursor();
            }, 500)
        }
    }
}

function type_writer(element_id, text) {

    console.log(element_id)
    var element = document.getElementById(element_id)
    console.log(element)

    if (element) {
        var period = element.getAttribute('data-period')

        if (text) {
            typewrite_text = new TextToType(element, text, period)
            setTimeout(function () {
                typewrite_text.light_text_cursor();
            }, 250)

            setTimeout(function () {
                typewrite_text.erase_text_cursor(true);
            }, 525)

            setTimeout(function () {
                typewrite_text.tick(0);
            }, 750)
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
                $("#chat_answers").append(`<p class="wrap" style="width:fit-content" id=${item_id}></p>`)
                type_writer(item_id, response)
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

