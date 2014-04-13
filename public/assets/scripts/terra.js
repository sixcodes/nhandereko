$(function () {
    var $currentTab = $('.nav-tabs .antes');

    $('.nav-tabs').children().each(function (key, value) {
        $(value).click(function (ev) {
            $currentTab = toggleTabs($(this), $currentTab);
        });
    });
});

function toggleTabs (clicked, currentTab) {
    clicked.addClass('active');
    currentTab.removeClass('active');

    if (clicked.attr('class').indexOf('antes') > -1 ) {
        // selecionamos a div-antes
        $('.div-antes').show();
        $('.div-depois').hide();
    } else {
        $('.div-depois').show();
        $('.div-antes').hide();
    }

    return clicked;
}
