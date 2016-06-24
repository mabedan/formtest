"use strict";
/*globals require*/
require.config({
	baseUrl: 'scripts/src/form', 
    paths: {

        "underscore": "vendor/underscore/underscore"

    }
});
require(["options", "components/page"], function (options, page) {
	var firstPage = page();
	firstPage.appendTo("body");
	// createPaymentSection()
	// page.addSection(options.perPostSection(), firstPage);
	// page.addSection(options.shortAddressSection(), firstPage);
	page.addSection(options.puppySection(), firstPage);
	// page.addSection(options.longAdressSection(), firstPage);
	// page.addSection(options.thankSection(), firstPage);
	page.addSection(options.paymentSection(), firstPage);
});










