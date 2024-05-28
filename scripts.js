document.addEventListener('DOMContentLoaded', () => {
    const cells = document.querySelectorAll('.cell');
    const board = document.getElementById('board');
    const resetButton = document.getElementById('reset');
    let isXNext = true;
    let boardState = Array(9).fill(null);

    const winningCombinations = [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [2, 4, 6]
    ];

    cells.forEach(cell => cell.addEventListener('click', handleCellClick));
    resetButton.addEventListener('click', resetGame);

    function handleCellClick(e) {
        const index = e.target.dataset.index;

        if (boardState[index] || checkWinner()) return;

        boardState[index] = isXNext ? 'X' : 'O';
        e.target.textContent = boardState[index];
        isXNext = !isXNext;

        if (checkWinner()) {
            setTimeout(() => alert(`${boardState[index]} wins!`), 100);
        } else if (!boardState.includes(null)) {
            setTimeout(() => alert('It\'s a tie!'), 100);
        }
    }

    function checkWinner() {
        return winningCombinations.some(combination => {
            const [a, b, c] = combination;
            return boardState[a] && boardState[a] === boardState[b] && boardState[a] === boardState[c];
        });
    }

    function resetGame() {
        boardState = Array(9).fill(null);
        isXNext = true;
        cells.forEach(cell => cell.textContent = '');
    }
});
