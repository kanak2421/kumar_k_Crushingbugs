// wrap everything in an IIFE / module
// a module is a JavaScript "pattern" - a programming convention
// this keeps your code private - kinda like a "black box" - which is a best practice

(() => {
    //identify the nodes of interest in the DOM
	const puzzleSelectors = document.querySelectorAll("#buttonHolder img"),
				dropContainer = document.querySelector(".puzzle-board"),
				dragImages = document.querySelectorAll(".puzzle-image"),
				dropZones = document.querySelectorAll(".drop-zone"),
				puzzleContainer = document.querySelector(".puzzle-pieces");

	const pieceName = ["topLeft", "topRight", "bottomLeft", "bottomRight"]

		// functions go in the middle
		function swapImages() {
			let currentIndex = this.dataset.imageref;

			// swap draggable images
			dragImages.forEach((image, index) => {
				image.src = `images/dd/${pieceName[index] + currentIndex}.jpg`;
			});

			// swap background images
			dropContainer.style.backgroundImage = `url(images/dd/backGround${this.dataset.imageref}.jpg)`;

			resetPuzzlePieces();
		}
				function resetPuzzlePieces() {
					dropZones.forEach(zone => {
						if (zone.children) {
							puzzleContainer.appendChild(zone.firstElementChild);
							puzzleContainer.classList.remove('puzzle-dropped')
						}
						;
					})
				}

		function startDrag(event) {
			console.log('dragging ' + this.id);

			// save a reference to the element the user is dragging
			// so that we can retrieve the element later and put it in a drop zone
			event.dataTransfer.setData("dragTarget", this.id);
			// debugger;
		}

		function draggedOver(event) {
			event.preventDefault();
			console.log('dragging over drop zone elements');
		}

		function dropped(event) {
			//allow a drop to happen
			event.preventDefault();

			// if we've already dropped and appended indo a drop zone, then it shouldn't happen again
			// the return statement is a code-killer - nothing will execute past this line/statement
				if (this.children.length > 0) { return; }


			// get the reference to the dragged image - saved in the drag function using setData
			let targetImage = document.querySelector(`#${event.dataTransfer.getData("dragTarget")}`);

				// if the id of the target image does not match the data set of the drop zone, i.e 'topLeft',
				// it does not allow to drop there;
				if (targetImage.id !== this.dataset.drop) { return; }

			// add it to the zone we dropped the image on
			this.appendChild(targetImage);
			targetImage.classList.add('puzzle-dropped');

		}



		// event handling at the bottom
	dragImages.forEach(piece => {
		piece.addEventListener('dragstart', startDrag);
	});


	dropZones.forEach(zone => {
		zone.addEventListener('drop', dropped);
		zone.addEventListener('dragover', draggedOver);
	});

	puzzleSelectors.forEach(button => button.addEventListener("click", swapImages));
	// puzzleSelectors.forEach(button => button.addEventListener("click", resetPuzzlePieces));
})();
