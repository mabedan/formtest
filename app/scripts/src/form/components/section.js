"use strict";

define(function (require) {
	return function section () {
		var aSection = $("<div class='section'></div>");
		aSection.bind("close-section", function () {
			var title1 = $(aSection).find(">.header:eq(0)");
			var card1 = $(aSection).find(">.card:eq(0)");
			card1.height(card1.height()).css("margin-top", 0);
			setTimeout(function() {
				aSection.addClass("selected")
				aSection.addClass("hold-header")
				setTimeout(function() {
					card1.height("").css("margin-top", "")
					setTimeout(function() {
					   card1.html("");
					   aSection.trigger("completed");
					}, 450);
				}, 0);
			}, 500);
			var therest = $(aSection).find(">.card:gt(0), >.header:gt(0)")
			therest.hide(true, function () {
				$(this).remove()
			});
		});
		return aSection
	}
});