var processId = 0
var tbody = document.getElementById('roundRobinTable').getElementsByTagName('tbody')[0];
function addRow() {
  var tr = tbody.appendChild(document.createElement('tr'));

  //Automatically add processes
  var process = document.createElement('td');
  process.className = "process";
  var processName = document.createTextNode('P'+processId++);
  process.appendChild(processName);
  tr.appendChild(process);

  //Add arrival time
  var arrivalTime = tr.appendChild(document.createElement('td'));
  var inp_arrival = document.createElement('input');
  inp_arrival.className = "arrivalTime"; 
  arrivalTime.appendChild(inp_arrival);

  var burstTime = tr.appendChild(document.createElement('td'));
  var inp_burst = document.createElement('input');
  inp_burst.className = "burstTime"; 
  burstTime.appendChild(inp_burst);
}

class process {
  constructor(name,at,bt) {
    this.name = name;
    this.at = at;
    this.bt = bt;
  }

  decreaseBurstTime(decBy) {
    this.bt = this.bt - decBy;
  }
}
