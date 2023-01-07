let paintingContainer = document.querySelector("#paintingContainer")

function createDivGrid(n) {
    for (let i = 0; i < n * n; i++) {
        let gridDiv = document.createElement("div")
        gridDiv.setAttribute("id", "gridDiv")
        paintingContainer.appendChild(gridDiv)
        // console.log("adding a div")
    }
}

createDivGrid(16)
