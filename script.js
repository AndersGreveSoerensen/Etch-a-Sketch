let gridSlider = document.querySelector("#gridSlider")
let sliderText = document.querySelector("#sliderText")
let paintingContainer = document.querySelector("#paintingContainer")
let resetButton = document.querySelector("#resetButton")
let rainbowButton = document.querySelector("#rainbowButton")
let colorInput = document.querySelector("#colorInput")
let colorPicker = document.querySelector("#colorPicker")
let eraserButton = document.querySelector("#eraserButton")
let drawButton = document.querySelector("#drawButton")
let toggleGridButton = document.querySelector("#toggleGridButton")
let shadingButton = document.querySelector("#shadingButton")
let lightenButton = document.querySelector("#lightenButton")
let paintingContainerHeight = 500
let paintingContainerWidth = 500
let gridSize = 32
gridSlider.value = gridSize


paintingContainer.style.gridTemplateColumns = `repeat(${gridSize}, ${paintingContainerHeight/gridSize}px)`
paintingContainer.style.height = `${paintingContainerHeight}` + "px"
paintingContainer.style.width = `${paintingContainerWidth}` + "px"


createDivGrid(gridSize)
let gridSquares = document.querySelectorAll("#paintingContainer div")

sliderText.textContent = `Grid size: ${gridSlider.value} x ${gridSlider.value}`
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
    updateGrid()
})

resetButton.addEventListener("click", () => {
    gridSquares.forEach((square) => {
        square.style.backgroundColor = ""
    })
})

let drawState = false
let drawMode = true
let rainbowMode = false
let eraserMode = false
let shadingMode = false
let lightenMode = false

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

drawButton.style.backgroundColor = "pink"
drawButton.addEventListener("click", () => {
    if (!drawMode) {
        drawMode = true
        drawButton.style.backgroundColor = "pink"
        eraserMode = false
        rainbowMode = false
        shadingMode = false
        lightenMode = false
    }
    // else {
        //     drawMode = false
        //     drawButton.style.backgroundColor = ""
        // }
        updateModes()
})

eraserButton.addEventListener("click", () => {
    if (eraserMode == false) {
        eraserMode = true
        eraserButton.style.backgroundColor = "green"
        rainbowMode = false
        drawMode = false
        shadingMode = false
        lightenMode = false
    }
    // else {
    //     eraserMode = false
    //     eraserButton.style.backgroundColor = ""
    // }
    updateModes()
})

rainbowButton.addEventListener("click", () => {
    if (rainbowMode == false) {
        rainbowMode = true
        rainbowButton.style.backgroundColor = "red"
        eraserMode = false
        drawMode = false
        shadingMode = false
        lightenMode = false
    }
    // else {
    //     rainbowMode = false
    //     rainbowButton.style.backgroundColor = ""
    // }
    updateModes()
})



let selectedColor = "rgb(0, 0, 0)"
colorInput.addEventListener("input", (e) => {
    colorPicker.style.backgroundColor = `${e.target.value}`
    selectedColor = `${e.target.value}`
})

let showGrid = true
toggleGridButton.style.backgroundColor = "red"
toggleGridButton.addEventListener("click", (e) => {
    showGrid = !showGrid
    updateGrid()
})


shadingButton.addEventListener("click", (e) => {
    shadingMode = !shadingMode
    if (shadingMode) {
        rainbowMode = false
        eraserMode = false
        drawMode = false
        lightenMode = false
    }
    updateModes()
})

lightenButton.addEventListener("click", (e) => {
    lightenMode = !lightenMode
    if(lightenMode) {
        rainbowMode = false
        eraserMode = false
        drawMode = false
        shadingMode = false
    }
    updateModes()
})


