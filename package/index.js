export default function genFlowChart(properties, symbols) {
    // Grid
    let gridSize = { 'cols': 0, 'rows': 0 };
    let gridData = [];

    // Current Coordinate
    let currentCoordinates = [0, 0];

    Object.keys(symbols).forEach((title) => {
        const symbol = symbols[title];

        // Create symbol element
        gridData.push({
            [`${currentCoordinates[0]},${currentCoordinates[1]}`]: {
                "coordinates": [...currentCoordinates],
                "symbol": symbol,
                "title": title
            }
        });

        // Grid Propagation
        switch (symbol.propagate) {
            case 'right':
                gridSize.cols += 1;
                currentCoordinates[0] += 1;
                break;
            case 'left':
                gridSize.cols += 1;
                currentCoordinates[0] -= 1;
                break;
            case 'up':
                gridSize.rows += 1;
                currentCoordinates[1] -= 1;
                break;
            case 'down':
                gridSize.rows += 1;
                currentCoordinates[1] += 1;
                break;
        }
    });

    console.log("Grid Data: ", gridData);

    // Render Grid
let gridElements = [];

// Loop through rows
for (let y = 0; y <= gridSize.rows; y++) {
    // Loop through columns
    for (let x = 0; x <= gridSize.cols; x++) {
        let found = false;

        // See if any symbols have this coordinate
        gridData.forEach((element) => {
            const elementCoords = element[Object.keys(element)[0]].coordinates;

            // Element is in grid
            if (elementCoords[0] === x && elementCoords[1] === y) {
                console.warn("Element found!");

                const symbol = element[Object.keys(element)[0]].symbol;
                const title = element[Object.keys(element)[0]].title;

                gridElements.push(`<section id='flowchart-symbol' type='${symbol.type}' style="background-color: ${properties.symbolBackground}; border-color: ${properties.symbolBorder}"><span>${title}</span></section>`)

                found = true;
            }
        });

        if (!found) {
            console.warn("Element not found, filling empty position!");
            gridElements.push(`<section id='flowchart-gap'></section>`)
        }
    }
}

    // Creating flowchart container
    const flowchartElement = document.createElement('section');
    flowchartElement.id = `flowchart-container`;

    // Creating flowchart grid
    flowchartElement.style.gridTemplateColumns = `repeat(${gridSize.cols +1 }, 1fr)`;
    flowchartElement.style.gridTemplateRows = `repeat(${gridSize.rows}, 1fr)`;

    // Defining Order
    flowchartElement.classList.add(properties.order);

    // Styling
    flowchartElement.style.color = properties.textColor;
    flowchartElement.style.fontWeight = properties.fontWeight;

    // Adding elements
    flowchartElement.innerHTML = gridElements.join('');

    // Adding flowchart to body
    document.getElementById("flowchart-mount").appendChild(flowchartElement);
}
