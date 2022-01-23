const winCase = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 4, 8],
    [2, 4, 6],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
]

// true: X
// false: O

let turn = true;

const slots = [...document.getElementById("root").children];

// reset the game

const pushHistory = (history = []) => {
    const div = document.createElement("div");
    div.textContent = 'step #' + slots.reduce((pre, cur) => pre + (cur.state ? 1 : 0), 0);
    document.getElementById("history").appendChild(div);
    div.onclick = () => {
        reset();
        slots.forEach((child, index) => {
            child.state = history.historyMap[index];
            child.removeAttribute('class');
            if (child.state)
                child.classList.add(child.state);
            child.textContent = child.state;
            check(history.turn);
            turn = !history.turn;
            document.getElementById('turn').textContent = `turn: ${turn ? 'X' : 'O'}`;
        })
    }
    document.getElementById("history").scrollTop = document.getElementById("history").scrollHeight;
}

const reset = () => {
    slots.forEach((child) => {
        child.state = null;
        child.textContent = "";
        turn = true;
        child.removeAttribute("class");
    })
    document.getElementById('turn').textContent = `turn: ${turn ? 'X' : 'O'}`;
}

// show up the winner

document.getElementById('winBoard').addEventListener('click', (e) => {
    document.getElementById('winBoard').style.display = 'none';
    reset();
})

const win = (turn) => {
    document.getElementById("win").textContent = `The winner is: ${turn ? 'X' : 'O'}`;
    document.getElementById('winBoard').style.display = 'flex';
}

const pair = () => {
    document.getElementById("win").textContent = `Tie!`;
    document.getElementById('winBoard').style.display = 'flex';
}

const check = (turn) => {
    for (let _case of winCase) {
        const [a, b, c] = _case;
        if (slots[a].state &&
            slots[a].state == slots[b].state &&
            slots[a].state == slots[c].state) {
            return win(turn);
        }
    }
    const ticked = slots.reduce((pre, cur) => pre + (cur.state ? 1 : 0), 0);
    if (ticked == 9) {
        pair();
    }
}

slots.forEach((child) => {
    child.onclick = () => {
        if (!child.state) {
            child.state = turn ? 'X' : 'O';
            child.classList.add(child.state);
            child.textContent = child.state;
            check(turn);
            const historyMap = slots.map((slot) => slot.state || null);
            pushHistory({
                turn: turn,
                historyMap: historyMap
            });
            turn = !turn;
            document.getElementById('turn').textContent = `turn: ${turn ? 'X' : 'O'}`;
        }
    }
})