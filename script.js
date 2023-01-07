gridSize = 16

let gridSlider = document.querySelector("#gridSlider")
let sliderText = document.querySelector("#sliderText")
let paintingContainer = document.querySelector("#paintingContainer")
let resetButton = document.querySelector("#resetButton")
let rainbowButton = document.querySelector("#rainbowButton")
let colorInput = document.querySelector("#colorInput")
let colorPicker = document.querySelector("#colorPicker")
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

    draw()
    mousedownDraw()
})

resetButton.addEventListener("click", () => {
    gridSquares.forEach((square) => {
        square.style.backgroundColor = ""
    })
})

let drawState = false
let rainbowMode = false

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


draw()
mousedownDraw()

rainbowButton.addEventListener("click", () => {
    if (rainbowMode == false) {
        rainbowMode = true
        rainbowButton.style.backgroundColor = "red"
    }
    else {
        rainbowMode = false
        rainbowButton.style.backgroundColor = ""
    }
})

let selectedColor = "black"
colorInput.addEventListener("input", (e) => {
    colorPicker.style.backgroundColor = `${e.target.value}`
    selectedColor = `${e.target.value}`
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

function draw() {
    gridSquares.forEach((square) => square.addEventListener("mouseenter", (e) => {
        if (drawState) {
            if (rainbowMode) {
                square.style.backgroundColor = randomColor()
            }
            else {
                square.style.backgroundColor = selectedColor
            }
        }
    }))    
}

function mousedownDraw() {
    gridSquares.forEach((square) => square.addEventListener("mousedown", (e) => {
        if (rainbowMode) {
            square.style.backgroundColor = randomColor()
        }
        else {
            square.style.backgroundColor = selectedColor
        }
    }))
}

// gridSquares.forEach((square) => square.addEventListener("mousedown", (e) => {
//     if (rainbowMode) {
//         square.style.backgroundColor = randomColor()
//     }
//     else {
//         square.classList.add("colored")
//     }
// }))

function randomColor() {
    let num1 = Math.floor(Math.random() * 255)
    let num2 = Math.floor(Math.random() * 255)
    let num3 = Math.floor(Math.random() * 255)
    let randomColor = `rgb(${num1}, ${num2}, ${num3})`
    return randomColor
}




// function hoverColorChange() {

// }