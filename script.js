// ========================================
// TIC TAC TOE - DSA PROJECT
// STEP 19
// EDGE-CASE TESTING + BUG FIXES
// ========================================


// ========================================
// 1. BOARD ARRAY
// ========================================

let board = Array(9).fill("");


// ========================================
// 2. CURRENT PLAYER
// ========================================

let currentPlayer = "X";


// ========================================
// 3. GAME STATUS
// ========================================

let gameOver = false;


// ========================================
// 4. AI TIMER
// ========================================

let aiTimer = null;


// ========================================
// 5. GAME RESULT TRACKING
// ========================================

let lastGameResult = null;


// ========================================
// 6. PLAYERS
// ========================================

const humanPlayer = "X";

const aiPlayer = "O";


// ========================================
// 7. AI STATISTICS
// ========================================

let nodesExplored = 0;

let maxDepthReached = 0;

let lastBestScore = null;

let lastBestMove = null;

let prunedBranches = 0;


// ========================================
// 8. SCORE MAP
// ========================================

const scoreMap = new Map();

scoreMap.set("X", 0);
scoreMap.set("O", 0);
scoreMap.set("Draw", 0);


// ========================================
// 9. BOARD CELLS
// ========================================

const cells =
    document.querySelectorAll(".cell");


// ========================================
// 10. STACK DATA STRUCTURE
// ========================================

class Stack {

    constructor() {

        this.items = [];

    }


    push(element) {

        this.items.push(element);

    }


    pop() {

        return this.items.pop();

    }


    peek() {

        return this.items[
            this.items.length - 1
        ];

    }


    isEmpty() {

        return this.items.length === 0;

    }


    size() {

        return this.items.length;

    }

}


// ========================================
// 11. MOVE STACK
// ========================================

const moveStack = new Stack();


// ========================================
// 12. OPTIMIZED QUEUE
// ========================================

class Queue {

    constructor() {

        this.items = [];

        this.frontIndex = 0;

    }


    enqueue(element) {

        this.items.push(element);

    }


    dequeue() {

        if (this.isEmpty()) {

            return undefined;

        }


        const element =
            this.items[this.frontIndex];


        this.frontIndex++;


        return element;

    }


    front() {

        if (this.isEmpty()) {

            return undefined;

        }


        return this.items[
            this.frontIndex
        ];

    }


    isEmpty() {

        return (
            this.frontIndex >=
            this.items.length
        );

    }


    size() {

        return (
            this.items.length -
            this.frontIndex
        );

    }


    clear() {

        this.items = [];

        this.frontIndex = 0;

    }


    getElements() {

        return this.items.slice(
            this.frontIndex
        );

    }

}


// ========================================
// 13. MOVE QUEUE
// ========================================

const moveQueue = new Queue();


// ========================================
// 14. GAME HISTORY
// ========================================

let gameHistory = [];


// ========================================
// 15. WINNING PATTERNS
// ========================================

const winningPatterns = [

    [0, 1, 2],

    [3, 4, 5],

    [6, 7, 8],

    [0, 3, 6],

    [1, 4, 7],

    [2, 5, 8],

    [0, 4, 8],

    [2, 4, 6]

];


// ========================================
// 16. CHECK WINNER
// ========================================

function checkWinner() {

    for (
        let pattern of winningPatterns
    ) {

        const a = pattern[0];

        const b = pattern[1];

        const c = pattern[2];


        if (
            board[a] !== "" &&
            board[a] === board[b] &&
            board[a] === board[c]
        ) {

            return board[a];

        }

    }


    return null;

}


// ========================================
// 17. CHECK DRAW
// ========================================

function checkDraw() {

    return board.every(
        cell => cell !== ""
    );

}


// ========================================
// 18. GET EMPTY POSITIONS
// ========================================

function getEmptyPositions() {

    const emptyPositions = [];


    for (
        let i = 0;
        i < board.length;
        i++
    ) {

        if (board[i] === "") {

            emptyPositions.push(i);

        }

    }


    return emptyPositions;

}


// ========================================
// 19. MINIMAX + ALPHA-BETA
// ========================================

