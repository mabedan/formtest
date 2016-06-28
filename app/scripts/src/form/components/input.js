"use strict";
module.exports = function input () {
	return $("<input class='card-item input'/>").keyup(function (e) {
	    if ((e.keyCode === 13) && ($(this).is(":last-child"))) {
	    	$(this).blur().trigger("end-input");
	    }
	}); 
};
