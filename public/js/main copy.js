$(document).ready(function(){

    /* Показать/Спрятать поиск */
    $(".search i").click(function(){
         $(".header__search").show();
        setTimeout(function(){
            $(".close_ar").addClass("show");
        },400);
         $(".header__i").hide();
     });
     $(".close_ar").click(function(){
         $(this).removeClass("show");
         $(".header__search").hide();
         $(".header__i").show();
     });

    /* Свестопердящий слайдер */
    var chSpeed = 5000; //скорость смены картинок
    var nav_i = $(".nav__i");
    var slider_title = $(".slider__title");
    var noSlide = true;
    var curtainSpeed = 2000;
    var startSlide = 0;
    var lastClick = 0;
    var menuItemCntr = nav_i.length;
    var change = true;

    nav_i.each(function(i){
        $(this).on("mouseover",function(){
            if(startSlide != i){
                var thisLi = $(this);
                $(this).find(".boxImg").stop(true, false).animate({
                    top: -96,
                    left: -30,
                    width:124,
                    height:124
                }, 400, function(){
                    thisLi.addClass("cur");
                });
            }
        });
        $(this).on("mouseout", function(){
            if(startSlide != i){
                $(this).removeClass("cur");
                $(this).find(".boxImg").stop(true, false).animate({
                    top: -2,
                    left: 0,
                    width: 82,
                    height: 82
                }, 400);
            }
        });
        $(this).on("click", function(){
            if(noSlide && startSlide != i){
                change = false;
                setTimeout(function(){
                    change = true;
                }, chSpeed);
                lastClick = i;
                nav_i.each(function(){
                    if($(this).index() != i){
                         $(this).find(".boxImg").stop(true, false).animate({
                             top: -2,
                             left: -0,
                             width: 82,
                             height: 82
                         }, 400);
                    }
                });
//                noSlide = false;
                startSlide = i;
//                setTimeout(function(){

                    /* здесь конечно надо иметь в виду,
                     что браузер будет их грузить какое то количество времени в первый раз,
                     поэтому логично было бы сразу все картинки загрузить в память браузера при загрузке страницы
                     в каком нибудть инвизибл блоке  */
                    $(".slider__i").css({'background-image':'url(public/i/img/pic'+ (i+1) +'.jpg)'});

                    slider_title.removeClass("cur");
                    slider_title.eq(i).addClass("cur");
//                }, curtainSpeed/2);

//                $(".curtain").animate({left: -1480}, curtainSpeed, function(){
//                       $(this).css({
//                           'left': '1480px'
//                       });
//                });
//                $(".curtainTextWrap").animate({left: 1480}, curtainSpeed, function(){
//                    $(this).css({
//                        'left': '-1480px'
//                    });
//                    noSlide = true;
//                });
            }
        });
    });

    /* смена картинок по интервалу, по сути просто вызов триггеров на меню */
    setInterval(function(){
        if(change){
            lastClick++;
            var index = lastClick%menuItemCntr;
            nav_i.eq(index).trigger("mouseover");
            nav_i.eq(index).trigger("click");
        }
    }, chSpeed);

    /* закрытие поиска по клику вне блока поиска, хер пойми, но получился говнокод на скорую руку */
    $(document).on("mousedown", function(e){
        if($(e.target).closest(".header__search").length != 1){
            if($(".close_ar").hasClass("show")){
                $(".close_ar").trigger("click");
            }
        }
    });

}); /* END $(document).ready() */