function minimax(
    isMaximizing,
    depth,
    alpha,
    beta
) {

    nodesExplored++;


    if (depth > maxDepthReached) {

        maxDepthReached = depth;

    }


    const winner = checkWinner();


    if (winner === aiPlayer) {

        return 10 - depth;

    }


    if (winner === humanPlayer) {

        return depth - 10;

    }


    if (checkDraw()) {

        return 0;

    }


    // ====================================
    // MAXIMIZING - AI
    // ====================================

    if (isMaximizing) {

        let bestScore = -Infinity;


        const emptyPositions =
            getEmptyPositions();


        for (
            let position of emptyPositions
        ) {

            board[position] =
                aiPlayer;


            const score =
                minimax(
                    false,
                    depth + 1,
                    alpha,
                    beta
                );


            // Backtracking
            board[position] = "";


            bestScore =
                Math.max(
                    bestScore,
                    score
                );


            alpha =
                Math.max(
                    alpha,
                    bestScore
                );


            // Alpha-Beta Pruning
            if (beta <= alpha) {

                prunedBranches++;

                break;

            }

        }


        return bestScore;

    }


    // ====================================
    // MINIMIZING - HUMAN
    // ====================================

    else {

        let bestScore = Infinity;


        const emptyPositions =
            getEmptyPositions();


        for (
            let position of emptyPositions
        ) {

            board[position] =
                humanPlayer;


            const score =
                minimax(
                    true,
                    depth + 1,
                    alpha,
                    beta
                );


            // Backtracking
            board[position] = "";


            bestScore =
                Math.min(
                    bestScore,
                    score
                );


            beta =
                Math.min(
                    beta,
                    bestScore
                );


            // Alpha-Beta Pruning
            if (beta <= alpha) {

                prunedBranches++;

                break;

            }

        }


        return bestScore;

    }

}


// ========================================
// 20. FIND BEST AI MOVE
// ========================================

function findBestMove() {

    nodesExplored = 0;

    maxDepthReached = 0;

    prunedBranches = 0;


    let bestScore = -Infinity;

    let bestMove = null;


    const emptyPositions =
        getEmptyPositions();


    for (
        let position of emptyPositions
    ) {

        board[position] =
            aiPlayer;


        const score =
            minimax(
                false,
                0,
                -Infinity,
                Infinity
            );


        // Backtracking
        board[position] = "";


        console.log(
            `Position ${position} → Score ${score}`
        );


        if (score > bestScore) {

            bestScore = score;

            bestMove = position;

        }

    }


    lastBestScore = bestScore;

    lastBestMove = bestMove;


    console.log(
        "Best Move:",
        bestMove
    );


    console.log(
        "Nodes Explored:",
        nodesExplored
    );


    console.log(
        "Maximum Depth:",
        maxDepthReached
    );


    console.log(
        "Pruned Branches:",
        prunedBranches
    );


    return bestMove;

}


// ========================================
// 21. LINEAR SEARCH
// ========================================

function searchMove(position) {

    for (
        let i = 0;
        i < gameHistory.length;
        i++
    ) {

        if (
            gameHistory[i].position ===
            position
        ) {

            return gameHistory[i];

        }

    }


    return null;

}


// ========================================
// 22. COUNT PLAYER POSITIONS
// ========================================

function countPlayerPosition(
    player,
    position
) {

    let count = 0;


    for (
        let i = 0;
        i < gameHistory.length;
        i++
    ) {

        if (
            gameHistory[i].player === player &&
            gameHistory[i].position === position
        ) {

            count++;

        }

    }


    return count;

}


// ========================================
// 23. STATUS MESSAGE
// ========================================

const statusMessage =
    document.createElement("h2");


statusMessage.textContent =
    "Player X's Turn";


statusMessage.style.marginTop =
    "25px";


statusMessage.style.color =
    "#9aa4d6";


document.querySelector(".board")
    .after(statusMessage);


// ========================================
// 24. NEW GAME BUTTON
// ========================================

const newGameButton =
    document.createElement("button");


newGameButton.textContent =
    "New Game";


newGameButton.style.marginTop =
    "20px";


newGameButton.style.padding =
    "12px 25px";


newGameButton.style.border =
    "none";


newGameButton.style.borderRadius =
    "8px";


newGameButton.style.background =
    "#2474c9";


newGameButton.style.color =
    "white";


newGameButton.style.fontSize =
    "16px";


newGameButton.style.cursor =
    "pointer";


statusMessage.after(
    newGameButton
);


// ========================================
// 25. UNDO BUTTON
// ========================================

const undoButton =
    document.createElement("button");


undoButton.textContent =
    "Undo";


undoButton.style.marginTop =
    "20px";


undoButton.style.marginLeft =
    "10px";


undoButton.style.padding =
    "12px 25px";


undoButton.style.border =
    "none";


undoButton.style.borderRadius =
    "8px";


undoButton.style.background =
    "#713cff";


undoButton.style.color =
    "white";


undoButton.style.fontSize =
    "16px";


undoButton.style.cursor =
    "pointer";


