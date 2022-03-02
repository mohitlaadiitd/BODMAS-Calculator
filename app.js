var answer = 0;
const operators = ['AC', '/', '*', '+', '-'];

var display = $('#display')[0],
    visualizer = $('.visualizer')[0],
    visualizeArray = [],
    lastIsInteger = false,
    answerInBox = false;

$('.calculator-key').click(function() {
    var input = $(this).text();

    if (answerInBox) { reset(); }

    if (input == '=') {
        showAnswer();
        return;
    }

    if (operators.includes(input)) {
        if (input === 'AC') return reset();
        if (!lastIsInteger) {
            alert("Operator can't be entered before entering numner");
            return;
        }
        updateVisualizeArray(input);
        lastIsInteger = false;
        changeInput(input);
    } else {
        updateVisualizeArray(input);
        lastIsInteger = true;
        changeInput(input);
    }
    changeVisualizer();
});

document.onkeydown = function(e) {
    if (answerInBox) { reset(); }
    var key = e.key;

    if (key == 'Enter') return showAnswer();

    if (!operators.includes(key) && !Number.isInteger(parseInt(key))) { return; }

    updateVisualizeArray(key);
    changeInput(key);
    changeVisualizer();
};

function changeInput(input) {
    if (visualizeArray.length === 0 && operators.includes(input)) {
        console.log('first input');
        return;
    }
    display.value += input;
}

function showAnswer() {
    answerInBox = true;
    if (operators.includes(visualizeArray[visualizeArray.length - 1])) {
        alert("Invalid Expression");
        return;
    }
    display.value = eval(display.value);
    finalVisualize();
    changeVisualizer();
}

function reset() {
    answerInBox = false;
    lastIsInteger = false;
    display.value = '';
    visualizeArray = [];
    console.log("Resetting the Calculator");
    changeVisualizer();
}

function updateVisualizeArray(input) {
    if (operators.includes(input) &&
        visualizeArray.length >= 1 &&
        operators.includes(visualizeArray[visualizeArray.length - 1])) {
        alert("Operator can't be entered before entering numner");
        return reset();
    }
    if (!operators.includes(input)) {
        var last = visualizeArray[visualizeArray.length - 1];
        if (Number.isInteger(parseInt(last))) visualizeArray[visualizeArray.length - 1] += input;
        else visualizeArray.push(input);
    } else {
        visualizeArray.push(input);
    }
}

function changeVisualizer() {
    visualizer.textContent = visualizeArray.join('');
}

function finalVisualize() {
    var html = "";
    for (var j = 1; j < 5; j++) {
        var op = operators[j];
        var i = 0;
        while (i < visualizeArray.length) {
            if (visualizeArray[i] === op) {
                var left = findLeft(i);
                var right = findRight(i);
                visualizeArray.splice(left, 0, '(');
                visualizeArray.splice(right + 2, 0, ')');
                i++;
            }
            i++;
        }
    }
    // var stack = [];
    // for (var i = 0; i < visualizeArray.length; i++) {
    //     if (visualizeArray[i] === '(') {
    //         stack.push(i);
    //     } else if (visualizeArray[i] === ')') {
    //         var left = stack.pop();
    //         var right = i;
    //         var color = 'green';
    //         var span = `<span style="background-color: ${color}">`;
    //         html += span + '(' + '</span>' + visualizeArray.slice(left + 2, right-1).join(' ') + span + ')' + '</span>';
    //     }
    // }
    // visualizer.innerHTML = html;
    changeVisualizer();
}

function findLeft(index) {
    var left = index - 1;
    if (visualizeArray[left] === ')') {
        var count = 1;
        while (left > 0 && count != 0) {
            left--;
            if (visualizeArray[left] === ')') count++;
            else if (visualizeArray[left] === '(') count--;
        }
    }
    return Math.max(left, 0);
}

function findRight(index) {
    var right = index + 1;
    if (visualizeArray[right] === '(') {
        var count = 1;
        while (right < visualizeArray.length - 1 && count != 0) {
            right++;
            if (visualizeArray[right] === '(') count++;
            else if (visualizeArray[right] === ')') count--;
        }
    }
    return Math.min(right, visualizeArray.length - 1);
}