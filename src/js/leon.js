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
        const half = $('.slide.active').index();
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
            $(element).css({
                transform: `translate3d(${calculateX(x, sign, 300)}px, 0,${z}px) scale3d(${scaleX},${scaleY}, 1)`,
                'z-index': zindex,
                'transform-origin-x': transformOrigin,
            });
        });
    };

    const recalculateSizes = function () {
        sliderWidth = $slider.width();
        position();
    };

    const clickedImage = function () {
        $('.active').removeClass('active');
        $(this).addClass('active');
        position();
    };

    const addEvents = function () {
        $(window).resize(recalculateSizes);
        $(document).on('click', '.slide', clickedImage);
    };

    const on = function () {
        $slider = $('.slider');
        $slide = $('.slide');
        sliderWidth = $slider.width();
        total = $slide.length;
        position();
    };

    const nextSlide = function () {
        const $active = $('.slide.active');
        let $next = $active.next('.slide');
        if ($next.length === 0) {
            $next = $slide.first();
        }
        $active.removeClass('active');
        $next.addClass('active');
        position();
    };

    const previousSlide = function () {
        const $active = $('.slide.active');
        let $prev = $active.prev('.slide');
        if ($prev.length === 0) {
            $prev = $slide.last();
        }
        $active.removeClass('active');
        $prev.addClass('active');
        position();
    };

    return {
        init() {
            on();
            addEvents();

            // Swipe detection
            const swipeThreshold = 100; // Minimum distance (in pixels) for a swipe to be detected
            const allowedTime = 300; // Maximum time (in ms) for a valid swipe

            let touchStartX = 0;
            let touchEndX = 0;
            let touchStartTime = 0;

            document.addEventListener('touchstart', (event) => {
                const touch = event.changedTouches[0];
                touchStartX = touch.pageX;
                touchStartTime = new Date().getTime(); // Record start time
            }, false);

            document.addEventListener('touchmove', (event) => {
                event.preventDefault();
            }, { passive: false });

            document.addEventListener('touchend', (event) => {
                const touch = event.changedTouches[0];
                touchEndX = touch.pageX;
                const elapsedTime = new Date().getTime() - touchStartTime; // Calculate the elapsed time

                if (elapsedTime <= allowedTime) {
                    const distanceX = touchEndX - touchStartX;
                    if (Math.abs(distanceX) >= swipeThreshold) {
                        if (distanceX > 0) {
                            previousSlide(); // Swipe right - show previous slide
                        } else {
                            nextSlide(); // Swipe left - show next slide
                        }
                    }
                }
            }, false);
        },
    };
}());
$(document).ready(() => {
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
