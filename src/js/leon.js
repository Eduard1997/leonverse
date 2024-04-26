// eslint-disable-next-line no-unused-vars
const Slider = (function () {
    let total;
    let $slide;
    let $slider;
    let sliderWidth;
    const increment = 120;

    const calculateX = function (position, sign, width) {
        switch (sign) {
        case 1:
        case 0:
            return position - width / 2;
        case -1:
            return position - width / 2;
        default:
            return -1;
        }
    };
    const position = function () {
        let sign;
        const half = $('.slide.active')
            .index();
        let x = 0;
        let z = 0;
        let zindex;
        let scaleX = 1.3;
        let scaleY = 1.3;
        let transformOrigin;
        $slide.each((index, element) => {
            // eslint-disable-next-line no-multi-assign
            scaleX = scaleY = 1;
            transformOrigin = sliderWidth / 2;
            if (index < half) {
                sign = 1;
                zindex = index + 1;
                x = sliderWidth / 2 - increment * (half - index + 1);
                z = -increment * (half - index + 1);
            } else if (index > half) {
                sign = -1;
                zindex = total - index;
                x = sliderWidth / 2 + increment * (index - half + 1);
                z = -increment * (index - half + 1);
            } else {
                sign = 0;
                zindex = total;
                x = sliderWidth / 2;
                z = 1;
                // eslint-disable-next-line no-multi-assign
                scaleX = scaleY = 1.2;
                transformOrigin = 'initial';
            }
            $(element)
                .css(
                    {
                        transform: `translate3d(${calculateX(x, sign, 300)}px, 0,${z}px) scale3d(${scaleX},${scaleY}, 1)`,
                        'z-index': zindex,
                        'transform-origin-x': transformOrigin,
                    },
                );
        });
    };

    const recalculateSizes = function () {
        sliderWidth = $slider.width();
        position();
    };

    const clickedImage = function () {
        $('.active')
            .removeClass('active');
        $(this)
            .addClass('active');
        position();
    };

    const addEvents = function () {
        $(window)
            .resize(recalculateSizes);
        $(document)
            .on('click', '.slide', clickedImage);
    };
    const on = function () {
        console.log("intra slider");
        $slider = $('.slider');
        $slide = $('.slide');
        sliderWidth = $slider.width();
        total = $slide.length;
        position();
    };

    return {
        init() {
            on();
            addEvents();
        },
    };
}());
$(document).ready(() => {
    console.log("intra leon");
    Slider.init();

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
