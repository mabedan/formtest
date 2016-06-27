"use strict";

var page = function () {
	var aPage = $("<div class='page'></div>").bind("completed", function () {
		var remainingSections = aPage.data("sectionsToAppend")
		if (remainingSections.length > 0) {
			var lastSection = aPage.find(".section").last();
			remainingSections.shift().addClass("appear").appendTo(aPage)
			
			aPage.data("sectionsToAppend", remainingSections);
		}
	});

	return aPage
}

page.addSection = function (s, p) { 
	var lastSection = p.find(".section").last();
	if (lastSection.length){
		var remainingSections = p.data("sectionsToAppend") || [];
		remainingSections.push(s);
		p.data("sectionsToAppend", remainingSections);
	} else {
		p.append(s)
	}
}

module.exports = page
