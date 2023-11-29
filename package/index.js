export default function genFlowChart(properties, symbols) {
    let flowchart = "";

    // Grid
    let gridSize = { 'cols': 0, 'rows': 0 };
    let gridData = []

    // Current Coordinate
    let currentCoordinates = [0, 0];

    let gridTemplateColumns = '';
    let gridTemplateRows = '';


    Object.keys(symbols).map((title, i) => {
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
                // Add one col to the right
                gridSize.cols += 1;

                // Update current coordinate
                currentCoordinates[0] += 1;
                break;
            case 'left':
                // Add one col to the right
                gridSize.cols += 1;

                // Move all grid elements one to the right
                gridData.map((element, i) => {

                    gridData[i] = {
                        [`${Number(Object.keys(element)[0][0] + 1)},${Object.keys(element)[0][2]}`]: {
                            "coordinates": [...currentCoordinates],
                            "symbol": symbol,
                            "title": title
                        }
                    }
                })

                // Update current coordinate
                currentCoordinates[0] -= 1;
                break;
            case 'up':
                // Add one col vertically
                gridSize.rows += 1;

                // Update current coordinate
                currentCoordinates[1] += 1;
                break;
            case 'down':
                // Add one col vertically
                gridSize.rows += 1;

                // Move all grid elements one up
                gridData.map((element, i) => {

                    gridData[i] = {
                        [`${Number(Object.keys(element)[0][0])},${Number(Object.keys(element)[0][2]) + 1}`]: {
                            "coordinates": [...currentCoordinates],
                            "symbol": symbol,
                            "title": title
                        }
                    }
                })

                // Update current coordinate
                currentCoordinates[1] -= 1;
                break;
        }
    });

    console.log("Grid Data: ", gridData);


    // Render Grid
    let gridElements = [];
    currentCoordinates = [0, gridSize.rows];

    // Loop through y
    for (let y = gridSize.rows; y >= 0; y--) {
        // Loop through x
        for (let x = 0; x <= gridSize.cols; x++) {


            console.log("X, Y: ", x, y)
            let found = false;

            // See if any symbols have this coordinate
            gridData.map((element, i) => {
                const elementCoords = [Number(Object.keys(element)[0][0]), Number(Object.keys(element)[0][2])]

                console.log("Current Coordinates:", currentCoordinates)
                console.log("Element Coordinates:", elementCoords)

                // Element is in grid
                if ((JSON.stringify(elementCoords) === JSON.stringify(currentCoordinates)) && !found) {

                    console.warn("Element found!");

                    const symbol = element[Object.keys(element)[0]].symbol;
                    const title = element[Object.keys(element)[0]].title;

                    gridElements.push(`<section id='flowchart-symbol' type='${symbol.type}' style="background-color: ${properties.symbolBackground}; border-color: ${properties.symbolBorder}"><span>${title}</span></section>`)

                    found = true;
                    currentCoordinates[0] += 1;
                }
            })

            if (!found) {
                console.warn("Element not found, filling empty position!");

                gridElements.push(`<section id='flowchart-symbol'></section>`)
                currentCoordinates[0] += 1;
            }

        }

        currentCoordinates[1] += 1;
        currentCoordinates[0] = 0;
        gridTemplateRows += "1fr "
    }

    for (let x = 0; x <= gridSize.cols; x++) {
        gridTemplateColumns += "1fr "
    }

    // Creating flowchart container
    const flowchartElement = document.createElement('section');
    flowchartElement.id = `flowchart-container`

    // Creating flowchart grid
    flowchartElement.style.gridTemplateColumns = gridTemplateColumns;
    flowchartElement.style.gridTemplateRows = gridTemplateRows;

    // Defining Order
    flowchartElement.classList.add(properties.order);

    // Styling
    flowchartElement.style.color = properties.textColor;
    flowchartElement.style.fontWeight = properties.fontWeight;

    // Adding elements
    flowchartElement.innerHTML = [...gridElements];

    // Adding flowchzrt to body
    document.getElementById("flowchart-mount").appendChild(flowchartElement);
}
