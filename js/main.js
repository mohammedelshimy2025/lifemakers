
var
    //selector vars
    main_window = $(window),
    root = $('html, body'),
    bdyOnePage = $('body.landing-page-demo '),
    pageHeader = $('#page-header'),
    navMain = $('nav.menu-navbar'),
    navMenuwrapper = $('.navbar-menu-wrapper'),
    hasSubMenu = $(".has-sub-menu"),
    onePage_menuLink = $('.landing-page-demo .menu-navbar .menu-link'),
    pageHero = $('#page-hero'),
    toTopBtn = $('.back-to-top'),
    heroVegasSlider = $(".page-hero.hero-vegas-slider"),
    heroSwiperSlider = ".hero-swiper-slider .swiper-container",
    textInput = $("form.main-form .text-input"),
    tabLink = $(".ma-tabs .tabs-links .tab-link"),
    togglerLink = $(".ma-tabs .toggler-links .toggler"),
    portfolioGroup = $('.portfolio .portfolio-group'),

    // Measurements vars
    navMainHeight = navMain.innerHeight(),
    pageHeroHeight = pageHero.innerHeight(),

    //class Names Strings vars

    inputHasText = "has-text",

    // condetionals vars
    counterShowsUp = false;




$(function () {
    "use strict"

    // function to fire the conter plugin 
    function fireCounter() {
        if ($('.stats-counter').length) {
            if (jQuery().countTo && counterShowsUp === false) {
                var pos = $('.stats-counter').offset().top;
                if (((main_window.scrollTop() + main_window.innerHeight() - 50) >= pos)) {
                    $('.counter').countTo();
                    counterShowsUp = true;
                }
            }
        }
    }


    // start custome-cursor 
    // var customCursor = $(".custom-cursor");
    // main_window.on("mousemove", (e) => {
    //     // customCursor.css({
    //     //     left: e.pageX,
    //     //     top: e.pageY
    //     // })
    // })
    // End custome-cursor 

    /*  START #page-header js rules */

    // Start open/close navbar search box
    $(".header-search-box form").on("click", function (e) {
        e.stopPropagation()
    });

    $('.header-search-btn').on("click", function () {
        $(".header-search-box").addClass('show');

        setTimeout(function () {
            $(".search-input").focus()
        }, 1000);
    });

    $('.header-search-box .close-search , .header-search-box').on("click", function () {
        $(".header-search-box").removeClass('show');
    });
    // End open/close navbar search box


    /* Start bootstrap Scrollspy Options  */
    //on one page demos only
    if (navMain) {
        $(bdyOnePage).scrollspy({
            target: navMain,
            offset: navMainHeight + 1
        });
    }


    if ($(this).scrollTop() > 50) {
        if (!$(pageHeader).hasClass("is-sticky")) {
            pageHeader.addClass("is-sticky");
        }
    }

    main_window.on("scroll", function () {
        if ($(this).scrollTop() > 50) {
            if (!$(pageHeader).hasClass("is-sticky")) {
                pageHeader.addClass("is-sticky");
            }
        } else {
            if ($(pageHeader).hasClass("is-sticky")) {
                pageHeader.removeClass("is-sticky");
            }
        }
    });

    // show/hide navbar links menu
    $(".menu-toggler").on("click", function () {
        pageHeader.find(".show:not(.bar-bottom .links) ").removeClass("show");
        pageHeader.find(".bar-bottom .links").toggleClass("show");
        $('.menu-toggler').toggleClass('close-menu')
    });

    // show/hide navbar info menu
    $(".info-toggler, .close-icon").on("click", function () {
        pageHeader.find(".show:not(.bar-top .info-panel)").removeClass("show");
        pageHeader.find(".bar-top .info-panel").toggleClass("show");
        if ($('.menu-toggler').hasClass('close-menu')) {
            $('.menu-toggler').removeClass('close-menu')
        }

    });



    $(".list-js").on("click", function (e) {
        e.stopPropagation()
    });

    // close the currnt opend menu when click on its wrapper
    $(".menu-wrapper").on("click", function () {
        $(this).removeClass("show");
        if ($('.menu-toggler').hasClass('close-menu')) {
            $('.menu-toggler').removeClass('close-menu')
        }
    });

    //showing navbar sub-menus on mobile
    hasSubMenu.on("click", function (e) {
        if (!(main_window.innerWidth() > 991)) {
            $(this).children('.sub-menu').slideToggle();
        }
    });


    //  Start Smooth Scrolling To page Sections
    $(onePage_menuLink).on('click', function (e) {
        var link = $(this).attr('href');
        var currentMainNavHeight = navMain.innerHeight();
        if (link.charAt(0) === '#') {
            e.preventDefault();
            var target = this.hash;
            $(root).animate({
                scrollTop: $(target).offset().top - currentMainNavHeight + 1
            }, 500);
        }

    });

    // Smooth Scrolling To Demos section on index page
    $('.goto-demos-link').on('click', function (e) {
        var link = $(this).attr('href');
        if (link.charAt(0) === '#') {
            e.preventDefault();
            var target = this.hash;
            $(root).animate({
                scrollTop: $(target).offset().top + 1
            }, 500);
        }
    });

    // =========== END #page-header js rules

	//Jquery Spinner / Quantity Spinner
	if($('.quantity-spinner').length){
		$("input.quantity-spinner").TouchSpin({
		  verticalbuttons: true
		});
	}


    if ($(textInput).length) {

        if ($(textInput).val().trim() !== '')
            $(textInput).parent().addClass(inputHasText);
        else
            $(textInput).parent().removeClass(inputHasText);


        /*
        check if the form input has data or not while focusing out
        from the input to set the label
        in the right place by the css rules.
        */
        $(textInput).on('focusout', function () {

            if ($(this).val().trim() !== '') {
                $(this).parent().addClass(inputHasText);
            } else {
                $(this).parent().removeClass(inputHasText);
            }
        });
    }


    // Start Smooth Scrolling To Window Top When Clicking on Back To Top Button
    $(toTopBtn).on('click', function () {
        root.animate({
            scrollTop: 0
        }, 1000);
    });
    // End Smooth Scrolling To Window Top When Clicking on Back To Top Button


    // Start tabs navigation 


    // Start Regular Tabs
    $(tabLink).on('click', function () {
        var target = $(this).attr('data-target');
        $(this).addClass('active').siblings().removeClass('active');
        $(target).addClass('visibale-tab').siblings('.tab-content').removeClass("visibale-tab");
        adjust_tabLink_B_line();
    });


    /* ----------------- Start onScroll Actions ----------------- */

    main_window.on('scroll', function () {

        if ($(this).scrollTop() > 50) {
            //show back to top btn
            toTopBtn.addClass("show");
        } else {
            //hide back to top btn
            toTopBtn.removeClass("show");
        }


        // to make sure the counter will start counting while its section apear on the screen  
        fireCounter();
    });
    /* ----------------- End onScroll Actions ----------------- */



    /*************Start Contact Form Functionality************/
    var
        contactForm = $("#contact-us-form"),
        userName = $("#user-name"),
        userEmail = $("#user-email"),
        msgSubject = $("#msg-subject"),
        msgText = $("#msg-text"),
        submitBtn = $("#submit-btn"),
        isValidInput = false,
        isValidEmail = false;

    function ValidateNotEmptyInput(input, errMsg) {
        if (input.length) {
            if (input.val().trim() === "") {
                $(input).siblings(".error-msg").text(errMsg).css("display", "block");
                isValidInput = false;
            } else {
                $(input).siblings(".error-msg").text("").css("display", "none");
                isValidInput = true;
            }
        }

    }


    function validateEmailInput(emailInput) {
        var pattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

        if (pattern.test(emailInput.val()) === false) {
            $(emailInput).siblings(".error-msg").text("Please Enter a valid Email").css("display", "block");
            isValidEmail = false;
        } else {
            $(emailInput).siblings(".error-msg").text("").css("display", "none");
            isValidEmail = true;
        }
    }



    submitBtn.on("click", function (e) {
        e.preventDefault();

        ValidateNotEmptyInput(userName, "Please Enter Your Name");
        ValidateNotEmptyInput(userEmail, "Please Enter Your Email");
        ValidateNotEmptyInput(msgSubject, "Please Enter Your subject");
        ValidateNotEmptyInput(msgText, "Please Enter Your Message");
        validateEmailInput(userEmail);


        if (isValidInput && isValidEmail) {
            // Please unComment the next block of code when uploading your theme to your host

            ///////////////////////////////////////////////////////////////////////////////////////////////

            // $.ajax({
            //     type: "POST",
            //     url: contactForm.attr('action'),
            //     data: contactForm.serialize(),

            //     success: function (data) {


            //         // $(".done-msg").text("We Recevied you message!").toggleClass("show");
            //         // setTimeout(function () {
            //         //     $(".done-msg").text("").toggleClass("show");
            //         // }, 7500)
            //         // contactForm[0].reset();
            //         
            //     }

            // });
            // ///////////////////////////////////////////////////////////////////////////////////////////


            // Please delete this block of code when you upload your template to your host
            // /////////////////////////////////
            $(".done-msg").text("We Recevied you message!").toggleClass("show");
            setTimeout(function () {
                $(".done-msg").text("").toggleClass("show");
            }, 7500)
            contactForm[0].reset();
            // //////////////////////////////////

            return false;
        }
    })

    /*************End Contact Form Functionality************/



    /* --------------------------
    Start Vendors plugins options  
    ----------------------------*/




    /* Start Swiper Options */
    // set the swiper slides & hero sections bg image
    var slideBg = $(".hero-swiper-slider .swiper-container .swiper-slide .slide-bg-img, .page-hero .overlay-photo-image-bg");
    slideBg.each(function () {
        if ($(this).attr("data-background")) {
            $(this).css("background-image", "url(" + $(this).data("background") + ")");
        }
    });



    //initialize swiper [Hero Section]  //parallax slider
    if ($('.hero-swiper-slider.slider-parallax .swiper-container').length) {
        var heroSlider = new Swiper('.hero-swiper-slider.slider-parallax .swiper-container', {
            speed: 1000,
            parallax: true,
            loop: true,
            reverseDirection: true,
            autoplay: {
                delay: 5000,
                disableOnInteraction: true,
            },
            pagination: {
                el: '.hero-swiper-slider.slider-parallax .swiper-pagination',
                type: 'bullets',
                clickable: true,
            },

            navigation: {
                nextEl: '.hero-swiper-slider.slider-parallax .swiper-button-next',
                prevEl: '.hero-swiper-slider.slider-parallax .swiper-button-prev',
            },
            on: {
                init: function () {
                    var thisSlider = this;
                    for (var i = 0; i < thisSlider.slides.length; i++) {
                        $(thisSlider.slides[i])
                            .find('.slide-bg-img')
                            .attr({
                                'data-swiper-parallax': .7 * thisSlider.width,
                            });
                    }
                    $(".slides-count").html("0" + (this.slides.length - 2));
                    $(".curent-slide").html("0" + (this.realIndex + 1));
                },
                slideChange: function () {
                    $(".curent-slide").html("0" + (this.realIndex + 1));
                },
                resize: function () {
                    this.update();
                },

            },

        });

    };

    //initialize swiper [Hero Section] //fade slider
    if ($('.hero-swiper-slider.slider-fade .swiper-container').length) {
        var heroSlider = new Swiper('.hero-swiper-slider.slider-fade .swiper-container', {
            speed: 1000,
            loop: true,
            reverseDirection: true,
            effect: 'fade',
            fadeEffect: {
                crossFade: true
            },
            on: {
                init: function () {
                    var thisSlider = this;
                    $(".slides-count").html("0" + (this.slides.length - 2));
                    $(".curent-slide").html("0" + (this.realIndex + 1));
                },
                slideChange: function () {
                    $(".curent-slide").html("0" + (this.realIndex + 1));
                },
            },
            autoplay: {
                delay: 5000,
                disableOnInteraction: true,
            },
            pagination: {
                el: '.hero-swiper-slider.slider-fade .swiper-pagination',
                type: 'bullets',
                clickable: true,
            },
            navigation: {
                nextEl: '.hero-swiper-slider.slider-fade .swiper-button-next',
                prevEl: '.hero-swiper-slider.slider-fade .swiper-button-prev',
            },
        });
    };


    // initialize swiper [Testimonials with ONE Column]
    if ($('.testimonials-3d  .swiper-container').length) {
        var testimonialsSlider_1 = new Swiper('.testimonials-3d  .swiper-container', {
            // Optional parameters
            effect: 'coverflow',
            grabCursor: true,
            centeredSlides: true,
            slidesPerView: 'auto',
            loop: true,
            rtl: true,
            slideShadows: false,
            coverflowEffect: {
                rotate: 5,
                stretch: 0,
                depth: 100,
                modifier: 2,
            },
            on: {
                resize: function () {
                    this.update();
                }
            },
        });
    }

    // initialize swiper [Testimonials with 1 Column]
    if ($('.testimonials-1-col  .swiper-container').length) {
        var testimonialsSlider_1 = new Swiper('.testimonials-1-col  .swiper-container', {
            // Optional parameters
            speed: 500,
            loop: true,
            grabCursor: true,
            slidesPerView: 1,
            spaceBetween: 50,
            delay: 5000,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                991: {
                    slidesPerView: 1
                }
            },
            navigation: {
                nextEl: '.testimonials-1-col .swiper-button-next',
                prevEl: '.testimonials-1-col .swiper-button-prev',
            },
            on: {
                resize: function () {
                    this.update();
                }
            },
        });
    }

    // initialize swiper [Testimonials with 2 Columns]
    if ($('.testimonials-2-col .swiper-container').length) {
        var testimonialsSlider_2 = new Swiper('.testimonials-2-col .swiper-container', {
            // Optional parameters
            speed: 500,
            loop: true,
            grabCursor: true,
            slidesPerView: 2,
            spaceBetween: 20,
            delay: 5000,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                767: {
                    slidesPerView: 1
                }
            },
            navigation: {
                nextEl: '.testimonials-2-col .swiper-button-next',
                prevEl: '.testimonials-2-col .swiper-button-prev',
            }
        });
    }

    // initialize swiper [Testimonials with 3 Column]
    if ($('.testimonials-3-col .swiper-container').length) {
        var testimonialsSlider_3 = new Swiper('.testimonials-3-col .swiper-container', {
            // Optional parameters
            speed: 600,
            loop: true,
            grabCursor: true,
            slidesPerView: 3,
            spaceBetween: 15,
            delay: 5000,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {
                1199: {
                    slidesPerView: 2
                },
                767: {
                    slidesPerView: 1
                }
            },
            navigation: {
                nextEl: '.testimonials-3-col .swiper-button-next',
                prevEl: '.testimonials-3-col .swiper-button-prev',
            },
        });
    }

    //initialize swiper [clients Section]
    if ($('.our-clients .swiper-container').length) {
        var partenersSlider = new Swiper('.our-clients .swiper-container', {
            // Optional parameters
            speed: 600,
            loop: true,
            spaceBetween: 30,
            nav: true,
            grabCursor: true,
            delay: 5000,
            autoplay: {
                delay: 3000,
            },
            slidesPerView: 6,
            breakpoints: {
                991: {
                    slidesPerView: 3,
                    spaceBetween: 20
                }
            },
            navigation: {
                nextEl: '.our-clients .swiper-button-next',
                prevEl: '.our-clients .swiper-button-prev',
            },
        });
    }
    $(".team_slider").owlCarousel({
        loop: !0,
        margin: 30,
        dots: !1,
        nav: !0,
        rtl: !0,
        autoplayHoverPause: !1,
        autoplay: {
            delay: 5000,
          },
        singleItem: !0,
        smartSpeed: 1200,
        navText: ['<i class="fa fa-arrow-left" aria-hidden="true"></i>', '<i class="fa fa-arrow-right" aria-hidden="true"></i>'],
        responsive: {
            0: {
                items: 1,
                center: !1
            },
            480: {
                items: 2,
            },
            520: {
                items: 2,
            },
            600: {
                items: 2,
            },
            768: {
                items: 3
            },
            992: {
                items: 4
            },
            1200: {
                items: 6
            },
            1366: {
                items: 6
            },
            1400: {
                items: 6
            }
        }
    })
    //initialize swiper [single-post page]
    if ($('.post-main-area .post-featured-area .swiper-container').length) {
        var partenersSlider = new Swiper('.post-main-area .post-featured-area .swiper-container', {
            // Optional parameters
            slidesPerView: 1,
            grabCursor: true,
            spaceBetween: 0,
            loop: true,
            pagination: {
                el: '.swiper-pagination',
                clickable: true,
            },
            navigation: {
                nextEl: '.post-main-area .post-featured-area .swiper-button-next',
                prevEl: '.post-main-area .post-featured-area .swiper-button-prev',
            }
        });
    }

    //initialize swiper [portfolio-slider]
    if ($('.portfolio-slider .swiper-container').length) {
        var swiperPortfolioSlider = new Swiper('.portfolio-slider .swiper-container', {
            spaceBetween: 50,
            speed: 600,
            loop: true,
            centeredSlides: true,
            slidesPerView: 2,
            autoplay: {
                delay: 5000,
            },
            breakpoints: {

                991: {
                    slidesPerView: 2,
                    spaceBetween: 10,
                },
                768: {
                    slidesPerView: 1,
                    spaceBetween: 10,
                },
            },
            navigation: {
                nextEl: '.portfolio-slider .swiper-button-next',
                prevEl: '.portfolio-slider .swiper-button-prev'
            },
        });
    }

    //initialize swiper [portfolio-single]
    if ($('.portfolio-single .portfolio-single-slider .swiper-container').length) {
        var swiperPortfolioSingleSlider = new Swiper('.portfolio-single .portfolio-single-slider .swiper-container', {
            spaceBetween: 10,
            grabCursor: true,
            reverseDirection: true,
            loop: true,
            slidesPerView: 1,
            autoplay: {
                delay: 5000,
                disableOnInteraction: true,
            },

            navigation: {
                nextEl: '.portfolio-single-slider .swiper-button-next',
                prevEl: '.portfolio-single-slider .swiper-button-prev'
            },
        });
    }

    /* initialize  wow.js  Options */
    var wow = new WOW({
        animateClass: 'animated',
        offset: 100
    });
    wow.init();

    /** initialize Counter plugin */
    fireCounter();

    /* initialize fancybox  */
    if ($('*').fancybox) {
        $().fancybox({
            selector: '[data-fancybox=".filter"]:visible',
            loop: true,
            buttons: ['zoom', 'close'],
        });

    }

    // tilt plugin Options
    if (jQuery().tilt) {
        $("[data-tilt]").tilt({
            perspective: 1000,
        })
    }


   /* Start Vegas Slider Options */
   if (jQuery().vegas) {

    // grab the slides imgs from [data attr in html file]
    var
        slides = $('.hero-vegas-slider .vegas-slider-content'),

        img_1 = slides.attr('data-vegas-slide-1'),
        img_2 = slides.attr('data-vegas-slide-2'),
        img_3 = slides.attr('data-vegas-slide-3');

    // init vegas slider
    heroVegasSlider.vegas({
        delay: 8000,
        shuffle: false,
        timer: false,
        rtl: true,
        // overlay: '../assets/Images/hero/slider/overlays/04.png',
        animation: 'random',
        slides: [{
            src: img_1
        }, {
            src: img_2
        }, {
            src: img_3
        }]
    })

}
/* End Vegas counter Options */



    /* Start Portfolio btns  */
    if ($('.portfolio .portfolio-btn').length) {
        $('.portfolio .portfolio-btn').on('click', function () {

            $(this).addClass('active').siblings().removeClass('active');

            var $filterValue = $(this).attr('data-filter');
            portfolioGroup.isotope({
                filter: $filterValue
            });
        });
    }

    /* start mail chimp  */
    if (jQuery().ajaxChimp) {

        var subscribeUrl = $(".mc-form").attr('action');

        // alert vars
        var alerts = $('.mailchimp-alerts'),
            msgAll = $('.mc-msg'),
            msgSubmitting = $('.mc-submitting'),
            msgSuccess = $('.mc-success'),
            msgError = $('.mc-error');

        $('.mc-form').ajaxChimp({
            language: 'en',
            url: subscribeUrl,
            callback: mailChimpResponse
        });

        function mailChimpResponse(resp) {
            if (resp.result === 'success') {
                alerts.addClass("show-message")
                msgSuccess.html('' + resp.msg).fadeIn().addClass('active');
                msgError.hide();
                $(".mc-form").trigger('reset');

                // to remove the all messages text after 5 seconds from response is success
                setTimeout(function () {
                    alerts.removeClass("show-message");
                    msgAll.html('').removeClass('active');
                }, 5000);
            } else if (resp.msg.indexOf('is already subscribed') >= 0) {
                //if the e-mail already subscribed
                alerts.addClass("show-message")
                msgError.html('This E-mail is already subscribed, Please try another one').fadeIn(0).addClass('active');
                // remove the all messages but the error message so the user can notice the error
                msgSuccess.html('').removeClass('active');
                msgSubmitting.html('').removeClass('active');

            } else if (resp.result === 'error') {
                // any other errors 
                alerts.addClass("show-message");
                msgError.html('' + resp.msg).fadeIn(0).addClass('active');
                // remove the all messages but the error message so the user can notice the error
                msgSuccess.html('').removeClass('active');
                msgSubmitting.html('').removeClass('active');
            }
        }

    }

    /* End mail chimp  */


    /*-----------------  Start particles.js -----------------  */
    /* particlesJS.load(@dom-id, @path-json, @callback (optional));
     ** NOTE: @path-json path is relative to the html file
     */
    // Particles Polygon shapes
    if ($(".particles-js.polygons").length) {
        particlesJS.load('particles-js', 'js/vendors/particles-json-files/particles-polygons.json')
    }
    // Particles circles shapes
    if ($(".particles-js.circles").length) {
        particlesJS.load('particles-js', 'js/vendors/particles-json-files/particles-circles.json')
    }

    // Particles squares shapes
    if ($(".particles-js.squares").length) {
        particlesJS.load('particles-js', 'js/vendors/particles-json-files/particles-squares.json')
    }
    // Particles Dots shapes
    if ($(".particles-js.dots").length) {
        particlesJS.load('particles-js', 'js/vendors/particles-json-files/particles-dots.json')
    }
    /*-----------------  End particles.js -----------------  */
    /*----------------- 
    End Vendors plugins options
     ----------------- */

    /*-----------------  Start skills Bars-----------------  */

    $(window).on('scroll', function () {
        $('.skills .skill .skill-bar .bar').each(function () {
            var barOriginalPosition = $(this).offset().top + $(this).outerHeight();
            var barCurrPosition = $(window).scrollTop() + $(window).height();
            var widthValue = $(this).attr('data-skill-val');
            if (barCurrPosition > barOriginalPosition) {
                $(this).css({
                    width: widthValue + '%',
                });
            }
        });
    });

    /*-----------------  End skills Bars -----------------  */

    /*----------------- Start Percentage loading screen interactions -----------------  */
    var percentage = 0;
    var LoadingCounter = setInterval(function () {
        if (percentage <= 100) {
            // $('#loading-screen ').css('opacity', (100 - percentage));
            $('#loading-screen .loading-counter').text(percentage + '%');
            $('#loading-screen .bar').css('width', (100 - percentage) / 2 + '%');
            $('#loading-screen .progress-line').css('transform', 'scale(' + percentage / 100 + ')');
            percentage++;
        } else {
            $("#loading-screen").fadeOut(500);
            setTimeout(() => {
                $("#loading-screen").remove();
            }, 1500);
            clearInterval(LoadingCounter);
        }
    }, 10)
});
// home main slider

