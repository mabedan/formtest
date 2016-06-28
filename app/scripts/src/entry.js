"use strict";

var options = require("./form/options.js");
var Page = require("./form/components/page.js");
var formMaker = require("./form/utils/formMaker.js");

var firstPage = Page();
firstPage.appendTo("body");
var creatorPage;


function getDefaultForm () {
	return [
		"perPostSection",
		"shortAddressSection",
		"puppySection",
		"puppySection",
		"puppySection",
		"longAdressSection",
		"paymentSection",
		"thankSection"
	];
}

function getLocalForm () {
	var local = localStorage.formItems;
	if (local) {
		return local.split(",");
	} else {
		local = getDefaultForm();
		localStorage.formItems = local;
		return local;
	}
}

function renderForm() {
	firstPage.empty();
	getLocalForm().forEach(function(item) {
		Page.addSection(options[item](), firstPage);
	});
}

$("body").append($("<button>").text("edit").css("color", "white").click(function () {
	if (creatorPage) {
		var itms = [];
		creatorPage.find(".added-items").children().each(function () {
			itms.push($(this).children().remove().end().text());
		});
		localStorage.formItems = itms;
		creatorPage.remove();
		creatorPage = undefined;
		renderForm();
	} else {
		creatorPage = formMaker.creatorPage(getLocalForm());
		$("body").append(creatorPage);
	}
}));

renderForm();

