let gameBoard = [
    ['', '', 'T', '', ''],
    ['M', '', '', 'T', ''],
    ['', 'T', 'M', '', ''],
    ['', '', '', 'M', ''],
    ['', 'M', '', '', 'D']
];

let player = {
    x: 0, 
    y: 0, 
    health: 100,
    inventory: [],
    move: function(direction) {
    
        if (this.health <= 0) return; 
        switch (direction) {
            case 'up': 
                if (this.x > 0) this.x--; 
                break;
            case 'down': 
                if (this.x < 4) this.x++; 
                break;
            case 'left': 
                if (this.y > 0) this.y--; 
                break;
            case 'right': 
                if (this.y < 4) this.y++; 
                break;
        }
        handleTileInteraction();
        renderBoard();
        updatePlayerStats();
    },
    collectTreasure: function() {
        if (gameBoard[this.x][this.y] === 'T') {
            this.inventory.push('Dragon\'s Treasure');
            gameBoard[this.x][this.y] = ''; 
            updatePlayerStats();
            return true;
        }
        return false;
    },
    fightMonster: function() {
        if (gameBoard[this.x][this.y] === 'M') {
            this.health -= 20; 
            gameBoard[this.x][this.y] = ''; 
            updatePlayerStats();
            if (this.health <= 0) {
                endGame('You have been defeated by the monsters!');
            }
            return true;
        }
        return false;
    }
};
function renderBoard() {
    let boardHTML = '';
    for (let row = 0; row < 5; row++) {
        boardHTML += '<tr>';
        for (let col = 0; col < 5; col++) {
            let cellClass = '';
            if (player.x === row && player.y === col) {
                cellClass = 'player';
            } else if (gameBoard[row][col] === 'T') {
                cellClass = 'treasure';
            } else if (gameBoard[row][col] === 'M') {
                cellClass = 'monster';
            } else if (gameBoard[row][col] === 'D') {
                cellClass = 'door';
            }
            boardHTML += `<td class="${cellClass}"></td>`;
        }
        boardHTML += '</tr>';
    }
    document.getElementById('gameBoard').innerHTML = boardHTML;
}

function updatePlayerStats() {
    document.getElementById('playerStats').innerHTML = `Health: ${player.health}<br>Inventory: ${player.inventory.length} treasures collected.`;
}
function handleTileInteraction() {
    if (player.collectTreasure()) {
        document.getElementById('gameMessages').innerText = 'You have collected a treasure!';
    } else if (player.fightMonster()) {
        document.getElementById('gameMessages').innerText = 'You fought a monster!';
    } else if (gameBoard[player.x][player.y] === 'D') {
        endGame('You found the Dragon\'s Treasure!');
    }
}

function endGame(message) {
    document.getElementById('gameMessages').innerText = message;
    document.removeEventListener('keydown', handleKeyPress); 
}

function handleKeyPress(event) {
    if (event.key === 'ArrowUp') {
        player.move('up');
    } else if (event.key === 'ArrowDown') {
        player.move('down');
    } else if (event.key === 'ArrowLeft') {
        player.move('left');
    } else if (event.key === 'ArrowRight') {
        player.move('right');
    }
}

document.addEventListener('keydown', handleKeyPress);

renderBoard();
updatePlayerStats();
