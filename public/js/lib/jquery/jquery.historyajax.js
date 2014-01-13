/**
 * Реализации history ajax loader
 *
 * @author Александр Хрищанович
 * @version 1.0
 * @require jquery, jquery.historypage.js
 * @example
 
	$('#mainMenu a').historyAjax({
		container: '#for_ajax',
		callbackBefore: function () {
			alert('start');
		},
		callbackComplete: function () {
			alert('stop')
		},
	});

 * 
 */

(function ($) {

	$.fn.historyAjax = function (settings) {

		
		var _options    = $.extend({}, $.fn.historyAjax.defaults, settings || {});
		var _elements = this;
		var _nowSection = '';
		
		/**
		 * Проверка на то, что ссылки и формы должны обрабатываться ajax
		 */
		var skipLink = function (object) {
			
			if ($(object).is('.no_ajax')) {
				return true;
			}
			else {
				
				var regExp = {
					doc: new RegExp('.*\.doc', 'i'),
					xls: new RegExp('.*\.xls', 'i'),
					jpg: new RegExp('.*\.jpg', 'i'),
					gif: new RegExp('.*\.gif', 'i'),
					png: new RegExp('.*\.png', 'i')
				};
				
				for (var item in regExp) {
					if(regExp[item].test($(object).attr('href'))) {
						return false;
					}
				}
				
				if ($(object).attr('target') == '_blank') {
					return false;		
				}
				
			}

		}
		
		/**
		 * Обработчик события на элементе
		 */
		var initHandler = function(object) {

			if (!skipLink(object)) {

				if ($(object).is('form')) {
				
					if (!$(object).attr('onsubmit')) {
						$(object).submit(function () {
							_postForm(this);
							return fasle;
						});
					}

				}
				else {

					$(object).click(function() {
						hightlightCurrent(object);
						getContent(this.href);
						return false;
					});
					
				}
					
			}
			
			
		}

		/**
		 * Подсветка текущего пункта
		 */
		var hightlightCurrent = function (object) {
			$(_elements).removeClass('current');
			$(object).addClass('current');
		}

		/**
		 * Отправляем запрос
		 */
		var getContent = function (section, params, isPost) {
			
			if (params || isPost) {
				_loaderData(section, params, isPost);
			}
			else {
				
				section = section.split(_root);
				section = section[1];
				if(!section) {
					section = '#';
				}
				historyPage.GoTo(section, _options.historyPageKey);
				return false;
			}
			
		}

		var _loaderData = function(section, params, isPost) {
		
			
			var callback = function(data, status){
		
				if (data == null) {
					$(_options.container).hide();
					return;
				}
				else {
		
					pageTrack(_root + section);
		
					$(_options.container)
						.show()
						.html(data);
						

					preloader.hide();
					
					_options.callbackComplete();

					/**
					 * Назначаем обработчики на свеже-пришедшее
					 */
					_setEventsFormElement($(_options.container));
					
					$('a, form', $(_options.container)).each(function () {
						initHandler(this);
					});
					
				}
				
				
				nowSection = section;
				return;
				
			}
		
			if (!section) {
				callback(null);
				return;
			}

			_options.callbackBefore();
			preloader.show();
		
			if (!params) {
				params = {};
			}
			params['ajax'] = 1;

			if(isPost) {
				$.post(section, params, callback);
			}
			else {
				$.get(section, params, callback);
			}

		}

		
		/**
		 * Функция для фикса бага с формами в IE6
		 * при перезагрузки флэшки-пустышки пропадает фокус из поля
		 */
		var _setEventsFormElement = function ( parent ) {

			if ( $.browser.msie && parseInt($.browser.version) == 6 ) {
				
				// назначаем обработчик для input type="text"
				$('input, textarea, select', parent)
					.focus(function ( ) {
						historyPage.StopDisplatch();
					})
					.blur(function ( ) {
						historyPage.StartDispatch();
					});

			}
			
		}
		
		$.fn.historyAjax._postForm = function (form) {
			
			var json = $(form).serializeArray();
			
			if (!onlyGet) {
				onlyGet = $(form).attr('method') == 'get' ? true : false
			}
			
			GetContent(nowSection, json, onlyGet ? false : true);

			return false;
	
		}
		
		return this.each(function () {
			
			initHandler(this);
			historyPage.addCallBack(function (url) {
				_loaderData(url);
			}, _options.historyPageKey)
			
		});
	
	};
	
	
	$.fn.historyAjax.defaults = {
		
		container: '#for_ajax',
		historyPageKey: 'default',
		callbackBefore: function () {},
		callbackComplete: function () {},
		
	};

})(jQuery);


var postForm = function () {
	$.fn.historyAjax._postForm(this);
	return false;
}


var preloader = {
	
	show : function () {
		$('#overlay')
			.height($('body').height())
			.show();
	},
	
	hide : function () {
		$('#overlay').hide();
	}

}


var pageTrack = function (url) {
	if (typeof(pageTracker) != 'undefined') {
		pageTracker._trackPageview(url);
	}
}