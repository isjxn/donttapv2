window.onload = () => {
    const gameField = document.querySelector('#gameField');

    var activeSquares = [];
    var clicked;
    var closest;
    var misses = 0;
    var hits = 0;
    var accuracy = 0;

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

    const updateScores = () => {
        document.getElementById('hitScore').innerHTML = hits;
        document.getElementById('missScore').innerHTML = misses;
        //accuracy = hits * 100 / misses;
        //document.getElementById('accuracy').innerHTML = accuracy;
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
                hits += 1;
            } else {
                closest.classList.add('miss');
                misses += 1;
            }
        }
        updateScores();
    }

    createActiveSquares();
    document.onkeydown = handleClick;
    document.onclick = handleClick;
    document.addEventListener('mousemove', setClosest);
}