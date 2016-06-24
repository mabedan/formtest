"use strict";

define(function (require) {
	return function section () {
		var aSection = $("<div class='section'></div>");
		aSection.bind("close-section", function () {
			aSection.trigger("prepare-close-section");
			var title1 = $(aSection).find(">.header:eq(0)");
			var card1 = $(aSection).find(">.card:eq(0)");
			var tabs = $(aSection).find(".tabs").animate({height:0}, ANIMATION_DURATION, function () {
				tabs.remove();
			});
			card1.height(card1.height()).css("margin-top", 0);
			setTimeout(function() {
				aSection.addClass("selected")
				aSection.addClass("hold-header")
				setTimeout(function() {
					card1.height("").css("margin-top", "")
					setTimeout(function() {
					   card1.html("");
					   aSection.trigger("completed");
					}, ANIMATION_DURATION - 50);
				}, 0);
			}, ANIMATION_DURATION);
			var therest = $(aSection).find(">.card:gt(0), >.header:gt(0)")
			therest.hide(true, function () {
				$(this).remove()
			});
		});
		return aSection
	}
});