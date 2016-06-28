"use strict";
var Page = require("../components/page.js");
var Options = require("../options.js");

function createCreator(itms) {
	var itemsList = $("<div>").addClass("added-items");
	function item (name) {
		var el = $("<div>").text(name)
			.append($("<button>").text("up").click(function () {
				el.insertBefore(el.prev());
			}))
			.append($("<button>").text("down").click(function () {
				el.insertAfter(el.next());
			}))
			.append($("<button>").text("X").click(function () {
				el.remove();
			}));

		return el;
	}
	function addItem(name) {
		itemsList.append(item(name));
	}
	function choice (name) {
		return $("<div>").text(name).click(function () {
			addItem(name);
		});
	}
	itms.forEach(addItem);
	
	return $("<div>").addClass("creator")
		.append(itemsList)
		.append($("<div>").addClass("options").append(_.map(Options, function(opt, key) {
			return choice(key);
		})));
}

module.exports = {
	creatorPage: function (itms) {
		var page = Page();
		page.append(createCreator(itms));
		return page;
	}
};