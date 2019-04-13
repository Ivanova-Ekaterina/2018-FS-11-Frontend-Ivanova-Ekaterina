const WebSocketServer = require('ws').Server;

const wss = new WebSocketServer({
        port: 8080
});
console.log("start");
wss.on('connection', ws => {
    console.log("connection");
    ws.on('message', message =>  {
        const mes = JSON.parse(message);
        console.log('received: %s', message);
        if (mes.chat === "1")
            mes.chat = "2";
        else
            mes.chat = "1";
        ws.send(JSON.stringify({data: mes.data, chat: mes.chat, emojiList: mes.emojiList}));
    });
    ws.send(JSON.stringify({data:"Доброе утро!", chat: "1", emojiList: []}));
});