$(function () {
    $('button#mult_button').bind('click', function () {
        $.getJSON($SCRIPT_ROOT + '/multiply', {
            a: $('input[name="mult_number1"]').val(),
            b: $('input[name="mult_number2"]').val()
        }, function (data) {
            $("#mult_answer").text(data.result);
        });
        return false;
    });
});


$(function () {
    $('button#div_button').bind('click', function () {
        $.getJSON($SCRIPT_ROOT + '/divide', {
            a: $('input[name="div_number1"]').val(),
            b: $('input[name="div_number2"]').val()
        }, function (data) {
            $("#div_answer").text(data.result);
        });
        return false;
    });
});


$(function () {
    $('button#add_button').bind('click', function () {
        $.getJSON($SCRIPT_ROOT + '/add', {
            a: $('input[name="add_number1"]').val(),
            b: $('input[name="add_number2"]').val()
        }, function (data) {
            $("#add_answer").text(data.result);
        });
        return false;
    });
});


$(function () {
    $('button#subtract_button').bind('click', function () {
        $.getJSON($SCRIPT_ROOT + '/subtract', {
            a: $('input[name="subtract_number1"]').val(),
            b: $('input[name="subtract_number2"]').val()
        }, function (data) {
            $("#subtract_answer").text(data.result);
        });
        return false;
    });
});
