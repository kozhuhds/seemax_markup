/**
 * Глобальный файл для включение всех фишек используемых в проектах
 * Файл обязательно нужно подключать через gz-плагин
 *
 * @author Александр Хрищанович
 */

var _root = "{root}";

(function ($) {
	
	$(function () {

		var cw = $('.content').width();
		$('.content table.tbl').each(function(){
			if ($(this).width() > cw ){
				$(this).wrap('<div style="overflow-x: auto;"></div>');
			}
		});

		{ 
		// HTML Boilerplate 4.0 
		// Avoid `console` errors in browsers that lack a console.
			if (!(window.console && console.log)) {
			    (function() {
			        var noop = function() {};
			        var methods = ['assert', 'clear', 'count', 'debug', 'dir', 'dirxml', 'error', 'exception', 'group', 'groupCollapsed', 'groupEnd', 'info', 'log', 'markTimeline', 'profile', 'profileEnd', 'markTimeline', 'table', 'time', 'timeEnd', 'timeStamp', 'trace', 'warn'];
			        var length = methods.length;
			        var console = window.console = {};
			        while (length--) {
			            console[methods[length]] = noop;
			        }
			    }());
			}
		}

		
		{
			/**
			 * Релизация функционала ката
			 * Отключить инициализацию можно глобальной переменной _disableCat
			 * Структура кода для ката
			 * <span class="cat_block"><a href="#" class="cat_href">Что под катом</a><div class="cat_text">Текст под катом</div></span>
			 *
			 * @author Александр Хрищанович
			 */
			if (typeof(_disableCat) == 'undefined') {
				$('.cat_href').click(function () {
					var catText = $('.cat_text:first', $(this).parents('.cat_block:first'));
					if (catText.is(':visible')) {
						catText.slideUp();
					}
					else {
						catText.slideDown();
					}
					return false;
				});
			}
		}
		
		{
			/**
			 * Инициализация lightBox галереи
			 * http://leandrovieira.com/projects/jquery/lightbox/
			 * Отключить инициализацию можно глобальной переменной _disableLightbox
			 *
			 * @author Александр Хрищанович
			 */
			if (typeof($.fn.lightBox) == 'function' && typeof(_disableLightbox) == 'undefined') {
				$('a[rel=lightbox]').lightBox({
					imageLoading:			_root + 'public/i/lightbox/lightbox-ico-loading.gif',
					imageBtnPrev:			_root + 'public/i/lightbox/lightbox-btn-prev.gif',
					imageBtnNext:			_root + 'public/i/lightbox/lightbox-btn-next.gif',
					imageBtnClose:			_root + 'public/i/lightbox/lightbox-btn-close.gif',
					imageBlank:				_root + 'public/i/lightbox/lightbox-blank.gif'
				});
			}
		}

		{
			/**
			 * Раскрашиваем таблицу
			 */
			 
			 $("table.tbl").each( function(){ 
				tbl = $(this);

				numTd = $("tr:first", tbl).children().length;
				$("tr", tbl).filter(function() { 
				  return $(this).children().length == numTd;
				}).filter(':odd').addClass('even');

				$("tr.even td[rowspan]", tbl).each(function() {
				  $(this).parent().nextAll().slice(0, this.rowSpan - 1).addClass('even');
				});
			});


			//$("tr:nth-child(even)").addClass("even");
			$("tr > td:nth-child(1)").addClass("first");
		}

		{
			/**
			 * Лечим IE6 - прозрачные png
			 * Все элементы с классом .png будут залеченыё
			 * Отключить инициализацию можно глобальной переменной _disablePngFix
			 *
			 * @author Александр Хрищанович
			 * @require DD_belatedPNG.min.js
			 */
			if (typeof(DD_belatedPNG) == 'function' && $.browser.msie && $.browser.version < 7 && typeof(_disablePngFix) == undefined) {
				DD_belatedPNG.fix('.png');
			}
		}
		
		
		/**
		 * При клике на элемент формы показываем к нему подсказку
		 *
		 * @author Александр Хрищанович
		 */
		$('form input, form select, form textarea')
			.focus(function () {
				$('.comment', $(this).parents('tr:first')).fadeIn();
			})
			.blur(function () {
				$('.comment', $(this).parents('tr:first')).fadeOut();
			});
	
		
	});

})(jQuery);	// совместимость с другими библиотеками