newGameButton.after(
    undoButton
);


// ========================================
// 26. SCOREBOARD
// ========================================

const scoreTitle =
    document.createElement("h3");


scoreTitle.textContent =
    "🏆 Scoreboard";


scoreTitle.style.marginTop =
    "30px";


scoreTitle.style.color =
    "white";


undoButton.after(
    scoreTitle
);


const scoreDisplay =
    document.createElement("div");


scoreDisplay.style.marginTop =
    "10px";


scoreDisplay.style.color =
    "#9aa4d6";


scoreTitle.after(
    scoreDisplay
);


// ========================================
// 27. UPDATE SCOREBOARD
// ========================================

function updateScoreboard() {

    scoreDisplay.innerHTML = `

        <p>
            ❌ X Wins:
            ${scoreMap.get("X")}
        </p>

        <p>
            ⭕ O Wins:
            ${scoreMap.get("O")}
        </p>

        <p>
            🤝 Draws:
            ${scoreMap.get("Draw")}
        </p>

    `;

}


// ========================================
// 28. AI STATISTICS
// ========================================

const statsTitle =
    document.createElement("h3");


statsTitle.textContent =
    "🤖 AI Statistics";


statsTitle.style.marginTop =
    "30px";


statsTitle.style.color =
    "white";


scoreDisplay.after(
    statsTitle
);


const statsDisplay =
    document.createElement("div");


statsDisplay.style.marginTop =
    "10px";


statsDisplay.style.color =
    "#9aa4d6";


statsTitle.after(
    statsDisplay
);


// ========================================
// 29. UPDATE AI STATISTICS
// ========================================

function updateStats() {

    statsDisplay.innerHTML = `

        <p>
            Nodes Explored:
            ${nodesExplored}
        </p>

        <p>
            Maximum Depth:
            ${maxDepthReached}
        </p>

        <p>
            Best Score:
            ${lastBestScore ?? "-"}
        </p>

        <p>
            Best Move:
            ${lastBestMove ?? "-"}
        </p>

        <p>
            Pruned Branches:
            ${prunedBranches}
        </p>

    `;

}


// ========================================
// 30. POSITION ANALYSIS
// ========================================

const analysisTitle =
    document.createElement("h3");


analysisTitle.textContent =
    "🔎 Move Analysis";


analysisTitle.style.marginTop =
    "30px";


analysisTitle.style.color =
    "white";


statsDisplay.after(
    analysisTitle
);


const analysisDisplay =
    document.createElement("div");


analysisDisplay.style.marginTop =
    "10px";


analysisDisplay.style.color =
    "#9aa4d6";


analysisTitle.after(
    analysisDisplay
);


// ========================================
// 31. UPDATE POSITION ANALYSIS
// ========================================

function updateAnalysis() {

    let html = "";


    for (
        let position = 0;
        position < 9;
        position++
    ) {

        const xCount =
            countPlayerPosition(
                "X",
                position
            );


        const oCount =
            countPlayerPosition(
                "O",
                position
            );


        if (
            xCount > 0 ||
            oCount > 0
        ) {

            html += `

                <p>
                    Position ${position} →
                    X: ${xCount},
                    O: ${oCount}
                </p>

            `;

        }

    }


    if (html === "") {

        html =
            "<p>No moves recorded yet.</p>";

    }


    analysisDisplay.innerHTML =
        html;

}


// ========================================
// 32. HISTORY TITLE
// ========================================

const historyTitle =
    document.createElement("h3");


historyTitle.textContent =
    "Game History";


historyTitle.style.marginTop =
    "30px";


historyTitle.style.color =
    "white";


analysisDisplay.after(
    historyTitle
);


// ========================================
// 33. HISTORY DISPLAY
// ========================================

const historyList =
    document.createElement("div");


historyList.style.marginTop =
    "10px";


historyList.style.color =
    "#9aa4d6";


historyTitle.after(
    historyList
);


// ========================================
// 34. DISPLAY HISTORY
// ========================================

function displayHistory() {

    historyList.innerHTML = "";


    gameHistory.forEach(
        (move, index) => {

            const historyItem =
                document.createElement("p");


            historyItem.textContent =
                `${index + 1}. Player ${move.player} → Position ${move.position}`;


            historyItem.style.margin =
                "5px 0";


            historyList.appendChild(
                historyItem
            );

        }
    );


    updateAnalysis();

    updateQueueDisplay();

}


// ========================================
// 35. QUEUE TITLE
// ========================================

const queueTitle =
    document.createElement("h3");


queueTitle.textContent =
    "📋 Move Queue (FIFO Event History)";


