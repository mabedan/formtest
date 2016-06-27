"use strict";

var options = require("./form/options.js");
var page = require("./form/components/page.js");

var firstPage = page();
var firstPage = page();
firstPage.appendTo("body"); 
page.addSection(options.perPostSection(), firstPage);
page.addSection(options.shortAddressSection(), firstPage);
page.addSection(options.puppySection(), firstPage);
page.addSection(options.puppySection(), firstPage);
page.addSection(options.puppySection(), firstPage);
page.addSection(options.longAdressSection(), firstPage);
page.addSection(options.thankSection(), firstPage);
page.addSection(options.paymentSection(), firstPage);
