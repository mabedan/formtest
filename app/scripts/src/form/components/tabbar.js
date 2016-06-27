"use strict";

var tabIcon = require("./tabIcon.js");
module.exports = function tabBar(tabs) {
	var tabbar = [];
	var currectCard;
	var tabsEl = $("<div class='tabs'></div>");
	for (var i = tabs.length - 1; i >= 0; i--) {
		addTab(tabs[i], i);
	}

	function addTab (t, i) {
		var tab = tabIcon()
			.text(t.text)
			.css("background-image", "url(\"images/"+t.image+".png\")")
			.click(function () {
				insertCard(t.card)
				tabsEl.find(".tab-icon").removeClass("selected");
				tab.addClass("selected")
			});
		if (i == 0) {
			tab.addClass("selected")
		}
		tabsEl.prepend(tab)
	}
	function insertCard(c) {
		if (currectCard) {
			c.insertAfter(currectCard);
			currectCard.remove()
		}
		currectCard = c;
		return c
	}
	return [tabsEl, insertCard(tabs[0].card)]
};
