$(document).ready(function () {

    if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
        $("#theme_selector").html("Theme: Light");
        $("#theme_selector").css("width", "12vw");
    }
    else {
        (document.documentElement.getAttribute('data-bs-theme') == 'light')
        $("#theme_selector").html("Theme: Dark");
        $("#theme_selector").css("width", "10.5vw");
    }
    $("#theme_selector").on({
        click: function () {
            if (document.documentElement.getAttribute('data-bs-theme') == 'dark') {
                document.documentElement.setAttribute('data-bs-theme', 'light');
                $("#theme_selector").html("Theme: Dark");
                $("#theme_selector").css("width", "10.5vw");
            }
            else {
                document.documentElement.setAttribute('data-bs-theme', 'dark');
                $("#theme_selector").html("Theme: Light");
                $("#theme_selector").css("width", "12vw");
            }
        },
    });
});