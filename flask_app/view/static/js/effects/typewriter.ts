class TextToType2 {
    text_to_rotate: string
    element: Element
    loop_iteration: number
    period: number
    txt: string

    constructor(element: Element, text_to_rotate: string, period: string | null) {
        this.text_to_rotate = text_to_rotate
        this.element = element
        this.loop_iteration = 0
        this.period = period ? parseInt(period, 10) : 2000
        this.txt = ''
    }


    tick = function (this: TextToType2): void {
        var iteration = this.loop_iteration % this.text_to_rotate.length
        var fulltext = this.text_to_rotate[iteration]

        this.txt = fulltext.substring(0, this.txt.length + 1)
        this.element.innerHTML = '<span class="wrap>' + this.txt + '</span>'

        var that = this
        var time_delta = 200 - Math.random() * 100

        if (this.txt === fulltext) {
            time_delta = this.period
        } else if (this.txt === '') {
            this.loop_iteration++
        }
        time_delta = 500

        setTimeout(function () {
            that.tick();
        }, time_delta)
    }
}
var type_writer2 = ({ element_id }: { element_id: string }): void => {
    var element = document.getElementById(element_id)

    if (element) {
        var to_rotate = element.getAttribute('data-type')
        var period = element.getAttribute('data-period')

        if (to_rotate) {
            new TextToType(element, JSON.parse(to_rotate), period)
        }
    }

    var css_injection = document.createElement("style")
    css_injection.type = "text/css"
    css_injection.innerHTML = ".typewrite > .wrap { border-right: 0.08em solid #fff }"
    document.body.appendChild(css_injection)
}