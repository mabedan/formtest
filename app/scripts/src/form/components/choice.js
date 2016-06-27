"use strict";

module.exports = function choice() {
	return $("<div class='choice card-item'></div>").click(function () {
		$(this).toggleClass("selected");
		$(this).trigger("close-section");
	});
};
