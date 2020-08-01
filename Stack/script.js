var stack = document.getElementById('stack');
var popped_elements = document.getElementById('popped_elements');

document.querySelector('#item').addEventListener('keypress', function (e) {
    if (e.key === 'Enter') {
        addToStack();
    }
});

document.querySelector('#clear').addEventListener('click', () => {
    while (popped_elements.hasChildNodes()) {
        popped_elements.removeChild(popped_elements.lastChild);
    }
});

function createStack() {
    document.getElementById('stack_op').style.display = "block";
    while (stack.hasChildNodes()) {
        stack.removeChild(stack.lastChild);
    }
    var stack_size = document.getElementById("stack_size").value;

    if (stack_size > 10) {
        alert('Lets keep it simple...');
        stack_size = 10;
    }

    for (let i = 0; i < stack_size; i++) {
        var stack_elem = document.createElement('div');
        stack_elem.className = "stack_elem";
        stack_elem.id = i;
        stack.appendChild(stack_elem);
    }
}

addToStack = () => {
    var value = document.getElementById('item').value;
    if (value == '') {
        return
    }
    for (var i = stack.childElementCount - 1; i >= 0; i--) {
        element = stack.childNodes[i];
        if (element.childElementCount == 0) {
            var text_span = document.createElement('span');
            text_span.innerText = value;
            text_span.className = "value";
            element.appendChild(text_span);
            element.style.backgroundColor = "red";
            break;
        }
    }
    document.getElementById('item').value = '';
}
popFromStack = () => {
    for (var i = 0; i < stack.childElementCount; i++) {
        element = stack.childNodes[i];
        if (element.childElementCount > 0) {
            showPoppedElements(element.firstChild.innerHTML);
            element.removeChild(element.lastChild);
            element.style.backgroundColor = "lightgreen";
            break;
        }
    }
}


showPoppedElements = (value) => {
    var div = document.createElement('div');
    div.innerText = value;
    div.className = "output_elem";
    popped_elements.appendChild(div);
}