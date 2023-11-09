main = document.getElementsByTagName("main")[0]

const UpperColor = [0, 0, 0]
const BottomColor = [255, 255, 255]

let overallDistance = BottomColor.map((x, i) => {return BottomColor[i] - UpperColor[i]})

let tiles = main.children

for (const tile of tiles) {
    let position = tile.getAttribute("data-position").split(" ").map(x => parseInt(x))
    let x = position[1]
    let y = position[0]

    let magnitude = Math.sqrt(Math.pow(x + 1, 2) + Math.pow(y + 1, 2)) / Math.sqrt(Math.pow(6, 2) + Math.pow(12, 2))

    let color = overallDistance.map((x, i) => {return (x * magnitude * 1.2 + UpperColor[i]) * y / (height * 5 / 12)})
    tile.style.backgroundColor = `rgb(${color[0]}, ${color[1]}, ${color[2]})`
}