function updateModes() {
    if (eraserMode) {
        eraserButton.style.backgroundColor = "green"
    }
    else {
        eraserButton.style.backgroundColor = ""
    }

    if (rainbowMode) {
        rainbowButton.style.backgroundColor = "red"
    }
    else {
        rainbowButton.style.backgroundColor = ""
    }

    if (drawMode) {
        drawButton.style.backgroundColor = "pink"
    }
    else {
        drawButton.style.backgroundColor = ""
    }

    if (shadingMode) {
        shadingButton.style.backgroundColor = "red"
    }
    else {
        shadingButton.style.backgroundColor = ""
    }

    if(lightenMode) {
        lightenButton.style.backgroundColor = "red"
    }
    else {lightenButton.style.backgroundColor = ""}
}

function updateGrid() {
    if (showGrid) {
        gridSquares.forEach((square) => {
            square.style.border = "1px solid black"
        })
        toggleGridButton.style.backgroundColor = "red"
    }

    else {
        gridSquares.forEach((square) => {
            square.style.border = "none"
        })
        toggleGridButton.style.backgroundColor = ""
    }
}

function createDivGrid(gridSize) {
    for (let i = 0; i < gridSize * gridSize; i++) {
        let gridSquare = document.createElement("div")
        gridSquare.setAttribute("id", "gridSquare")
        gridSquare.style.width = `${paintingContainerWidth/gridSize}` + "px"
        gridSquare.style.height = `${paintingContainerHeight/gridSize}` + "px"
        paintingContainer.appendChild(gridSquare)
        gridSquare.style.backgroundColor = "rgb(255, 255, 255)"
    }
}

function getColorValues(rgbColor) {
    let colorsOnly = rgbColor.split("(")[1]
    colorsOnly = colorsOnly.split(")")[0]
    colorsOnly = colorsOnly.split(",")
    let r = colorsOnly[0]
    let g = colorsOnly[1]
    let b = colorsOnly[2]
    return [r, g, b]
}

function shadeColor(rgbColor, shadeFactor) {
    let rgbValues = getColorValues(rgbColor)
    let r = Number(rgbValues[0])
    let g = Number(rgbValues[1])
    let b = Number(rgbValues[2])

    let rNew = r * (1 - shadeFactor)
    let gNew = g * (1 - shadeFactor)
    let bNew = b * (1 - shadeFactor)

    let newColor = `rgb(${rNew}, ${gNew}, ${bNew})`

    return newColor

}

function tintColor(rgbColor, tintFactor) {
    let rgbValues = getColorValues(rgbColor)
    let r = Number(rgbValues[0])
    let g = Number(rgbValues[1])
    let b = Number(rgbValues[2])

    let rNew = r + (255 - r) * tintFactor
    let gNew = g + (255 - g) * tintFactor
    let bNew = b + (255 - b) * tintFactor

    let newColor = `rgb(${rNew}, ${gNew}, ${bNew})`

    return newColor
    
}

shadeFactor = 0.15
tintFactor = 0.15
function draw() {
    gridSquares.forEach((square) => square.addEventListener("mouseenter", (e) => {
        if (drawState) {
            if (shadingMode) {
                let color = e.target.style.backgroundColor
                let newColor = shadeColor(color, shadeFactor)
                square.style.backgroundColor = newColor
            }

            else if (lightenMode) {
                let color = e.target.style.backgroundColor
                let newColor = tintColor(color, tintFactor)
                square.style.backgroundColor = newColor
            }
            
            else if (rainbowMode) {
                square.style.backgroundColor = randomColor()
            }

            else if (eraserMode) {
                square.style.backgroundColor = "white"
            }

            else {
                square.style.backgroundColor = selectedColor
            }
        }
    }))    
}

function mousedownDraw() {
    gridSquares.forEach((square) => square.addEventListener("mousedown", (e) => {
        if (shadingMode) {
            let color = e.target.style.backgroundColor
            let newColor = shadeColor(color, shadeFactor)
            square.style.backgroundColor = newColor
        }

        else if (lightenMode) {
            let color = e.target.style.backgroundColor
            let newColor = tintColor(color, tintFactor)
            square.style.backgroundColor = newColor
            // console.log(color)
            // console.log(newColor)
        }
        
        else if (rainbowMode) {
            square.style.backgroundColor = randomColor()
        }

        else if (eraserMode) {
            square.style.backgroundColor = ""
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