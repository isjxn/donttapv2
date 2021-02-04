window.onload = () => {
    const gameField = document.querySelector('#gameField');

    var activeSquares = [];
    var clicked;
    var closest;

    const getRandomNumber = () => {
        return Math.floor(Math.random() * 16) + 1;
    }

    const removeItemOnce = (value) => {
        const index = activeSquares.indexOf(value);
        if (index > -1) {
            activeSquares.splice(index, 1);
        }
    }

    const createActiveSquares = () => {
        for (var i = 0; activeSquares.length < 3; i++) {
            const number = getRandomNumber();
            if (!activeSquares.includes(number) && number !== clicked) {
                activeSquares.push(number);
                document.getElementById(`square-${number}`).classList.add('active');
            } else {
                createActiveSquares();
            }
        }
    }

    const setClosest = (event) => {
        closest = document.elementFromPoint(event.pageX, event.pageY);
    }

    const handleClick = () => {
        const children = gameField.children;
        for (let child of children) {
            child.classList.remove('miss');
        }
        if (closest && gameField.contains(closest)) {
            const idName = closest.id;
            const id = idName.replace('square-', '');
            if (closest.classList.contains('active')) {
                closest.classList.remove('active');
                clicked = Number(id);
                removeItemOnce(Number(id));
                createActiveSquares();
            } else {
                closest.classList.add('miss');
            }
        }
    }

    createActiveSquares();
    document.onkeydown = handleClick;
    document.onclick = handleClick;
    document.addEventListener('mousemove', setClosest);
}