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

    let availableTiles = Array.from(tiles).map((x, i) => [x, i % width, Math.floor(i / width), x.getAttribute('data-object')])

    let gemTiles = availableTiles.filter(x => x[3] == "items")

    let gemCount = gemTiles.length

    for (let i = gemCount; i < 5; i++) {

        let placeableTiles = availableTiles.filter((x) => {return x[0].getAttribute("data-object") == "empty"})

        let probabilyTiles = placeableTiles.sort((a, b) => (a[2] * width + a[1]) - (b[2] * width + b[1])).map((x) => {
            let prob = 1
            gemTiles.every(gems => {
                let magnitude = Math.sqrt(Math.pow(gems[1] - x[1], 2) + Math.pow(gems[2] - x[2], 2)) / Math.sqrt(50)

                prob *= magnitude
            });

            return [x[0], x[1], x[2], prob]
        })

        if (placeableTiles.length <= 0) break

        probabilyTiles = probabilyTiles.sort(x => Math.random() - 0.5)

        let rnd = Math.random() * Math.max.apply(null, probabilyTiles.map(x => x[3]))

        rightTile = probabilyTiles.find(x => x[3] >= rnd)[0]
        console.log(rnd)
        console.table(probabilyTiles)

        rightTile.setAttribute("data-object", "items")
        rightTile.innerHTML = '<i class="fa-regular fa-gem"></i>'

        gemTiles.push(placeableTiles.find(x => x[0] === rightTile))
    }

}  