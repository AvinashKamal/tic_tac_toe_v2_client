import io, {Socket} from "socket.io-client";
import { v4 as uuid_v4 } from 'uuid';
import { createInterface } from 'readline';

let inputArgs = process.argv.splice(2)
let port: number | string;
port = inputArgs[0] || '8999';
const socket : Socket = io(`http://localhost:${port}`);
let roomId : string = "";
let playerName : string = inputArgs[1]

socket.on("connect", () => {
    console.log("Socket id ", socket.id)

    let rdLine = createInterface({
        input: process.stdin,
        output: process.stdout
    })
    rdLine.setPrompt(`You have been connected to the server. What would you like to do ${playerName} (Choose an option):\n\t1. Create a new game\n\t2. Join a game\n\t3. Spectate a game\n`)
    rdLine.prompt()

    rdLine.on('line', (input) => {

        if(input === "1") {
            roomId = uuid_v4().split("-")[0];
            socket.emit("join room", {roomId, name: playerName, symbol: 'X'})
            // socket.on('wait for player', (output) => {
            //     console.log(output.message)
            // })
        } else if(input === "2") {
            rdLine.question(`Hi ${playerName}. Enter the roomId of the game you want to join: `,(input) => {
                socket.emit("join room", {roomId: input, name: playerName, symbol: 'O'})
            })


        } else if(input === "3") {
            //SPECTATE A GAME
        } else {
            console.log("Please choose an option between 1 and 3")
            rdLine.prompt();
        }
        // switch (input) {
        //     case "1" :
        //         //CREATE A GAME
        //         roomId = uuid_v4().split("-")[0];
        //         socket.emit("join room", {roomId, name: playerName})
        //         socket.on('wait for player', (output) => {
        //             console.log(output.message)
        //             if(output.roomMembers && output.roomMembers ===2) {
        //                 socket.on('start game', (output) => {
        //                     console.log(output.message, " ", output.userInfo)
        //                 })
        //             }
        //         })
        //         break;
        //
        //     case "2" :
        //         //JOIN AN EXISTING GAME
        //         console.log("Inside join a game.")
        //         rdLine.question(`Hi ${playerName}. Enter the roomId of the game you want to join: `,(input) => {
        //             socket.emit("join room", {roomId: input, name: playerName})
        //         })
        //         socket.on('start game', (output) => {
        //             console.log(output.message, " ", output.userInfo)
        //         })
        //         break;
        //     case "3" :
        //         //SPECTATE A GAME
        //         console.log("Inside spectate a game.")
        //         break;
        //     default :
        //         console.log("Please choose an option between 1 and 3")
        //         rdLine.prompt()
        // }

        socket.on("start game", (args) => {
            console.log("Args ", args)
        })
    })




})






