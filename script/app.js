(() => {
	// set up the puzzle pieces and boards
	const puzzleButtons = document.querySelectorAll('#buttonHolder img'),
				// querySelectorAll is for a one to many relationship and returns a NodeList (an array) of matching elements
				puzzlePieces = document.querySelectorAll(".puzzle-image"),
				dropZones = document.querySelectorAll(".drop-zone"),
				gameBoard = document.querySelector(".puzzle-board"), // one to one relationship -> returns the first matching element
				zonePieces = document.querySelector('puzzle-pieces');



	let imageNames = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

	// add event handling here -> how is the user going to use our app?
	// what triggers do we need?
	function changeImageSet() {
		// change all the image elements on the page -> draggable image sources
		imageNames.forEach((piece, index) => {
			puzzlePieces[index].src = `images/${piece + this.dataset.bgkey}.jpg`;
		});

		// and set the drop zone background
		gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.bgkey}.jpg)`;
	}

	function allowDrag(event) {
		// let the drag happen, and store a reference of the ID of the element we're dragging
		console.log('started dragging an image: this one - ', event.target.id);

		event.dataTransfer.setData("draggedImg", this.id);
		// event.dataTransfer.setData("targetTrack", this.dataset.track);

		// set a reference to a data track so i can retrieve it later in the drop
	}

	function allowDragOver(event) {
		event.preventDefault(); // for next week
		console.log('dragged something over me!');
	}

	function allowDrop(event) {
		// if a drop zone already has a puzzle piece, this function will stop another piece from being added.
		if (this.children.length >= 1) {
			return;
		}

		//event.preventDefault();
		console.log('dropped an image');

		// get the dragged element's ID from the data transfer
		let droppedImage = event.dataTransfer.getData("draggedImg");

		// add that image to whatever drop zone we're dropping on
		event.target.appendChild(document.querySelector(`#${droppedImage}`));
	}


	
	// click on the bottom buttons to change the puzzle image we're working with
	puzzleButtons.forEach(button => button.addEventListener('click', changeImageSet));
	puzzlePieces.forEach(piece => piece.addEventListener('dragstart', allowDrag));

	for (let zone of dropZones) {
		zone.addEventListener('dragover', allowDragOver);
		zone.addEventListener('drop', allowDrop);
	}

	// research call, apply and bind
	changeImageSet.call(puzzleButtons[0]); // emulates a click on the first bottom button
})();
