document.addEventListener("DOMContentLoaded", function () {
	const gameContainer = document.getElementById("game");
	let card1 = null;
	let card2 = null;
	let cardsFlipped = 0;
	let noClicking = false;

	const COLORS = [
		"red",
		"blue",
		"green",
		"orange",
		"purple",
		"red",
		"blue",
		"green",
		"orange",
		"purple",
	];

	// here is a helper function to shuffle an array
	// it returns the same array with values shuffled
	// it is based on an algorithm called Fisher Yates if you want ot research more
	function shuffle(array) {
		let counter = array.length;

		// While there are elements in the array
		while (counter > 0) {
			// Pick a random index
			let index = Math.floor(Math.random() * counter);

			// Decrease counter by 1
			counter--;

			// And swap the last element with it
			let temp = array[counter];
			array[counter] = array[index];
			array[index] = temp;
		}

		return array;
	}

	// this function loops over the array of colors
	// it creates a new div and gives it a class with the value of the color
	// it also adds an event listener for a click for each card
	function createDivsForColors(colorArray) {
		for (let color of colorArray) {
			const newDiv = document.createElement("div");

			// give it a class attribute for the value we are looping over
			newDiv.classList.add(color);

			// call a function handleCardClick when a div is clicked on
			newDiv.addEventListener("click", handleCardClick);

			// append the div to the element with an id of game
			gameContainer.append(newDiv);
		}
	}

	// TODO: Implement this function!
	function handleCardClick(event) {
		// you can use event.target to see which element was clicked
		console.log("You just clicked:", event.target);
		if (noClicking) return;
		const clickedCard = event.target;

		// Make sure clicks on the container do nothing
		if (
			clickedCard === gameContainer ||
			clickedCard.classList.contains("flipped")
		)
			return;

		clickedCard.style.backgroundColor = clickedCard.classList[0];
		clickedCard.classList.add("flipped");

		if (!card1) {
			card1 = clickedCard;
			// Ensure a card is not clicked twice
		} else if (!card2 && clickedCard !== card1) {
			card2 = clickedCard;

			if (card1.className === card2.className) {
				cardsFlipped += 2;
				card1.removeEventListener("click", handleCardClick);
				card2.removeEventListener("click", handleCardClick);
				card1 = null;
				card2 = null;
				if (cardsFlipped === COLORS.length) {
					alert("Game Over");
				}
			} else {
				noClicking = true;
				setTimeout(() => {
					card1.style.backgroundColor = "";
					card2.style.backgroundColor = "";
					card1.classList.remove("flipped");
					card2.classList.remove("flipped");
					card1 = null;
					card2 = null;
					noClicking = false;
				}, 1000);
			}
		}
	}
	createDivsForColors(shuffle(COLORS));
	gameContainer.addEventListener("click", handleCardClick);
});
