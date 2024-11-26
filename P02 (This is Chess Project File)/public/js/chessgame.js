const socket = io();
const chess = new Chess();
const boardElement = document.querySelector(".chessboard");

let dragggedPiece = null;
let sourceSquare = null;
let playerRole = null;

const renderBoard = () => {
    const board = chess.board();
    boardElement.innerHTML = "";
    board.forEach((row,rowIndex)=>{
        row.forEach((square,squareindex)=>{
            //Here we are givng square colour and add div
            const squareElement = document.createElement("div");
            squareElement.classList.add(
                "square",(rowIndex+squareindex)%2 === 0 ?"light":"dark"
            );

            squareElement.dataset.row = rowIndex;
            squareElement.dataset.col = squareindex;

            
            if(square){
                //Every Element colour 
                const pieceElement = document.createElement("div");
                pieceElement.innerText = getPieceUnicode(square); // Set the piece Unicode

                // Add the corresponding class for piece color
                if (square.color === "w") {
                    pieceElement.classList.add("piece", "white");
                } else {
                    pieceElement.classList.add("piece", "black");
                }

                pieceElement.draggable = playerRole === square.color;

                // we dragging the element
                pieceElement.addEventListener("dragstart",(e)=>{
                    if(pieceElement.draggable){
                        dragggedPiece = pieceElement;
                        sourceSquare = {row: rowIndex,col: squareindex};
                        e.dataTransfer.setData("text/plain","");
                    }
                });

                pieceElement.addEventListener("dragend",(e)=>{
                    dragggedPiece = null;
                    sourceSquare = null;
                });

                squareElement.appendChild(pieceElement);
            };

            squareElement.addEventListener("dragover",function(e){
                e.preventDefault();
            });

            squareElement.addEventListener("drop",function(e){
                e.preventDefault();
                if(dragggedPiece){
                    const targetSource = {
                        row: parseInt(squareElement.dataset.row),
                        col: parseInt(squareElement.dataset.col),
                    };
                    handleover(sourceSquare,targetSource);
                }
            });
            boardElement.appendChild(squareElement)
        });
    });

    if(playerRole === "b"){
        boardElement.classList.add("flipped");
    }else{
        boardElement.classList.remove("flipped");
    }
};
const getPieceUnicode = (p) => {
    const unicodePieces = {
        p: '⬤',  // Black Pawn
        r: '♜',  // Black Rook
        n: '♞',  // Black Knight
        b: '♝',  // Black Bishop
        q: '♛',  // Black Queen
        k: '♚',  // Black King
        P: '♙',  // White Pawn
        R: '♖',  // White Rook
        N: '♘',  // White Knight
        B: '♗',  // White Bishop
        Q: '♕',  // White Queen
        K: '♔'   // White King
    };
    return unicodePieces[p.type] || "";
}
const handleover = (source , target) =>{
    const move = {
        from:`${String.fromCharCode(97 + source.col)}${8-source.row}`,
        to:`${String.fromCharCode(97 + target.col)}${8-target.row}`,
        promotion:"q",
    };
    socket.emit("move",move);
}

socket.on("playerRole",function(role){
    playerRole = role;
    renderBoard();
})
socket.on("spectatorRole",function(){
    playerRole = null;
    renderBoard();
})
socket.on("boardState",function(fen){
    chess.load(fen);
    renderBoard();
})
socket.on("move",function(move){
    chess.move(move);
    renderBoard();
})


renderBoard();

// socket.emit("churan");
// socket.on("churan paapdi",function(){
//     console.log("churan paapdi received")
// })
