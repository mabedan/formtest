"use strict";

define(function (require) {
	var page = function () {
		return $("<div class='page'></div>");
	}

	page.addSection = function (s, p, noAnimation) { 
		var lastSection = p.find(".section").last();
		if (lastSection.length){
			lastSection.bind("completed", function () {
				if (!noAnimation) {
					s.addClass("appear")
				}
				p.append(s)
			});
		} else {
			p.append(s)
		}
	}

	return page
});
