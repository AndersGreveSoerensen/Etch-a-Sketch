gridSize = 16

let gridSlider = document.querySelector("#gridSlider")
let sliderText = document.querySelector("#sliderText")
let paintingContainer = document.querySelector("#paintingContainer")
let resetButton = document.querySelector("#resetButton")
let paintingContainerHeight = 500
let paintingContainerWidth = 500


paintingContainer.style.gridTemplateColumns = `repeat(${gridSize}, ${paintingContainerHeight/gridSize}px)`
paintingContainer.style.height = `${paintingContainerHeight}` + "px"
paintingContainer.style.width = `${paintingContainerWidth}` + "px"


createDivGrid(gridSize)
let gridSquares = document.querySelectorAll("#paintingContainer div")

sliderText.textContent = "Grid size: 16 x 16"
gridSlider.addEventListener("input", () => {
    sliderText.textContent = `Grid size: ${gridSlider.value} x ${gridSlider.value}`
})

gridSlider.addEventListener("change", () => {
    gridSize = gridSlider.value
    paintingContainer.style.gridTemplateColumns = `repeat(${gridSize}, ${paintingContainerHeight/gridSize}px)`
    gridSquares.forEach((square) => {
        square.remove()
    })
    createDivGrid(gridSize)
    gridSquares = document.querySelectorAll("#paintingContainer div")

    gridSquares.forEach((square) => square.addEventListener("mouseenter", (e) => {
        if (drawState) {
            square.classList.add("colored")
        }
    }))
    
    gridSquares.forEach((square) => square.addEventListener("mousedown", (e) => {
        square.classList.add("colored")
    }))

})

resetButton.addEventListener("click", () => {
    gridSquares.forEach((square) => {
        square.classList.remove("colored")
    })
})



function createDivGrid(gridSize) {
    for (let i = 0; i < gridSize * gridSize; i++) {
        let gridSquare = document.createElement("div")
        gridSquare.setAttribute("id", "gridSquare")
        gridSquare.style.width = `${paintingContainerWidth/gridSize}` + "px"
        gridSquare.style.height = `${paintingContainerHeight/gridSize}` + "px"
        paintingContainer.appendChild(gridSquare)
    }
}


let drawState = false

window.addEventListener("mousedown", (e) => {
    if (e.button === 0) {
        drawState = true
    }
})


window.addEventListener("mouseup", (e) => {
    if (e.button === 0) {
        drawState = false
    }
})

gridSquares.forEach((square) => square.addEventListener("mouseenter", (e) => {
    if (drawState) {
        square.classList.add("colored")
    }
}))

gridSquares.forEach((square) => square.addEventListener("mousedown", (e) => {
    square.classList.add("colored")
}))



// function hoverColorChange() {

// }