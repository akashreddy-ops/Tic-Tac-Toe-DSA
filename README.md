# 🎮 Tic Tac Toe — DSA Based AI Game

> A DSA-focused Tic Tac Toe game built to demonstrate the practical implementation of Data Structures and Algorithms through an interactive AI-powered game.

---

## ✨ Features

- 🎮 Interactive 3×3 Tic Tac Toe Board
- 🤖 AI Opponent using Minimax
- ✂️ Alpha-Beta Pruning Optimization
- ↩️ Undo Functionality using Stack
- 🏆 Scoreboard using Map
- 📋 FIFO Move Queue
- 📜 Game History
- 🔎 Linear Search based Move Analysis
- 📊 AI Search Statistics
- 🧠 DSA Complexity Analysis
- 🧪 Edge-Case Handling
- 📱 Responsive User Interface

---

## 🧠 DSA Concepts Used

| DSA / Algorithm | Application |
|---|---|
| 📦 Array | Represents the 3×3 game board |
| 📚 Stack | Handles Undo operations |
| 📋 Queue | Tracks moves using FIFO |
| 🗺️ Map | Maintains player scores |
| 🔎 Linear Search | Searches game history |
| 🔄 Recursion | Explores possible game states |
| ↩️ Backtracking | Restores temporary board states |
| 🤖 Minimax | Determines the AI's optimal move |
| ✂️ Alpha-Beta Pruning | Eliminates unnecessary game-tree branches |

---

## 🤖 AI — Minimax Algorithm

The AI uses the **Minimax algorithm** to determine the best possible move.

### 🔄 How It Works

```text
Human Move
     ↓
AI Considers Available Moves
     ↓
Minimax Explores Future States
     ↓
Evaluate Win / Loss / Draw
     ↓
Backtracking
     ↓

```

# 🎯 Evaluation
```
AI Win     → Positive Score
Human Win  → Negative Score
Draw       → 0
```

Depth-based scoring allows the AI to prefer faster victories and delay losses.

# ✂️ Alpha-Beta Pruning

Minimax can evaluate many unnecessary game-tree branches.

To improve the search, this project uses Alpha-Beta Pruning.
```
Alpha = Best score Maximizer can guarantee

Beta = Best score Minimizer can guarantee

Prune when:

Beta <= Alpha
```
This allows the algorithm to skip branches that cannot affect the final decision.
# ⏱️ Complexity
```
Minimax:
O(b^d)

Alpha-Beta:
O(b^d) Worst Case

Best Case:
Approximately O(b^(d/2))
with good move ordering
```
Where:

b = branching factor
d = search depth

# ↩️ Undo Using Stack
The game uses a Stack to implement Undo functionality.

Stack follows:
```
LIFO
Last In → First Out

Move 1
Move 2
Move 3  ← Undo
          ↓
        Removed
```
The latest move is removed first using the Stack's pop() operation.

# 📋 Queue — FIFO Move Tracking
A Queue is used to track move events in insertion order.
```
FIFO
First In → First Out
```
The implementation uses a frontIndex instead of JavaScript's shift() method.

Therefore:
```
Enqueue → O(1)

Dequeue → O(1)
```
This avoids shifting the remaining array elements during dequeue.
# 🗺️ Map — Scoreboard

JavaScript's Map is used to maintain the game scoreboard.
scoreMap.set("X", 0);
scoreMap.set("O", 0);
scoreMap.set("Draw", 0);

Average lookup and update complexity:
```
O(1)
```
#🔎 Linear Search — Move Analysis

The project uses Linear Search to search through the recorded game history.

The algorithm checks each move sequentially.
```
Best Case  → O(1)

Worst Case → O(n)
```
# 🔄 Recursion & Backtracking

Recursion is used by Minimax to explore future game states.

Backtracking restores the board after temporarily testing a move.
```
Make Move
    ↓
Explore State
    ↓
Recursive Call
    ↓
Evaluate Result
    ↓
Undo Move
    ↓
Try Next Move
```
This allows the AI to explore multiple possible game scenarios.

# 📊 AI Statistics

The game displays information about the AI's search process:

🔢 Nodes Explored
📏 Maximum Search Depth
🎯 Best Score
📍 Best Move
✂️ Pruned Branches

These statistics help visualize how the AI searches the game tree.

# 📊 Complexity Analysis
Component	Time Complexity	Space Complexity
📦 Array — Board	O(1)	O(1)
📚 Stack Push/Pop	O(1)	O(n)
📋 Queue Enqueue	O(1)	O(n)
📋 Queue Dequeue	O(1)	O(n)
🗺️ Map Operations	O(1) Average	O(1)
🔎 Linear Search	O(n)	O(1) Extra
🤖 Minimax	O(b^d)	O(d)
✂️ Alpha-Beta Pruning	O(b^d) Worst Case	O(d)
↩️ Backtracking	O(b^d) State Exploration	O(d)

# 🛠️ Technologies Used
```
HTML5
CSS3
JavaScript
Data Structures & Algorithms
```
# 📂 Project Structure
```
Tic-Tac-Toe-DSA/
│
├── 📄 index.html
├── 📜 script.js
└── 📘 README.md
```
# ▶️ How to Run
1️⃣ Clone the Repository
```
git clone YOUR_REPOSITORY_URL
```
# 2️⃣ Open the Project

Open the project folder in VS Code.

3️⃣ Run the Game

Open:
 ```
index.html
```
in your browser.

You can also use the Live Server extension in VS Code.

# 🎯 Project Objective

The objective of this project is to demonstrate how theoretical Data Structures and Algorithms can be applied to build a practical interactive application.

Instead of implementing DSA concepts as isolated programs, this project integrates multiple concepts into one complete game.

# 💼 Placement & Interview Value

This project demonstrates practical understanding of:

📚 Data Structures
⚡ Algorithms
🔄 Recursion
↩️ Backtracking
🌳 Game Trees
🤖 Minimax
✂️ Alpha-Beta Pruning
🚀 Algorithm Optimization
📊 Time & Space Complexity
💻 JavaScript
🧩 Problem Solving

# 💡 Key Learning

This project helped me understand how multiple Data Structures and Algorithms can work together to solve a practical problem and build an intelligent game.

# 👨‍💻 Author
Akash Reddy Danapana

🎓 B.Tech CSE / AI & ML

