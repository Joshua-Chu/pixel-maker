// Application State

const STATE = {
	gridHeight: 1,
	gridWidth: 1,
	gridColor: "#000000",
};

//DOM Node References

const $inputHeight = document.getElementById("inputHeight");
const $inputWidth = document.getElementById("inputWidth");
const $sizePicker = document.getElementById("sizePicker");
const $colorPicker = document.getElementById("colorPicker");
const $pixelCanvas = document.getElementById("pixelCanvas");

/**
 * @description extract the inputs given by the user
 * @returns {string, string, string} grid row, cells per row, cell color when clicked
 */

const getInputs = () => {
	const { gridHeight, gridWidth, gridColor } = {
		gridHeight: Number($inputHeight.value),
		gridWidth: Number($inputWidth.value),
		gridColor: $colorPicker.value,
	};

	return { gridHeight, gridWidth, gridColor };
};

/**
 * @description generates an array of numbers from 1 to n
 * @param {number} num
 * @returns {number[]} array of numbers
 */

const generateArray = (num) => Array.from({ length: num }, (v, k) => k + 1);

/**
 * @description resets html content of pixel Canvas
 */

const canvasReset = () => {
	$pixelCanvas.innerHTML = "";
};

// Event Handler bindings

$sizePicker.onsubmit = (event) => {
	event.preventDefault();
	const { gridHeight, gridWidth, gridColor } = getInputs();
	STATE.gridHeight = gridHeight;
	STATE.gridWidth = gridWidth;
	STATE.gridColor = gridColor;
	makeGrid(STATE);
};

$colorPicker.onchange = (event) => {
	STATE.gridColor = event.target.value;
	console.log(event.target.value);
};

/**
 * @description generates the grid for the canvas and attaches event handlers to each cell
 * @param {number} gridHeight
 * @param {number} gridWidth
 */

const generateGridTiles = (gridHeight, gridWidth) => {
	const gridHeightArray = generateArray(gridHeight);
	const gridWidthArray = generateArray(gridWidth);

	gridHeightArray.map((row) => {
		const trElement = document.createElement("tr");
		trElement.id = row;

		gridWidthArray.map((cell) => {
			const tdElement = document.createElement("td");
			tdElement.id = `${row}-${cell}`;
			trElement.appendChild(tdElement);
		});

		$pixelCanvas.appendChild(trElement);
	});
};

/**
 * @description generates the grid for the canvas and attaches event handlers to each cell
 * @param STATE.gridHeight height of the grid
 * @param STATE.gridWidth  number of cells per row in the grid
 */

const makeGrid = (STATE) => {
	canvasReset();
	generateGridTiles(STATE.gridHeight, STATE.gridWidth);
	$pixelCanvas.addEventListener("click", toggleCellBG);
};

makeGrid(STATE);
