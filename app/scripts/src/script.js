$(document).ready(function () {
	createFirstSection();
});

function createFirstSection() {
	var firstSection = section();

	var firstTitle = header().text("Versendweg");

	var firstCard = card();
	var choices = [choice().text("Per Email"), choice().text("Per Email und per Post")]
	firstCard.append(choices);

	firstSection.append(firstTitle);
	firstSection.append(firstCard);

	$("body").append(firstSection);
	firstSection.bind("completed", function () {
		createSecondSection()
	});
}

function createSecondSection() {
	var secondSection = section();

	var secondTitle = header().text("Adresse eingeben");

	var secondCard = card();
	var choices = [input().attr("placeholder","Hausnummer"), input().attr("placeholder", "Adresse")]
	secondCard.append(choices);

	secondSection.append(secondTitle);
	secondSection.append(secondCard);

	secondSection.addClass("appear")
	$("body").append(secondSection);
	secondSection.bind("completed", function () {
		createPuppySection();
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

	$("body").append(puppySection.addClass("appear"));
	puppySection.bind("completed", function () {
		createThirdSection()
	});
}


function createThirdSection () {
	var thirdSection = section();

	var thirdTitle = header().text("Vielen Dank");
	thirdSection.append(thirdTitle);
	thirdSection.addClass("appear")
	$("body").append(thirdSection);
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
	    	var that = $(this).blur();
	    	setTimeout(function() {
	    		that.trigger("close-section");
	    	}, 200);
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
