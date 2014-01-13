$(document).ready(function(){
    /* Показать/Спрятать поиск */
    $(".search i").click(function(){
         $(".header__search").show();
         $(".search__slog input").focus();
        setTimeout(function(){
            $(".close_cross").addClass("show");
        },400);
         $(".header__i").hide();
     });
     $(".close_cross").click(function(){
         $(this).removeClass("show");
         $(".header__search").hide();
         $(".header__i").show();
     });

    /* закрытие поиска по клику вне блока поиска */
    $(document).on("mousedown", function(e){
        if($(e.target).closest(".header__search").length != 1){
            if($(".close_cross").hasClass("show")){
                $(".close_cross").trigger("click");
            }
        }
    });


    /*** Slider Handler ***/

    var sliderInterval = 5000;
    var sliderElementsNum = $('.slider__i').children().length;
    var sliderActive = 1;
    var animationEnd = true;

    
    // Animate nav images: zoom in/out

    function navZoomOut(navObj) // `nav__i` -> navObj
    {
        navObj.find(".boxImg").stop(true, false).animate({
            top: -2,
            left: -0,
            width: 82,
            height: 82
        }, 400);
    }

    function navZoomIn(navObj) // `nav__i` -> navObj
    {
        navObj.find(".boxImg").stop(true, false).animate({
            top: -96,
            left: -30,
            width:124,
            height:124
        }, 400);
    }


    // Timer
    var sliderMove = function () {
        
        // Hide previous slide
        $('.slider_bg_' + String(sliderActive) ).fadeOut("fast", function(){
            $('.slider_bg_' + String(sliderActive) ).fadeIn("fast");   
        }); 
            // Previous navigation item handling
        var navObj = $('.slider__nav .nav__i:nth-child(' + String(sliderActive) + ')');
        navObj.removeClass('cur');

        if ( !navObj.hasClass('mouse_over') ){
            navZoomOut(navObj);
        }

        // Calculate the next slide id
        sliderActive++;
        if (sliderActive > sliderElementsNum){
            sliderActive = 1;
        }
        
        // The next navigation item handling
        var navObj = $('.slider__nav .nav__i:nth-child(' + String(sliderActive) + ')');
        navObj.addClass('cur');

        if ( !navObj.hasClass('mouse_over') ){
            navZoomIn(navObj);
        }    
    }

    var sliderIntervalID = setInterval(sliderMove, sliderInterval);



    // Mouse interaction with navigation toolbar
    $(".sliderBox").hover(
        function() {clearInterval(sliderIntervalID);},
        function() {sliderIntervalID = setInterval(sliderMove, sliderInterval);}
    );

    $('.nav__i').on('mouseover', function() {
        var toSlideNumber = parseInt($(this).attr("slide"));
        $(this).addClass('mouse_over');
        if ( !$(this).hasClass('cur') )
        {
            navZoomIn( $(this) );
            navZoomOut($('.cur'));
            $('.cur').removeClass('cur');
            $(this).addClass("cur");
        }
        if (sliderActive != toSlideNumber && animationEnd){
            animationEnd = false;
            $('.slider_bg_' + String(sliderActive) ).fadeOut("fast", function(){
                $('.slider_bg_' + String(toSlideNumber)).fadeIn("fast", function(){
                    sliderActive = toSlideNumber;
                    animationEnd = true;
                });
            });
        }
    });

    $('.nav__i').on('mouseout', function() {
        $(this).removeClass('mouse_over');

        if ( !$(this).hasClass('cur') )
        {
            navZoomOut( $(this) );   
        }
    });



    $('.slider_bg_1').click(function () {


    } );

    //GALLERY

    $('.galleryBox').each(function(){
        var _this = $(this);
        $('.gallery__i', _this).carouFredSel({
            width: 1280,
            height: 648,
            prev: $('.gal__a.prev', _this),
            next: $('.gal__a.next', _this),
            items: {
                visible:1,
                height:648
            },
            auto: {
                play: false
            },
            scroll: {
                items:1
            }
        });
    });

    //SUPPORT

     $('.support__i .support__section').each(function(){
        $('.section__title', this).click(function(){

            var _service = $(this).parent();
            if (_service.hasClass('cur')){
                _service.removeClass('cur').find('.section__content').slideUp('slow');
            } else {
                $('.cur .section__content').slideUp('slow');
                $('.cur').removeClass('cur');
                _service.addClass('cur').find('.section__content').slideDown('slow');
            }
            return false;
        })

    });

     //FAQ

     $('.faqBox ul li').each(function(){
        $('.quest', this).click(function(){

            var _service = $(this).parent();
            if (_service.hasClass('cur')){
                _service.removeClass('cur').find('.answer').slideUp('slow');
            } else {
                $('.cur .answer').slideUp('slow');
                $('.cur').removeClass('cur');
                _service.addClass('cur').find('.answer').slideDown('slow');
            }
            return false;
        })

    });

     // speciffication2

     $('.visual_characteristic').each(function(){
        var _this = $(this);
        
        $('.visual__i', _this).carouFredSel({
            responsive: false,
            circular: true,
            infinite: false,
            width: 560,
            height: 170,
            auto: {
                play: true
            },
            scroll: {
                items:1
            }, 
            items: {
                visible: 1
            }, 
            pagination: {
                container: $('.visual__loader', _this)
            }
        })
    });

     //FAQ TAB

     $('.boxFaq__tab').each(function(){
        var _this = $(this);
        $('.nav__faq li', _this).each(function(i){
            $(this).click(function(){
                $('.boxDescrCarousel', _this).trigger('slideTo', i);
                $('.nav__faq li.current', _this).removeClass('current');
                $(this).addClass('current');
                return false;
            });
        });
        
        $('.boxDescrCarousel', _this).carouFredSel({
            responsive: false,
            circular: false,
            infinite: false,
            align: 'left',
            width: '100%',
            auto: {
                play: false
            },
            scroll: {
                items:1
            }, 
            items: {
                visible: 1,
                width: 960
            }
        })
    });



    //Parallax
    $(window).scroll(function() {
        var scrollTop = $(window).scrollTop();
        var offset = (scrollTop-300)/5;
        if (offset < 20 && scrollTop >= 300){
            $('.linkSlide img').css('margin-top', -offset );
            $('.nav__i .boxImg').css('top', -offset);
            $('.nav__i.cur .boxImg').css('top', -offset - 96);

        }
    });

    //Main menu add events
    if ($('.mainMenu__add').css('display') == 'none'){
        $('.with-sub').on('mouseover',function (){
            $('.mainMenu__add').fadeIn("fast");
        });
        $('.mainMenu ul li').on('mouseover', function(){
            if(!this.hasAttribute("class")){
                $('.mainMenu__add').fadeOut("fast");
            }
        });

        $('.mainMenu__add').on('mouseleave',function (){
            $('.mainMenu__add').fadeOut("fast");
        });
    }

    //Choose region
    $('.region span i').on('mouseover', function (){
        $('.region a').show();
    });
    $('.region').on('mouseleave', function (){
        $('.region a').hide();
    });





}); /* END $(document).ready() */