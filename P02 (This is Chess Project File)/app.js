const express = require('express');
const socket = require('socket.io');
const path = require('path');
const http = require('http');
const {Chess} = require('chess.js');

const app = express();

const server = http.createServer(app);
const io = socket(server);

const chess = new Chess();
let players = {};
let currentPlayer = "w";

app.set("view engine","ejs");
app.use(express.static(path.join(__dirname,"public")));

app.get("/",(req,res)=>{
    res.render("index",{title:"Chess game by Ismail"});
})
io.on("connection",function(uniquesocket){
    console.log("connection is established two server")
    // we declare Players in Players const
    if(!players.white){
        players.white = uniquesocket.id;
        uniquesocket.emit("playerRole","w");
    }else if(!players.black){
        players.black = uniquesocket.id;
        uniquesocket.emit("playerRole","b");
    }else{
        uniquesocket.emit("spectatorRole");
    }
    uniquesocket.on("disconnect",function(){
        if(uniquesocket.id ===  players.white){
            delete players.white;
        }else if(uniquesocket.id === players.black){
            delete players.black;
        }
    })
    // uniquesocket.on("churan",function(){
    //     // console.log("churan received");
    //     io.emit("churan paapdi");
    // })
    uniquesocket.on("move",(move)=>{
        try{
            //check valid Players turn
            if(chess.turn() === "w" && uniquesocket.id !== players.white) return ;
            if(chess.turn() === "b" && uniquesocket.id !== players.black) return ;

            const result = chess.move(move);

            if(result){
                //current Player turn
                currentPlayer = chess.turn();
                io.emit("move",move);
                io.emit("boardState",chess.fen());
            }else{
                console.log("Invalid move : ",move);
                uniquesocket.emit("invalidMove",move);
            }
        }
        catch(err){
            console.log(err);
            uniquesocket.emit("Invalid Move : ", move);
        }
    })
})

server.listen(3000,function(){
    console.log("Server running on 3000");
})