queueTitle.style.marginTop =
    "30px";


queueTitle.style.color =
    "white";


historyList.after(
    queueTitle
);


const queueDisplay =
    document.createElement("div");


queueDisplay.style.marginTop =
    "10px";


queueDisplay.style.color =
    "#9aa4d6";


queueTitle.after(
    queueDisplay
);


// ========================================
// 36. UPDATE QUEUE DISPLAY
// ========================================

function updateQueueDisplay() {

    if (
        moveQueue.isEmpty()
    ) {

        queueDisplay.innerHTML =
            "<p>Queue is empty.</p>";

        return;

    }


    const activeMoves =
        moveQueue.getElements();


    let html =
        "<p>Front → ";


    for (
        let i = 0;
        i < activeMoves.length;
        i++
    ) {

        const move =
            activeMoves[i];


        html +=
            `Player ${move.player}:Position ${move.position}`;


        if (
            i <
            activeMoves.length - 1
        ) {

            html += " → ";

        }

    }


    html += " ← Rear</p>";


    queueDisplay.innerHTML =
        html;

}


// ========================================
// 37. COMPLEXITY ANALYSIS
// ========================================

const complexityTitle =
    document.createElement("h3");


complexityTitle.textContent =
    "📊 DSA Complexity Analysis";


complexityTitle.style.marginTop =
    "30px";


complexityTitle.style.color =
    "white";


queueDisplay.after(
    complexityTitle
);


const complexityDisplay =
    document.createElement("div");


complexityDisplay.style.marginTop =
    "10px";


complexityDisplay.style.color =
    "#9aa4d6";


complexityDisplay.innerHTML = `

    <p>
        <strong>Array - Board:</strong>
        O(1) Time | O(1) Space
    </p>

    <p>
        <strong>Stack - Undo:</strong>
        O(1) Push/Pop | O(n) Space
    </p>

    <p>
        <strong>Queue - Move Order:</strong>
        O(1) Enqueue | O(1) Dequeue | O(n) Space
    </p>

    <p>
        <strong>Map - Scoreboard:</strong>
        O(1) Average Time | O(1) Space
    </p>

    <p>
        <strong>Linear Search - History:</strong>
        O(n) Time | O(1) Extra Space
    </p>

    <p>
        <strong>Minimax:</strong>
        O(b^d) Time | O(d) Recursion Space
    </p>

    <p>
        <strong>Alpha-Beta Pruning:</strong>
        O(b^d) Worst Case | O(d) Space
    </p>

    <p>
        <strong>Backtracking:</strong>
        O(b^d) State Exploration
    </p>

`;


// ========================================
// 38. CHECK GAME RESULT
// ========================================

function checkGameResult() {

    const winner =
        checkWinner();


    // Winner
    if (winner !== null) {

        gameOver = true;

        lastGameResult = winner;


        scoreMap.set(
            winner,
            scoreMap.get(winner) + 1
        );


        updateScoreboard();


        statusMessage.textContent =
            `🏆 Player ${winner} Wins!`;


        return true;

    }


    // Draw
    if (checkDraw()) {

        gameOver = true;

        lastGameResult = "Draw";


        scoreMap.set(
            "Draw",
            scoreMap.get("Draw") + 1
        );


        updateScoreboard();


        statusMessage.textContent =
            "🤝 It's a Draw!";


        return true;

    }


    return false;

}


// ========================================
// 39. HUMAN MOVE
// ========================================

cells.forEach(
    (cell, index) => {

        cell.addEventListener(
            "click",
            () => {

                if (gameOver) {

                    return;

                }


                if (
                    currentPlayer !==
                    humanPlayer
                ) {

                    return;

                }


                if (
                    board[index] !== ""
                ) {

                    return;

                }


                // Human move
                board[index] =
                    humanPlayer;


                cell.textContent =
                    humanPlayer;


                // Stack
                moveStack.push({

                    index: index,

                    player:
                        humanPlayer

                });


                // Queue
                moveQueue.enqueue({

                    position:
                        index,

                    player:
                        humanPlayer

                });


                // History
                gameHistory.push({

                    player:
                        humanPlayer,

                    position:
                        index

                });


                displayHistory();


                // Linear Search
                searchMove(index);


                console.log(
                    "Board:",
                    board
                );


                // Check result
                if (
                    checkGameResult()
                ) {

                    return;

                }


                // AI turn
                currentPlayer =
                    aiPlayer;


                statusMessage.textContent =
                    "🤖 AI is thinking...";


                // Cancel previous timer
                if (aiTimer !== null) {

                    clearTimeout(aiTimer);

                }


                aiTimer =
                    setTimeout(
                        makeAIMove,
                        300
                    );

            }
        );

    }
);


