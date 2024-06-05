/*!-----------------------------------------------------------------
    Name: Godlike - Gaming HTML Template
    Version: 2.4.4
    Author: nK
    Website: https://nkdev.info/
    Purchase: https://1.envato.market/godlike-html-info
    Support: https://nk.ticksy.com/
    License: You must have a valid license purchased only from ThemeForest (the above link) in order to legally use the theme for your project.
    Copyright 2024.
-------------------------------------------------------------------*/
    /******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
// eslint-disable-next-line no-unused-vars
var Slider = function () {
  var total;
  var $slide;
  var $slider;
  var sliderWidth;
  var increment = 120;
  var calculateX = function calculateX(position, sign, width) {
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
  var position = function position() {
    var sign;
    var half = $('.slide.active').index();
    var x = 0;
    var z = 0;
    var zindex;
    var scaleX = 1.3;
    var scaleY = 1.3;
    var transformOrigin;
    $slide.each(function (index, element) {
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
        transform: "translate3d(".concat(calculateX(x, sign, 300), "px, 0,").concat(z, "px) scale3d(").concat(scaleX, ",").concat(scaleY, ", 1)"),
        'z-index': zindex,
        'transform-origin-x': transformOrigin
      });
    });
  };
  var recalculateSizes = function recalculateSizes() {
    sliderWidth = $slider.width();
    position();
  };
  var clickedImage = function clickedImage() {
    $('.active').removeClass('active');
    $(this).addClass('active');
    position();
  };
  var addEvents = function addEvents() {
    $(window).resize(recalculateSizes);
    $(document).on('click', '.slide', clickedImage);
  };
  var on = function on() {
    $slider = $('.slider');
    $slide = $('.slide');
    sliderWidth = $slider.width();
    total = $slide.length;
    position();
  };
  var nextSlide = function nextSlide() {
    var $active = $('.slide.active');
    var $next = $active.next('.slide');
    if ($next.length === 0) {
      $next = $slide.first();
    }
    $active.removeClass('active');
    $next.addClass('active');
    position();
  };
  var previousSlide = function previousSlide() {
    var $active = $('.slide.active');
    var $prev = $active.prev('.slide');
    if ($prev.length === 0) {
      $prev = $slide.last();
    }
    $active.removeClass('active');
    $prev.addClass('active');
    position();
  };
  return {
    init: function init() {
      on();
      addEvents();

      // Swipe detection
      var swipeThreshold = 100; // Minimum distance (in pixels) for a swipe to be detected
      var allowedTime = 300; // Maximum time (in ms) for a valid swipe

      var touchStartX = 0;
      var touchEndX = 0;
      var touchStartTime = 0;
      document.addEventListener('touchstart', function (event) {
        var touch = event.changedTouches[0];
        touchStartX = touch.pageX;
        touchStartTime = new Date().getTime(); // Record start time
      }, false);
      document.addEventListener('touchmove', function (event) {
        // Calculate swipe distance
        var touch = event.changedTouches[0];
        var distanceX = touch.pageX - touchStartX;
        // Only prevent default behavior if swipe distance exceeds a threshold
        if (Math.abs(distanceX) > swipeThreshold) {
          event.preventDefault();
        }
      }, {
        passive: false
      });
      document.addEventListener('touchend', function (event) {
        var touch = event.changedTouches[0];
        touchEndX = touch.pageX;
        var elapsedTime = new Date().getTime() - touchStartTime; // Calculate the elapsed time

        if (elapsedTime <= allowedTime) {
          var distanceX = touchEndX - touchStartX;
          if (Math.abs(distanceX) >= swipeThreshold) {
            if (distanceX > 0) {
              previousSlide(); // Swipe right - show previous slide
            } else {
              nextSlide(); // Swipe left - show next slide
            }
          }
        }
      }, false);
    }
  };
}();
$(document).ready(function () {
  Slider.init();
  $('.leon-btn-buy.disabled').hover(function () {
    $(this).find('span.text-content').text('Coming Soon');
  }, function () {
    $(this).find('span.text-content').text('Buy $Leon');
  });
  $('.leon-btn-trailer.disabled').hover(function () {
    $(this).find('span.text-content').text('Coming Soon');
  }, function () {
    $(this).find('span.text-content').text('Trailer');
  });
  $('.nav-menu-item').on('click', function () {
    var clickedMenuItem = $(this);
    var activeNavItems = $('.nav-menu-item.active');
    activeNavItems.each(function () {
      $(this).removeClass('active');
    });
    clickedMenuItem.addClass('active');
  });
});
/******/ })()
;