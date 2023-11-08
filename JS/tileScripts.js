let main = document.getElementsByTagName("main")[0]

document.documentElement.style.cursor = "default";
    
const width = 6
const height = 12
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

    let stateSet = ["empty", "wall", 'items', "player"]

    let n = (stateSet.findIndex(x => x == state) + 1) % 4

    caller.setAttribute("data-object", stateSet[n])

    if (stateSet[n] == "wall") {
        caller.innerHTML = '<i class="fa-solid fa-ban"></i>'
    }
    
    switch (stateSet[n]) {
        case "empty":
            caller.innerHTML = ''
            break;
        case "wall":
            caller.innerHTML = '<i class="fa-solid fa-ban"></i>'
            break;
        case "player":
            caller.innerHTML = '<i class="fa-solid fa-user"></i>'
            break;
        case "items":
            caller.innerHTML = '<i class="fa-regular fa-gem"></i>'
        default:
            break;
    }
}
function gemCount() {
    let count = 0
    for (const tile of tiles) {
        if (tile.getAttribute("data-object") === "items") {
            count++
        }
    }

    return count
}

function NewGenerateGem() {

    let probabilityMap = [
        [1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1], 
        [1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1], 
        [1, 1, 1, 1, 1, 1], [1, 1, 1, 1, 1, 1],
    ]

    //#region mapping-probabily-map
    for (let y = 0; y < 6; y++) {
        for (let x = 0; x < 6; x++) {

            let data = tiles[(y + 3) * 6 + x].getAttribute("data-object")

            if (data != 'empty') {
                probabilityMap[y][x] = 0
                continue
            }
        
            for (let innerX = -1; innerX <= 1; innerX++) {
                for (let innerY = -1; innerY <= 1; innerY++) {
                
                    if (innerX == 0 && innerY == 0) continue;

                    worldX = x + innerX
                    worldY = y + 3 + innerY

                    if (worldX >= width || worldX < 0) continue
                    if (worldY >= height || worldY < 0) continue
                    
                    tile = tiles[worldY * 6 + worldX]

                    multiplier = 1

                    switch (tile.getAttribute("data-object")) {
                        case "empty":
                            multiplier *= 1
                            break;
                        case "wall":
                            multiplier *= .9
                            break;
                        case "player":
                            multiplier *= .5
                            break;
                        case "items":
                            multiplier *= .2
                        default:
                            break;
                    }

                    probabilityMap[y][x] *= multiplier
                }
            }
        
        }
    }
    //#endregion mapping-probabily-map
    
    let availables = probabilityMap.flat(1).map((x, i) => {return [x, i % 6, Math.floor(i / 6)]}).filter(x => (x[0] > 0))

    let lastnode = [-1, -1]

    let gem = gemCount()

    for (let n = 0; n < (5 - gem); n++) {

        availables.map(x => {
            if (x[1] == lastnode[0] && x[2] == lastnode[1]) {
                x[0] = 0
                return x
            } else {
                return x
            }
        })
        availables = availables.sort(() => Math.random() - 0.5);
        availables = availables.filter(x => x[0] != 0)

        let max = Math.max.apply(null, availables.map(x => x[0]))

        let r = max * Math.random()

        for (const available of availables) {
            if (available[0] >= r) {
                console.log(available, tiles[(available[2] + 3) * 6 + available[1]], n)
                console.log((5 - gemCount()))

                tiles[(available[2] + 3) * 6 + available[1]].setAttribute("data-object", "items")
                tiles[(available[2] + 3) * 6 + available[1]].innerHTML = '<i class="fa-regular fa-gem"></i>'

                lastnode = [available[1], available[2]]

                break
            }
        }
    }

}  