let main = document.getElementsByTagName("main")[0]

document.documentElement.style.cursor = "default";
    
const width = 6
const height = 6
for (let index_Y = 0; index_Y < height; index_Y++) {
    for (let index_X = 0; index_X < width; index_X++) {
        
        let tile = document.createElement("tile")
        tile.setAttribute("data-position", `${index_Y} ${index_X}`)
        tile.setAttribute("data-object", "empty")

        tile.addEventListener("click", x => {TileClick(tile)})
        
        main.appendChild(tile)
    }
}

function TileClick(caller) {
    let state = caller.getAttribute("data-object")

    let stateSet = ["empty", "wall", 'items']

    let n = (stateSet.findIndex(x => x == state) + 1) % 3

    caller.setAttribute("data-object", stateSet[n])
    
    switch (stateSet[n]) {
        case "empty":
            caller.innerHTML = ''
            break;
        case "wall":
            caller.innerHTML = '<i class="fa-solid fa-ban"></i>'
            break;
        case "items":
            caller.innerHTML = '<i class="fa-regular fa-gem"></i>'
        default:
            break;
    }
}

function NewGenerateGem() {

    let availableTiles = Array.from(tiles).map((x, i) => [x, i % width, Math.floor(x / width), x.getAttribute('data-object')])

    let gemCount = availableTiles.filter(x => x[3] == "items").length

    console.log(gemCount)

    for (let i = gemCount; i < 5; i++) {

        let placeableTiles = availableTiles.filter((x) => {return x[0].getAttribute("data-object") == "empty"})

        if (placeableTiles.length <= 0) break

        placeableTiles.sort(x => Math.random() - 0.5)

        placeableTiles[0][0].setAttribute("data-object", "items")
        placeableTiles[0][0].innerHTML = '<i class="fa-regular fa-gem"></i>'
    }

}  