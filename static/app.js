$(function () {
    $('button#calculate').bind('click', function () {
        $.getJSON($SCRIPT_ROOT + '/calculate', {
            a: $('input[name="number1"]').val(),
            b: $('input[name="number2"]').val(),
            oper: $('select#operation').val(),
            key: 'qweasdzxc'
        }, function (data) {
            $("#answer").text(data.result);
        });
        return false;
    });
});