// ========================================
// 40. AI MOVE
// ========================================

function makeAIMove() {

    aiTimer = null;


    if (gameOver) {

        return;

    }


    if (
        currentPlayer !==
        aiPlayer
    ) {

        return;

    }


    const bestMove =
        findBestMove();


    updateStats();


    if (bestMove === null) {

        return;

    }


    // AI move
    board[bestMove] =
        aiPlayer;


    cells[bestMove].textContent =
        aiPlayer;


    // Stack
    moveStack.push({

        index:
            bestMove,

        player:
            aiPlayer

    });


    // Queue
    moveQueue.enqueue({

        position:
            bestMove,

        player:
            aiPlayer

    });


    // History
    gameHistory.push({

        player:
            aiPlayer,

        position:
            bestMove

    });


    displayHistory();


    console.log(
        "AI selected:",
        bestMove
    );


    // Check result
    if (
        checkGameResult()
    ) {

        return;

    }


    // Human turn
    currentPlayer =
        humanPlayer;


    statusMessage.textContent =
        "Player X's Turn";

}


// ========================================
// 41. UNDO
// ========================================

undoButton.addEventListener(
    "click",
    () => {

        // Cancel pending AI
        if (aiTimer !== null) {

            clearTimeout(aiTimer);

            aiTimer = null;

        }


        // If game already finished,
        // remove its scoreboard result.
        if (
            lastGameResult !== null
        ) {

            scoreMap.set(
                lastGameResult,
                scoreMap.get(
                    lastGameResult
                ) - 1
            );


            lastGameResult = null;

            updateScoreboard();

        }


        if (
            moveStack.isEmpty()
        ) {

            console.log(
                "Nothing to undo."
            );

            return;

        }


        // Remove AI move
        if (
            moveStack.size() > 0 &&
            moveStack.peek().player ===
            aiPlayer
        ) {

            const aiMove =
                moveStack.pop();


            board[aiMove.index] =
                "";


            cells[aiMove.index]
                .textContent = "";


            gameHistory.pop();

        }


        // Remove Human move
        if (
            moveStack.size() > 0 &&
            moveStack.peek().player ===
            humanPlayer
        ) {

            const humanMove =
                moveStack.pop();


            board[humanMove.index] =
                "";


            cells[humanMove.index]
                .textContent = "";


            gameHistory.pop();

        }


        gameOver = false;


        currentPlayer =
            humanPlayer;


        displayHistory();


        statusMessage.textContent =
            "Player X's Turn";


        console.log(
            "↩️ Undo completed."
        );

    }
);


// ========================================
// 42. NEW GAME
// ========================================

newGameButton.addEventListener(
    "click",
    () => {

        // Cancel pending AI
        if (aiTimer !== null) {

            clearTimeout(aiTimer);

            aiTimer = null;

        }


        board =
            Array(9).fill("");


        currentPlayer =
            humanPlayer;


        gameOver = false;


        lastGameResult = null;


        // Clear Stack
        moveStack.items = [];


        // Clear Queue
        moveQueue.clear();


        // Clear History
        gameHistory = [];


        // Reset AI statistics
        nodesExplored = 0;

        maxDepthReached = 0;

        lastBestScore = null;

        lastBestMove = null;

        prunedBranches = 0;


        // Clear Board
        cells.forEach(
            (cell) => {

                cell.textContent = "";

            }
        );


        displayHistory();


        updateStats();

        updateQueueDisplay();


        statusMessage.textContent =
            "Player X's Turn";


        console.log(
            "🔄 New Game Started"
        );

    }
);


// ========================================
// 43. INITIAL DISPLAY
// ========================================

updateScoreboard();

updateStats();

updateAnalysis();

updateQueueDisplay();


// ========================================
// 44. PROJECT START
// ========================================

console.log(
    "================================"
);

console.log(
    "TIC TAC TOE - DSA PROJECT"
);

console.log(
    "================================"
);

console.log(
    "Array → Board"
);

console.log(
    "Stack → Undo"
);

console.log(
    "Queue → Move Order"
);

console.log(
    "Optimized Queue → O(1) Dequeue"
);

console.log(
    "Map → Scoreboard"
);

console.log(
    "Linear Search → Move Analysis"
);

console.log(
    "Recursion → Minimax"
);

console.log(
    "Backtracking → Game States"
);

console.log(
    "Alpha-Beta → Search Optimization"
);

console.log(
    "Edge Cases → Tested"
);

console.log(
    "================================"
);