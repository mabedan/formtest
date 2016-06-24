"use strict";

define(function (require) {

	var card = require("components/card");
	var choice = require("components/choice");
	var header = require("components/header");
	var input = require("components/input");
	var page = require("components/page");
	var section = require("components/section");
	var tabBar = require("components/tabbar");


	var firstPage;
	var ANIMATION_DURATION = 500;

	function createPerPostSection() {
		var perPostSection = section();

		var perPostTitle = header().text("Versendweg");

		var perPostCard = card();
		var choices = [choice().text("Per Email"), choice().text("Per Email und per Post")]
		perPostCard.append(choices);

		perPostSection.append(perPostTitle);
		perPostSection.append(perPostCard);

		firstPage.append(perPostSection);
		perPostSection.bind("completed", function () {
			createShortAddressSection()
		});
	}

	function createShortAddressSection() {
		var shirtAddressSection = section();

		var shirtAddressTitle = header().text("Adresse eingeben");

		var shirtAddressCard = card();
		var choices = [input().attr("placeholder","Hausnummer"), input().attr("placeholder", "Adresse")];
		shirtAddressCard.append(choices);

		shirtAddressSection.append(shirtAddressTitle);
		shirtAddressSection.append(shirtAddressCard);

		shirtAddressSection.addClass("appear");
		firstPage.append(shirtAddressSection);
		shirtAddressSection.bind("completed", function () {
			createPuppySection();
		}).bind("end-input", function () {
			shirtAddressSection.trigger("close-section");
		}).bind("prepare-close-section", function () {
			var addr = gatherInputs(shirtAddressSection);
			shirtAddressTitle.html("<strong>Address</strong> "+addr);
		});
	}

	function createPuppySection() {
		var puppySection = section();

		var puppyTitle = header().text("Puppy");

		var puppyCard = card();
		var choices = [choice().text("Puppy einschließen"), choice().text("Nope, I have no soul.")]
		puppyCard.append(choices);

		puppySection.append(puppyTitle);
		puppySection.append(puppyCard);

		firstPage.append(puppySection.addClass("appear"));
		puppySection.bind("completed", function () {
			createLongAdressSection()
		});
	}

	function createLongAdressSection () {
		var longAddressSection = section().bind("completed", function () {
			createPaymentSection();
		});

		var longAddressTitle = header().text("Long address").appendTo(longAddressSection);

		var longAddressCard = card().text("longaddress").bind("click", function () {
			createLongAddressPage(longAddressSection)
		}).appendTo(longAddressSection);
		
		firstPage.append(longAddressSection.addClass("appear"));	

	}

	function createLongAddressPage(longAddressSection) {
		var longAddPage = page().addClass("coming").append(
			section().append([
				header().text("Long address sub form"),
				card().append([
					input().attr("placeholder","Hausnummer"),
					input().attr("placeholder","Addresse"),
					input().attr("placeholder","Stadt"),
					input().attr("placeholder","PLZ"),
					input().attr("placeholder","Land"),
					input().attr("placeholder","Planet"),
					input().attr("placeholder","Univers"),
				]),
				card().text("Fertig").click(function () {
					var addr = gatherInputs(longAddPage)
					longAddressSection.find(".header").html("<strong>Long address</strong> "+addr);
					longAddressSection.trigger("close-section")
					longAddPage.css("transform", "translate(100%)");
					setTimeout(function () {
						longAddPage.remove();
					}, ANIMATION_DURATION);
				})
			])
		).appendTo("body");
		setTimeout(function () {
			longAddPage.css("transform", "translate(0px)");
		}, 10);
		setTimeout(function () {
			longAddPage.removeClass("coming");
		}, ANIMATION_DURATION);

	}

	function createThankSection () {
		var thirdSection = section();

		var thirdTitle = header().text("Vielen Dank");
		thirdSection.append(thirdTitle);
		thirdSection.addClass("appear")
		firstPage.append(thirdSection);
	}


	function createPaymentSection (argument) {
		var paymentSection = section();
		var paymentHeader = header().text("Zahlung");
		paymentSection
			.append(paymentHeader)
			.append(
				tabBar([
					{
						text: "PayPal",
						image: "paypal",
						card: card().append([input().attr("placeholder","Username"), input().attr("placeholder", "Password")])
					},
					{
						text: "Rechnung",
						image: "bill",
						card: card().text("Some sort of description")
					},
					{
						text: "IBAN",
						image: "iban",
						card: card()
							.append(input().attr("placeholder","IBAN"))
							.append(input().attr("placeholder", "Password"))
							.append($("<span>").text("Wer ist der Kontoinhaber?"))
							.append(choice().text("Versicherungsnehmer"))
							.append(choice().text("andere Person"))
					}
				])
			);
		paymentSection.addClass("appear").appendTo(firstPage).bind("prepare-close-section", function () {
			paymentHeader.html("<strong>Zahlung</strong> " + $(".tab-icon.selected").text())
		});
	}

	function gatherInputs (el) {
		return el.find("input").map(function () { return this.value }).filter(function () {return this.length}).get()	.join(", ");
	}
	return function () {
		firstPage = page();
		firstPage.appendTo("body");
		// createPaymentSection()
		createPerPostSection();
	}
});