var goalState = 8;
var blockedState = [5,9];

function createGrid(){
    // This function creates a grid box where the agent is supposed to travel.
    // The grid consists of different obstacles and the final goal, which are represented by class name
    var divGrid = document.getElementById('grid');
    var gridSize = 3;
    //var gridBlockProbability = 0.3
    
    for(i=0;i<gridSize**2;i++) {
      var box = document.createElement('div');
      var box_id = document.createTextNode(i+1);
      box.appendChild(box_id);
        if(i===4 || i===8) {
            box.id = "block";
        }else {
            box.id = box_id;
        }
      divGrid.appendChild(box); 
    }
}
createGrid();

function getpossibleStates(currentState,gridSize = 3) {
    //Gives the list of the possible states that can be traversed
    var possibleStates = [];
    var ps1 = currentState+gridSize;
    var ps2 = currentState-gridSize;
    var ps3 = currentState + 1;
    var ps4 = currentState - 1;

   if (ps1 > 0 ) { possibleStates.push(ps1);}
   if (ps2 > 0 ) { possibleStates.push(ps2);}
   if (ps3 > 0 ) { possibleStates.push(ps3);}
   if (ps4 > 0 ) { possibleStates.push(ps4);}

   return possibleStates;
}

class Node {
    constructor(state) {
        this.state  = state;
        this.child = null;
    }

    getChild() {
        this.child = getpossibleStates(this.state);
    }

    getRoot() {
        
    }
}

//Select the initial position of the agent
initialPosOfAgent = new Node(1);
initialPosOfAgent.getChild();

console.log(initialPosOfAgent);
