"use strict";
/*globals require*/
require.config({
	baseUrl: 'scripts/src/form', 
    paths: {

        "underscore": "vendor/underscore/underscore"

    }
});
require(["firstForm"], function (firstForm) {
	firstForm()
});










