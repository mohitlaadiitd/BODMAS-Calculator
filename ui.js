var details = [
    [
        {
            'text': 'AC',
            'id': 'clear'
        },
        {
            'text': '+',
            'id': 'add'
        },
        {
            'text': '-',
            'id': 'subtract'
        },
        {
            'text': '/',
            'id': 'divide'
        },
    ],
    [
        {
            'text': '7',
            'id': 'seven'
        },
        {
            'text': '8',
            'id': 'eight'
        },
        {
            'text': '9',
            'id': 'nine'
        },
        {
            'text': '*',
            'id': 'multiply'
        },
    ],
    [
        {
            'text': '4',
            'id': 'four'
        },
        {
            'text': '5',
            'id': 'five'
        },
        {
            'text': '6',
            'id': 'six'
        },
        {
            'text': '0',
            'id': 'zero'
        },
    ],
    [
        {
            'text': '1',
            'id': 'one'
        },
        {
            'text': '2',
            'id': 'two'
        },
        {
            'text': '3',
            'id': 'three'
        },
        {
            'text': '=',
            'id': 'answer'
        }
    ]
];

for (var j = 0; j < 4; j++) {
    var html = "";
    for (var i = 0; i < 4; i++) {
        html += "<button class='calculator-key' + id='" + details[j][i].id + "'>" + details[j][i].text + "</button>";
    }
    document.getElementsByClassName('line-' + (j+1).toString())[0].innerHTML = html;
}