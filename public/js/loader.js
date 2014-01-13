(function ( $ ) {
 
    $.fn.loader = function( action ) {
        var self = this,
            activePoint = 0;
        if (action == "start") {
            this.show();
            if (!this[0].startLoader){
                this[0].startLoader = setInterval(function (){
                    self.children().removeClass("cur").removeClass("pre-cur");
                    self.children().eq(activePoint).addClass("cur");
                    self.children().eq(activePoint).prev().addClass("pre-cur");
                    activePoint++;
                    if (activePoint == 3) {
                        activePoint=0;
                    };
                }, 250);
            }
        }
        else if (action == "stop"){
            clearInterval(this[0].startLoader);
            this.hide();
        }
        return this;
    };
}( jQuery ));

