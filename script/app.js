(() => {
	// set up the puzzle pieces and boards
	const puzzleButtons = document.querySelectorAll('#buttonHolder img'),
				// querySelectorAll is for a one to many relationship and returns a NodeList (an array) of matching elements
				puzzlePieces = document.querySelectorAll(".puzzle-image"),
				dropZones = document.querySelectorAll(".drop-zone"),
				gameBoard = document.querySelector(".puzzle-board"), // one to one relationship -> returns the first matching element
				zonePieces = document.querySelector('.puzzle-pieces');



	let imageNames = ["topLeft", "topRight", "bottomLeft", "bottomRight"];

	
	function changeImageSet() {
		imageNames.forEach((piece, index) => {
			puzzlePieces[index].src = `images/${piece + this.dataset.bgkey}.jpg`;
		});

		gameBoard.style.backgroundImage = `url(images/backGround${this.dataset.bgkey}.jpg)`;
	}

	function allowDrag(event) {
		console.log('started dragging an image: this one - ', event.target.id);

		event.dataTransfer.setData("draggedImg", this.id);
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

		let droppedImage = event.dataTransfer.getData("draggedImg");

		event.target.appendChild(document.querySelector(`#${droppedImage}`));
	}

// resets the puzzle game when the next image is clicked.
	function resetPuzzlePieces() {
		for (let i = 0; i < puzzlePieces.length; i++) {
			zonePieces.appendChild(puzzlePieces[i]);
		}
	}
	

		// click on the bottom buttons to change the puzzle images and reset pieces
		puzzleButtons.forEach(button => {
		button.addEventListener('click', changeImageSet);
		button.addEventListener('click', resetPuzzlePieces);
	});

	puzzlePieces.forEach(piece => piece.addEventListener('dragstart', allowDrag));

		dropZones.forEach(zone => {
		zone.addEventListener('dragover', allowDragOver);
		zone.addEventListener('drop', allowDrop);
	});

	// call the function and pass in the first nav button as a reference
	changeImageSet.call(puzzleButtons[0]);
})();
