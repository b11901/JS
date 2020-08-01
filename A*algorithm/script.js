// Global Variables
const GRID_SIZE = 4;
let graph;

let gcost;
let hcost;
let fcost;
let path;


let OPEN = [];
let CLOSE = [];

let STARTING_NODE = 15;
let FINAL_NODE = 1;

let state_block = document.getElementById('block_on_press');
let state_neighbour = document.getElementById('neighbour');
let divGrid = document.getElementById('grid');

var divClickListener = (event) => {
    var divId = event.srcElement.id;
    updateGraph(divId);
}

var updateGrid = () => {

}

var updateGraph = (nodeId) => {

    x = Math.floor(nodeId / GRID_SIZE);
    y = Math.floor(nodeId % GRID_SIZE);

    if (state_block.checked) {
        toogleBlock(x, y);
    }

    if (state_neighbour.checked) {
        updateNeighbour(x, y);
    }

}

var toogleBlock = (x, y) => {
    var node = document.getElementById(getNodeIdFromOrdinate(x, y));

    if (state_neighbour.checked) {
        return;
    }

    if (graph[x][y] == 0) {
        graph[x][y] = 1;
        node.style.backgroundColor = 'white';

    } else {
        graph[x][y] = 0;
        node.style.backgroundColor = 'red';
    }
}

var updateNeighbour = (x, y) => {
    if (state_block.checked) {
        return;
    }
    var possibleNodes = getSurroundingNodesFromCurrentNodeId(getNodeIdFromOrdinate(x, y));
    possibleNodes.map((nodeId) => {
        var node = document.getElementById(nodeId);
        if (!(nodeId == STARTING_NODE || nodeId == FINAL_NODE)) {
            node.style.backgroundColor = "green";
        }
        calculateValues(nodeId);
    });
}

var addTextNode = (nodeId, _graph) => {
    var ordinate = getNodeOrdinateFromId(nodeId);
    var div = document.getElementById(nodeId);

    div.removeChild(div.lastChild);

    var box = document.createElement('div');
    box.className = "costValue";
    var textNode = document.createTextNode(
        _graph[ordinate.x][ordinate.y].toFixed(2)
    );
    box.appendChild(textNode);
    box.id = "fn";

    div.appendChild(box);
}

var calculateValues = (nodeId) => {
    var nodeValues = calculateFn(nodeId);
    updateCostGraph(fcost, nodeId, nodeValues.fn);
    updateCostGraph(gcost, nodeId, nodeValues.gn);
    updateCostGraph(hcost, nodeId, nodeValues.hn);

    addTextNode(nodeId, fcost);

    //console.log(fcost);
    //console.log(hcost);
}

var updatePathGraph = (nodeId, add = true) => {
    var ordinate = getNodeOrdinateFromId(nodeId);
    if (add) {
        path[ordinate.x][ordinate.y] = 1;
    } else {
        path[ordinate.x][ordinate.y] = 0;
    }
}

var updateCostGraph = (_graph, nodeId, value) => {
    var ordinate = getNodeOrdinateFromId(nodeId);
    _graph[ordinate.x][ordinate.y] = value;
}

var eucledian_distance = (sourceId, destId) => {
    sourceNode = getNodeOrdinateFromId(sourceId);
    destNode = getNodeOrdinateFromId(destId);
    return Math.sqrt(
        (destNode.x - sourceNode.x) ** 2 + (destNode.y - sourceNode.y) ** 2
    );
}

var calculateFn = (nodeId) => {
    //G(n) is the value from starting node to the current node
    var gn = eucledian_distance(STARTING_NODE, nodeId);
    var hn = eucledian_distance(nodeId, FINAL_NODE);

    var fn = gn + hn;
    var nodeValues = {
        "fn": fn,
        "gn": gn,
        "hn": hn
    };

    return nodeValues;

}

var getCurrentGraphNodeValueFromId = (nodeId) => {

    x = Math.floor(nodeId / GRID_SIZE);
    y = Math.floor(nodeId % GRID_SIZE);

    //console.log(x, y);
    return graph[x][y];
}

var getNodeOrdinateFromId = (nodeId) => {
    x = Math.floor(nodeId / GRID_SIZE);
    y = Math.floor(nodeId % GRID_SIZE);

    ordinate = {
        "x": x,
        "y": y
    };

    return ordinate;
}

var getNodeIdFromOrdinate = (x, y) => {
    return GRID_SIZE * x + y;
}

