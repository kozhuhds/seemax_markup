$(document).ready(function(){
	$('.archive a').on('click', function (e){
		$(this).hide();
		$('.loader').loader("start");
		$.ajax({
			url: "",
			dataType: "json",
			success: function(resp){
				var html = "",
					template = $('#archive-product-template').html();
				resp = JSON.parse(resp);
				$(resp).each(function (){
					html += template
								.replace('{product_url}', this.product_url)
								.replace('{product_img}', this.product_img)
								.replace('{product_title}', this.product_title)
								.replace('{product_description}', this.product_description)
				});
				$(html).appendTo('.catalog__ii');
				$('.loader').loader("stop");
			},
			error: function (){
				console.log("Error");
			}
		});
		e.stopPropagation();
		e.preventDefault();
	});
});