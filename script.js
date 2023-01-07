let paintingContainer = document.querySelector("#paintingContainer")

function createDivGrid(n) {
    for (let i = 0; i < n * n; i++) {
        let gridSquare = document.createElement("div")
        gridSquare.setAttribute("id", "gridSquare")
        paintingContainer.appendChild(gridSquare)
    }
}

createDivGrid(16)

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


let gridSquares = document.querySelectorAll("#gridSquare")
gridSquares.forEach((square) => square.addEventListener("mouseenter", (e) => {
    if (drawState) {
        square.classList.add("colored")
    }
}))



// function hoverColorChange() {

// }