function createGrid() {
    // This function creates a grid box where the agent is supposed to travel.
    // The grid consists of different obstacles and the final goal, which are represented by class name
    var gridWidth = (GRID_SIZE * 100) + 100;
    gridWidth = gridWidth.toString().concat("px");
    divGrid.style.width = gridWidth;

    for (i = 0; i < GRID_SIZE ** 2; i++) {
        var box = document.createElement('div');
        var box_id = document.createTextNode(i);
        box.appendChild(box_id);
        box.id = i;
        divGrid.appendChild(box);
        box.addEventListener('click', divClickListener);

        if (i == STARTING_NODE) {
            box.style.backgroundColor = "skyblue";
        }

        if (i == FINAL_NODE) {

            box.style.backgroundColor = "orange";
        }

    }
}

function getSurroundingNodesFromCurrentNodeId(currentNode) {
    //Gives the list of the possible states that can be traversed
    //There are maximum 4 possible states represented by p1,p2,p3 and p4
    var ordinate = getNodeOrdinateFromId(currentNode);
    var x = ordinate.x;
    var y = ordinate.y;
    var possibleNodes = [];
    // TODO: can we limit the GRID_SIZE to something near to the current Node value?
    // If the current node was in middle of the graph, we still check the first row, better to check, 
    //only the row above or below it. 
    for (var i = 0; i < GRID_SIZE; i++) {
        if (Math.abs(x - i) > 1) continue;
        for (var j = 0; j < GRID_SIZE; j++) {
            if (Math.abs(y - j) > 1) continue;
            if (i == x && j == y) continue;
            if (graph[i][j]) {
                possibleNodes.push(getNodeIdFromOrdinate(i, j));
            }
        }
    }
    //Current node bhanda i ra j dubai different cha bhane, that node is diagonal to the current node.
    return possibleNodes;
}

function createArray(length) {
    var arr = new Array(length || 0),
        i = length;

    if (arguments.length > 1) {
        var args = Array.prototype.slice.call(arguments, 1);
        while (i--) arr[length - 1 - i] = createArray.apply(this, args);
    }

    return arr;
}

var initializeGraph = () => {

    for (var i = 0; i < GRID_SIZE; i++) {
        for (var j = 0; j < GRID_SIZE; j++) {
            graph[i][j] = 1;
        }
    }
}

var initializeHelperGraph = () => {

    for (var i = 0; i < GRID_SIZE; i++) {
        for (var j = 0; j < GRID_SIZE; j++) {
            fcost[i][j] = 0;
            hcost[i][j] = 0;
            gcost[i][j] = 0;
            path[i][j] = 0;
        }
    }
}

var main = () => {
    //Initialize
    graph = createArray(GRID_SIZE, GRID_SIZE);

    gcost = createArray(GRID_SIZE, GRID_SIZE);
    hcost = createArray(GRID_SIZE, GRID_SIZE);
    fcost = createArray(GRID_SIZE, GRID_SIZE);
    path = createArray(GRID_SIZE, GRID_SIZE);

    initializeGraph();
    initializeHelperGraph();
    createGrid();

    //console.log(getSurroundingNodesFromCurrentNodeId(STARTING_NODE));
}

main();

// var getSrcToDestDirection = ( sourceNodeId,  destNodeId) => {
//     // This is for calculating the values for g(n) and h(n) can use simple eucledian distance as well

//     /*
//         Node is an object consisting of x,y that represents it's
//         position on the matrix

//         This function returns how can one reach from sourceNode to
//         destNode in the matrix by specifying. 
//         {horizontal,vertical,diagonal}

//         horizontal => x
//         vertical => y
//     */
//    var sourceNode = getNodeOrdinateFromId(sourceNodeId);
//    var destNode = getNodeOrdinateFromId(destNodeId);
//     var result = {
//         "horizontal": 0,
//         "vertical": 0,
//         "diagonal": 0
//     };
//     dfx = sourceNode.x - destNode.x; 
//     dfy = sourceNode.y - destNode.y; 

//     abx = Math.abs(dfx);
//     aby = Math.abs(dfy);

//     if(abx == aby) {
//         result.diagonal = abx;
//         return result;
//     }

//     var diff = (abx - aby);
//     if(diff < 0) {
//         result.diagonal = Math.abs(abx % aby);
//             result.horizontal = Math.abs( sourceNode.x - (abx % aby) );

//     }else {
//         
//         result.diagonal = Math.abs(abx % aby);
//        
//             result.vertical = Math.abs( sourceNode.y - (abx % aby) );
//        
//         
//     }

//     return result;
// }
