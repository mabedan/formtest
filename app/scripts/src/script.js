var firstPage;
$(document).ready(function () {
	firstPage = page();
	firstPage.appendTo("body");
	createPerPostSection();
});

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
		var addr = gatherInputs(shirtAddressSection);
		shirtAddressTitle.html("<strong>Address</strong> "+addr);
		shirtAddressSection.trigger("close-section");
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
		// createThankSection();
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
				}, 600);
			})
		])
	).appendTo("body");
	setTimeout(function () {
		longAddPage.css("transform", "translate(0px)");
	}, 10);
	setTimeout(function () {
		longAddPage.removeClass("coming");
	}, 600);

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
	paymentSection
		.append(header().text("Zahlung"))
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
	paymentSection.addClass("appear").appendTo(firstPage);
}

function tabBar(tabs) {
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
}

function tabIcon() {
	return $("<div class='tab-icon'></div>");
}

function page() {
	return $("<div class='page'></div>");
}

function card() {
	return $("<div class='card'></div>");
}

function choice() {
	return $("<div class='choice card-item'></div>").click(function () {
		$(this).toggleClass("selected");
		$(this).trigger("close-section");
	});
}
function input () {
	return $("<input class='card-item input'/>").keyup(function (e) {
	    if ((e.keyCode == 13) && ($(this).is(':last-child'))) {
	    	$(this).blur().trigger("end-input");
	    }
	}); 
}
function header() {
	return $("<div class='header'></div>");
}

function section () {
	var aSection = $("<div class='section'></div>");
	aSection.bind("close-section", function () {
		var title1 = $(aSection).find(">.header:eq(0)");
		var card1 = $(aSection).find(">.card:eq(0)");
		card1.height(card1.height()).css("margin-top", 0);
		setTimeout(function() {
			aSection.addClass("selected")
			aSection.addClass("hold-header")
			setTimeout(function() {
				card1.height("").css("margin-top", "")
				setTimeout(function() {
				   card1.html("");
				   aSection.trigger("completed");
				}, 550);
			}, 0);
		}, 600);
		var therest = $(aSection).find(">.card:gt(0), >.header:gt(0)")
		therest.hide(true, function () {
			$(this).remove()
		});
	});
	return aSection
}

function gatherInputs (el) {
	return el.find("input").map(function () { return this.value }).filter(function () {return this.length}).get()	.join(", ");
}
