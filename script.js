// Initial Data
let areas = {
    a: null,
    b: null,
    c: null,
}

document.querySelectorAll('.item').forEach( item => {
    item.addEventListener('dragstart', dragStart);
    item.addEventListener('dragend', dragEnd);
});

// criando uma zona para receber o drop
document.querySelectorAll('.area').forEach( area => {
    area.addEventListener('dragover', dragOver);
    area.addEventListener('dragleave', dragLeave);
    area.addEventListener('drop', drop);
});

document.querySelectorAll('.neutralArea').forEach( area => {
    area.addEventListener('dragover', dragOverNeutral);
    area.addEventListener('dragleave', dragLeaveNeutral);
    area.addEventListener('drop', dropNeutral);
});

// Functions Item
function dragStart(e) {
    // currentTarget pega o item que tem o evento click. O target pega o item que foi clicado dentro do elemento que tem o click.
    e.currentTarget.classList.add('dragging');
}

function dragEnd(e) {
    e.currentTarget.classList.remove('dragging');
}

// Functions Area
function dragOver(e) {
    if (e.currentTarget.querySelector('.item') === null) {
        e.preventDefault();

        e.currentTarget.classList.add('hover');
    }
}

function dragLeave(e) {
    e.currentTarget.classList.remove('hover');
}

function drop(e) {
    e.currentTarget.classList.remove('hover');
    
    if (e.currentTarget.querySelector('.item') === null) {
        let dragItem = document.querySelector('.item.dragging');

        e.currentTarget.appendChild(dragItem);

        updateAreas();
    }
}

// Functions Neutra Area Drag
function dragOverNeutral(e) {
    e.preventDefault();

    e.currentTarget.classList.add('hover');
}

function dragLeaveNeutral(e) {
    e.currentTarget.classList.remove('hover');
}

function dropNeutral(e) {
    e.currentTarget.classList.remove('hover');
    
    let dragItem = document.querySelector('.item.dragging');

    e.currentTarget.appendChild(dragItem);

    updateAreas();
}

// Logic Functions
function updateAreas(){
    document.querySelectorAll('.area').forEach( area => {
        let name = area.getAttribute('data-name'); // se eh a, b ou c

        if (area.querySelector('.item') !== null) {
            areas[name] = area.querySelector('.item').innerHTML;
        } else {
            areas[name] = null;
        }
    });

    if (areas.a === '1' && areas.b === '2' && areas.c === '3') {
        document.querySelector('.areas').classList.add('correct');
    } else if (areas.a !== null && areas.b !== null && areas.c !== null) {
        document.querySelector('.areas').classList.add('incorrect');
    } else {
        document.querySelector('.areas').classList.remove('correct');
        document.querySelector('.areas').classList.remove('incorrect');
    }

    if(areas.a === '1' && areas.b === '2' && areas.c === '3') {
        document.querySelector('.areas').classList.remove('error');
        document.querySelector('.areas').classList.add('correct');
    }else if(areas.a === null | areas.b === null | areas.c === null){
        document.querySelector('.areas').classList.remove('error');
        document.querySelector('.areas').classList.remove('correct');
    }else if(areas.a !== '1' | areas.b !== '2' | areas.c !== '3') {
        document.querySelector('.areas').classList.remove('correct');
        document.querySelector('.areas').classList.add('error');
    }
}