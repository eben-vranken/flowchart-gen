import genFlowChart from './package/index.js';

const properties = {
    'order': 'horizontal',
    'textColor': '#fff',
    'fontWeight': 'bold',
    'symbolBackground': '#81b29a',
    'symbolBorder': '#3d405b',
    'arrowColor': '#000'
}

const symbols = {
    "Test 1": { "type": "square", "propagate": "right" },
    "Test 2": { "type": "circle", "propagate": "down" },
    "Test 3": { "type": "square", "propagate": "right" },
    "Test 4": { "type": "square","propagate": "down" },
    "Test 7": { "type": "square","propagate": "down" },
    "Test 5": {"type": "circle", "propagate": "left"},
    "Test 6": {"type": "circle",}
}

genFlowChart(properties, symbols);