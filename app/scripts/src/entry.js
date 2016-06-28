"use strict";

var options = require("./form/options.js");
var Page = require("./form/components/page.js");

var firstPage = Page();
firstPage.appendTo("body");

renderForm();

function renderForm() {
	firstPage.empty();
	getLocalForm().forEach(function(item) {
		Page.addSection(options[item](), firstPage);
	});
}

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
	var local = localStorage.formItems
	if (local) {
		return local.split(",");
	} else {
		local = getDefaultForm();
		localStorage.formItems = local;
		return local;
	}
}