var mainHomeSLider = new Swiper('.home-main-slider', {
    spaceBetween: 0,
    centeredSlides: false,
    speed: 1600,
    effect: 'coverflow',
    // fadeEffect: {
    //   crossFade: true
    // },
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    navigation: {
      nextEl: '.home-main-slider-next',
      prevEl: '.home-main-slider-prev',
    },
    pagination: {
      el: '.home-main-slider-pagination',
      clickable: true
    },
  });
  
/*-----------------  End Percentage loading screen interactions -----------------  */

// home gallery section

if (document.querySelector('.mfa-gallery')) {
    lightGallery(document.querySelector('.mfa-gallery'), {
      thumbnail: true
    });
  }
/*----------------- Start page loading Actions -----------------  */
main_window.on("load", function () {

    //Fire the isotope plugin
    if (jQuery().isotope) {

        portfolioGroup.isotope({
            // options
            itemSelector: '.portfolio-item',
            layoutMode: 'fitRows',
            percentPosition: true,
            filter: '*',
            stagger: 30,
            containerStyle: null,
        });
    }

});
// lazy loading images
document.addEventListener('DOMContentLoaded', function() {
    let lazyImages = [].slice.call(document.querySelectorAll('img.lazy'));
  
    if ('IntersectionObserver' in window) {
      let lazyImageObserver = new IntersectionObserver(function(
        entries,
        observer
      ) {
        entries.forEach(function(entry) {
          if (entry.isIntersecting) {
            let lazyImage = entry.target;
            lazyImage.src = lazyImage.dataset.src;
            // lazyImage.srcset = lazyImage.dataset.srcset;
  
            setTimeout(() => {
              lazyImage.classList.remove('lazy');
              lazyImageObserver.unobserve(lazyImage);
              lazyImage.nextElementSibling.remove();
            }, 1500);
          }
        });
      });
  
      lazyImages.forEach(function(lazyImage) {
        lazyImageObserver.observe(lazyImage);
      });
    } else {
      for (let lazyImg of document.querySelectorAll('img.lazy')) {
        lazyImg.src = lazyImg.dataset.src;
      }
    }
  });
  ;
/*----------------- End Loading Event functions -----------------*/