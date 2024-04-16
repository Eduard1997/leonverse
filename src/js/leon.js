$(document).ready(() => {
    $('.leon-btn-buy.disabled').hover(
        function () {
            $(this).find('span.text-content').text('Coming Soon');
        },
        function () {
            $(this).find('span.text-content').text('Buy $Leon');
        },
    );

    $('.leon-btn-trailer.disabled').hover(
        function () {
            $(this).find('span.text-content').text('Coming Soon');
        },
        function () {
            $(this).find('span.text-content').text('Trailer');
        },
    );

    $('.nav-menu-item').on('click', function () {
        const clickedMenuItem = $(this);
        const activeNavItems = $('.nav-menu-item.active');

        activeNavItems.each(function () {
            $(this).removeClass('active');
        });

        clickedMenuItem.addClass('active');
    });
});
