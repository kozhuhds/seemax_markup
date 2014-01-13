/**
 * Объект - для реализации кнопок back, forward в броузерах (для ajax, flash, ...)
 *
 * @author Александр Хрищанович
 * @version 2.0
 * @require jquery, jquery.swfobject.js
 * @example
 
		historyPage.addCallBack(function (url) {
			// Делаем чтонибудь с этим адресом :) Например ajax запрос
			alert(url);
		}, 'paginator');

		$('.menu A').click(function () {
			historyPage.GoTo(this.href, 'paginator');
		});

 * 
 */


var historyPage = {

	/* Интервал проверки смены адреса */
	timeOutInterval : 1000,

	/* Ссылка на таймер */
	timerHandle : null,

	/* Функции обратного вызова при смене адреса */
	callBackFunction : [],

	/* Путь к флэшке-пустышке (IE & Opera) */
	flashSrc : _root + 'public/flash/lib/history_page.swf',

	/* Предыдущее состояние якоря */
	oldLocation : '',

	/* Объект div для якорей (IE) */
	objectToAnchors : null,	

	/* Объект для флэшки-зуглушки (IE & Opera) */
	objectToFlash : null,

	anchorNames : {},


	StartDispatch : function ( ) {
		
		var _this = this;

		this.timerHandle = setInterval(function () {
			_this.TestChangeLocation();
		}, this.timeOutInterval);
		
	},
	
	StopDisplatch : function ( ) {
		clearInterval(this.timerHandle);
	},

	/* Инициализация объекта */
	Init : function ( ) {

		this.StartDispatch();

		if ($.browser.msie) {
			this.RefreshSWF( );
		}
		
		/*
		var hash_temp = location.toString().split('#');

		if ( hash_temp[1] ) {
			this.GoTo( hash_temp[1], null, true );	
		}
		*/

	},

	/* Переход по url */
	GoTo : function (url, name, isInit) {

		this.CreateAnchor(url, name);

		if ( !isInit ) {
			location.hash = url;
		}

	},

	/* Перезагрузка флэшки (IE & Opera) */
	RefreshSWF : function ( ) {

		if ( !this.objectToFlash ) {

			this.objectToFlash = $('<div></div>');
			$('body').append(this.objectToFlash);
			
			this.objectToFlash
				.css({
					height: 0,
					width: 0
				})
				.addClass('hidden')
				.flash({
					swf: this.flashSrc
				});

		}

		if ($.browser.msie && parseInt($.browser.version) < 9) {
			this.objectToFlash.html(this.objectToFlash.html());
		}

	},

	/* Проверка смены якоря */
	TestChangeLocation : function ( ) {

		if ($.browser.msie && parseInt($.browser.version) < 9) {

			var oldTitle = document.title;

			this.RefreshSWF( );

			var nowTitle = document.title;

			var index = nowTitle.lastIndexOf( '#' );
         	
			var hash = (index == -1) ? '' : nowTitle.substr( index );
	
			var normalTitle = oldTitle.split( '#' );
	
			document.title = normalTitle[0];

		}
		else {

			var temp = location.toString().split('#');
			if ( !temp[1] ) {
				hash = '';
			}
			else {
				var hash = '#' + temp[1];
			}

		}

		if ( this.oldLocation != hash  ) {
			this.oldLocation = hash;
			this.CallFunction( hash );

		}
				
	},

	/* Создание ссылок-якорей для IE */
	CreateAnchor : function (name, callbackName) {

		if ( !this.objectToAnchors ) {
			this.objectToAnchors = document.createElement('div');
			this.objectToAnchors.style.display = 'none';
			document.body.insertBefore(this.objectToAnchors, document.body.firstChild);
		}

		if ( !this.anchorNames[name] ) {

			this.anchorNames[name] = callbackName || 'default';
			this.objectToAnchors.innerHTML += '<a name="' + name + '">' + name + '</a>';

		}	

	},

	/* Вызов callBack функции */
	CallFunction : function (name) {

		var urlQuery = name.split('#');
		urlQuery = urlQuery[1] ? urlQuery[1] : '';

		if (this.anchorNames[urlQuery] && typeof(this.callBackFunction[this.anchorNames[urlQuery]]) == 'function') {
			(this.callBackFunction[this.anchorNames[urlQuery]])( urlQuery );
		}
		else if(this.callBackFunction['default']) {
			(this.callBackFunction['default'])('');
		}

	},

	addCallBack : function (func, name) {
		this.callBackFunction[name || 'default'] = func;
	}

};