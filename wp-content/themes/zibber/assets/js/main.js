/***************************************************
 ==================== JS INDEX ======================
 ****************************************************
 01. PreLoader Js
 02. Search Js
 03. Info Bar Js
 04. Sticky Header Js
 05. Data-Background Js
 06. Mobile Menu Js
 07. Scroll To Top Js
 08. Hero Slider Js
 09. Testimonial Js
 10. Product Slider Js
 11. Product Slider 2 Js
 12. Product Slider 3 Js
 13. Product Slider 4 Js
 14. Sale Slider Js
 15. Sale Slider 2 Js
 16. Client Slider Js
 17. Blog Slider Js
 18. Product Offer SLider Js
 19. Masonary Js
 20. WoW Js
 21. Cart Plus Minus Js
 22. Range Slider Js
 23. Show Login Toggle Js
 24. Show Coupon Toggle Js
 25. Create An Account Toggle Js
 26. Shipping Box Toggle Js
 ****************************************************/

(function ($) {
  "use strict";

  var windowOn = $(window);

  // windowOn
  windowOn.on("load", function () {
    $("#preloader").delay(350).fadeOut("slow");
    $("body").delay(350).css({ overflow: "visible" });
  });

  // Activate rtl slider
  let rtl_setting = $("body").hasClass("rtl") ? true : false;

  ////////////////////////////////////////////////////
  // 01. PreLoader Js
  windowOn.on("load", function () {
    $("#loading").fadeOut(500);
  });

  // meanmenu
  $("#mobile-menu").meanmenu({
    meanMenuContainer: ".mobile-menu",
    meanScreenWidth: "991",
    meanExpand: ['<i class="fal fa-plus"></i>'],
  });

  ////////////////////////////////////////////////////
  // 03. Info Bar Js
  $("#sidebar-toggle").on("click", function () {
    $(".sidebar__area").addClass("sidebar-opened");
    $(".body-overlay").addClass("opened");
  });
  $(".sidebar__close-btn").on("click", function () {
    $(".sidebar__area").removeClass("sidebar-opened");
    $(".body-overlay").removeClass("opened");
  });
  $(".body-overlay").on("click", function () {
    $(".sidebar__area").removeClass("sidebar-opened");
    $(".body-overlay").removeClass("opened");
  });
  $(".body-overlay-2").on("click", function () {
    $(".header__search-wrapper").removeClass("opened");
    $(".search-toggle i").removeClass("fa-times");
    $(".body-overlay-2").removeClass("opened");
  });

  let searchToggleStatus = false;
  $(".search-toggle").on("click", function () {
    if (searchToggleStatus === false) {
      $(".header__search-wrapper").addClass("opened");
      $(".search-toggle i").addClass("fa-times");
      $(".body-overlay-2").addClass("opened");
      searchToggleStatus = true;
    } else if (searchToggleStatus === true) {
      $(".header__search-wrapper").removeClass("opened");
      $(".search-toggle i").removeClass("fa-times");
      $(".body-overlay-2").removeClass("opened");

      searchToggleStatus = false;
    }
  });

  ////////////////////////////////////////////////////
  // 04. Sticky Header Js
  windowOn.on("scroll", function () {
    var scroll = $(window).scrollTop();
    if (scroll < 100) {
      $("#header__sticky").removeClass("sticky");
    } else {
      $("#header__sticky").addClass("sticky");
    }
  });

  ////////////////////////////////////////////////////
  // 05. Data-Background Js
  $("[data-background]").each(function () {
    $(this).css("background-image", "url( " + $(this).attr("data-background") + "  )");
  });
  $("[data-bg-color]").each(function () {
    $(this).css("background-color", $(this).attr("data-bg-color"));
  });

  ////////////////////////////////////////////////////
  // 07. Scroll To Top Js
  function smoothSctollTop() {
    $(".smooth-scroll a").on("click", function (event) {
      var target = $(this.getAttribute("href"));
      if (target.length) {
        event.preventDefault();
        $("html, body")
          .stop()
          .animate(
            {
              scrollTop: target.offset().top - 0,
            },
            1500
          );
      }
    });
  }

  smoothSctollTop();

  // Show or hide the sticky footer button
  windowOn.on("scroll", function (event) {
    if ($(this).scrollTop() > 600) {
      $("#scroll").fadeIn(200);
    } else {
      $("#scroll").fadeOut(200);
    }
  });

  //Animate the scroll to yop
  $("#scroll").on("click", function (event) {
    event.preventDefault();

    $("html, body").animate(
      {
        scrollTop: 0,
      },
      1500
    );
  });

  ////////////////////////////////////////////////////
  // 08. Hero Slider Js
  function mainSlider() {
    var BasicSlider = $(".slider-active");

    var conrol_data = BasicSlider.attr("data-controls");

    var autoslide = true;
    var navShow = true;
    var dot_nav_show = true;
    var ts_slider_speed = 5000;

    if (conrol_data) {
      var controls = JSON.parse(BasicSlider.attr("data-controls"));
      navShow = Boolean(controls.show_nav ? true : false);
      autoslide = Boolean(controls.auto_nav_slide ? true : false);
      dot_nav_show = Boolean(controls.dot_nav_show ? true : false);
      ts_slider_speed = parseInt(controls.ts_slider_speed);
    }

    $("[data-background]").each(function () {
      $(this).css("background-image", "url( " + $(this).attr("data-background") + "  )");
    });

    BasicSlider.on("init", function (e, slick) {
      var $firstAnimatingElements = $(".single-slider:first-child").find("[data-animation]");
      doAnimations($firstAnimatingElements);
    });
    BasicSlider.on("beforeChange", function (e, slick, currentSlide, nextSlide) {
      var $animatingElements = $('.single-slider[data-slick-index="' + nextSlide + '"]').find("[data-animation]");
      doAnimations($animatingElements);
    });
    BasicSlider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      autoplay: autoslide,
      autoplaySpeed: ts_slider_speed,
      rtl: rtl_setting,
      infinite: false,
      dots: dot_nav_show,
      fade: true,
      arrows: navShow,
      prevArrow: '<button type="button" class="slick-prev"><i class="fal fa-angle-left"></i></button>',
      nextArrow: '<button type="button" class="slick-next"><i class="fal fa-angle-right"></i></button>',
      responsive: [
        {
          breakpoint: 767,
          settings: {
            dots: true,
            arrows: true,
          },
        },
      ],
    });

    function doAnimations(elements) {
      var animationEndEvents = "webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend";
      elements.each(function () {
        var $this = $(this);
        var $animationDelay = $this.data("delay");
        var $animationType = "animated " + $this.data("animation");
        $this.css({
          "animation-delay": $animationDelay,
          "-webkit-animation-delay": $animationDelay,
        });
        $this.addClass($animationType).one(animationEndEvents, function () {
          $this.removeClass($animationType);
        });
      });
    }
  }

  function brandSlider() {
    var BSlider = $(".brand__slider");

    var conrol_data = BSlider.attr("data-controls");

    var autoslide = true;
    var navShow = true;
    var dot_nav_show = true;
    var ts_slider_speed = 5000;

    if (conrol_data) {
      var controls = JSON.parse(BSlider.attr("data-controls"));
      navShow = Boolean(controls.show_nav ? true : false);
      autoslide = Boolean(controls.auto_nav_slide ? true : false);
      dot_nav_show = Boolean(controls.dot_nav_show ? true : false);
      ts_slider_speed = parseInt(controls.ts_slider_speed);
    }

    BSlider.owlCarousel({
      loop: false,
      margin: 30,
      autoplay: autoslide,
      autoplayTimeout: ts_slider_speed,
      smartSpeed: 500,
      rtl: rtl_setting,
      items: 6,
      navText: ['<i class="fal fa-angle-left"></i>', '<i class="fal fa-angle-right"></i>'],
      nav: navShow,
      dots: dot_nav_show,
      responsive: {
        0: {
          items: 1,
        },
        576: {
          items: 2,
        },
        767: {
          items: 2,
        },
        992: {
          items: 3,
        },
        1200: {
          items: 4,
        },
        1600: {
          items: 5,
        },
      },
    });
  }

  function testimonialSlider() {
    var BSlider = $(".testimonial__slider");

    var conrol_data = BSlider.attr("data-controls");

    var autoslide = true;
    var navShow = true;
    var dot_nav_show = true;
    var ts_slider_speed = 5000;

    if (conrol_data) {
      var controls = JSON.parse(BSlider.attr("data-controls"));
      navShow = Boolean(controls.show_nav ? true : false);
      autoslide = Boolean(controls.auto_nav_slide ? true : false);
      dot_nav_show = Boolean(controls.dot_nav_show ? true : false);
      ts_slider_speed = parseInt(controls.ts_slider_speed);
    }

    BSlider.owlCarousel({
      loop: true,
      margin: 30,
      autoplay: autoslide,
      autoplayTimeout: ts_slider_speed,
      smartSpeed: 500,
      items: 6,
      navText: ['<i class="fal fa-angle-left"></i>', '<i class="fal fa-angle-right"></i>'],
      nav: navShow,
      rtl: rtl_setting,
      dots: dot_nav_show,
      responsive: {
        0: {
          items: 1,
        },
        576: {
          items: 1,
        },
        767: {
          items: 1,
        },
        992: {
          items: 1,
        },
        1200: {
          items: 1,
        },
        1600: {
          items: 1,
        },
      },
    });
  }

  function projectSlider() {
    $(".project__slider").owlCarousel({
      loop: true,
      margin: 30,
      autoplay: false,
      rtl: rtl_setting,
      autoplayTimeout: 3000,
      smartSpeed: 500,
      items: 6,
      navText: ['<button><i class="fa fa-angle-left"></i>PREV</button>', '<button>NEXT<i class="fa fa-angle-right"></i></button>'],
      nav: false,
      dots: true,
      responsive: {
        0: {
          items: 1,
        },
        576: {
          items: 1,
        },
        767: {
          items: 2,
        },
        992: {
          items: 2,
        },
        1200: {
          items: 2,
        },
        1600: {
          items: 2,
        },
      },
    });
  }

  $(window).on("elementor/frontend/init", function () {
    elementorFrontend.hooks.addAction("frontend/element_ready/slider.default", mainSlider);
    elementorFrontend.hooks.addAction("frontend/element_ready/brand.default", brandSlider);
    elementorFrontend.hooks.addAction("frontend/element_ready/testimonial_slider.default", testimonialSlider);
    elementorFrontend.hooks.addAction("frontend/element_ready/project_slider.default", projectSlider);
  });

  ////////////////////////////////////////////////////
  // 09. Testimonial Js
  $(".testimonial__wrapper").slick({
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: rtl_setting,
    arrows: false,
    fade: true,
    dots: true,
    asNavFor: ".testimonial__nav",
  });
  $(".testimonial__nav").slick({
    slidesToShow: 3,
    slidesToScroll: 1,
    rtl: rtl_setting,
    asNavFor: ".testimonial__wrapper",
    dots: false,
    centerMode: true,
    centerPadding: 0,
    focusOnSelect: true,
    arrows: false,
    prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-angle-left"></i></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fas fa-angle-right"></i></button>',
    responsive: [
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  });

  ////////////////////////////////////////////////////
  // blog__slider
  $(".post_gallery").owlCarousel({
    loop: true,
    margin: 30,
    autoplay: false,
    autoplayTimeout: 3000,
    rtl: rtl_setting,
    smartSpeed: 500,
    items: 1,
    navText: ['<button><i class="fa fa-angle-left"></i></button>', '<button><i class="fa fa-angle-right"></i></button>'],
    nav: true,
    dots: false,
    responsive: {
      0: {
        items: 1,
      },
      576: {
        items: 1,
      },
      767: {
        items: 1,
      },
      992: {
        items: 1,
      },
      1200: {
        items: 1,
      },
      1600: {
        items: 1,
      },
    },
  });

  $(".product-active").slick({
    dots: false,
    arrows: true,
    infinite: false,
    rtl: rtl_setting,
    speed: 300,
    prevArrow: '<button type="button" class="slick-prev"><i class="fas fa-long-arrow-alt-left"></i><span>next</span></button>',
    nextArrow: '<button type="button" class="slick-next"><i class="fas fa-long-arrow-alt-right"></i><span>prev</span></button>',
    slidesToShow: 4,
    slidesToScroll: 1,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 4,
        },
      },
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 767,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  });

  ////////////////////////////////////////////////////
  // 19. Masonry Js
  $(".grid").imagesLoaded(function () {
    // init Isotope
    var $grid = $(".grid").isotope({
      itemSelector: ".grid-item",
      percentPosition: true,
      masonry: {
        // use outer width of grid-sizer for columnWidth
        columnWidth: 1,
      },
    });

    // filter items on button click
    $(".masonary-menu").on("click", "button", function () {
      var filterValue = $(this).attr("data-filter");
      $grid.isotope({ filter: filterValue });
    });

    //for menu active class
    $(".masonary-menu button").on("click", function (event) {
      $(this).siblings(".active").removeClass("active");
      $(this).addClass("active");
      event.preventDefault();
    });
  });



  ////////////////////////////////////////////////////
  // 20. WoW Js
  new WOW().init();

  ////////////////////////////////////////////////////
  // 23. Show Login Toggle Js
  $("#showlogin").on("click", function () {
    $("#checkout-login").slideToggle(900);
  });

  ////////////////////////////////////////////////////
  // 24. Show Coupon Toggle Js
  $("#showcoupon").on("click", function () {
    $("#checkout_coupon").slideToggle(900);
  });

  ////////////////////////////////////////////////////
  // 25. Create An Account Toggle Js
  $("#cbox").on("click", function () {
    $("#cbox_info").slideToggle(900);
  });

  ////////////////////////////////////////////////////
  // 26. Shipping Box Toggle Js
  $("#ship-box").on("click", function () {
    $("#ship-box-info").slideToggle(1000);
  });

  ////////////////////////////////////////////////////
  // 20. Counter Js
  $(".counter").counterUp({
    delay: 100,
    time: 1000,
  });

  // InHover Active
  // $('.price__item').on('mouseenter', function () {
  //     $(this).addClass('active').parent().parent().parent().parent().parent().siblings().find('.price__item').removeClass('active');
  // });

  if ($(".scene").length > 0) {
    $(".scene").parallax({
      scalarX: 10.0,
      scalarY: 15.0,
    });
  }

  if ($(".single-bdevs-services").length > 0) {
    $(".trail-items li.trail-item:nth-child(2) a").attr("href", "javascript:history.back()");
  }

  // cart-plus-minus
  $(".cart-plus-minus").append('<div class="qtybutton minus">-</div><div class="qtybutton plus">+</div>');

  $(".cart-plus-minus").on("click", ".qtybutton.plus, .qtybutton.minus", function () {
    // Get current quantity values
    var qty = $(this).closest(".cart-plus-minus").find(".qty");
    var val = parseFloat(qty.val());
    var max = parseFloat(qty.attr("max"));
    var min = parseFloat(qty.attr("min"));
    var step = parseFloat(qty.attr("step"));

    // Change the value if plus or minus
    if ($(this).is(".plus")) {
      if (max && max <= val) {
        qty.val(max);
      } else {
        qty.val(val + step).trigger("change");
      }
    } else {
      if (min && min >= val) {
        qty.val(min);
      } else if (val > 1) {
        qty.val(val - step).trigger("change");
      }
    }
  });
})(jQuery);
