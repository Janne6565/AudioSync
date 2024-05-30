export type EventType = "songName" | "albumName" | "albumCover" | "artist" | "volume";

export interface WebsocketMessage {
    type: EventType;
    value: string | number;
}

function AudioSocket(url: string, messageCallback: Function) {

    let socket: WebSocket | null = null;
    const connect = () => {
        socket = new WebSocket(url);

        socket.addEventListener("open", event => {
            console.log("Socket connected");
        })

        socket.addEventListener("message", event => {
            const parsed = JSON.parse(event.data);
            messageCallback(parsed as WebsocketMessage);
        })

        socket.addEventListener("close", (evt) => {
            console.log("Websocket closed", evt);
            connect();
        })
    };
    connect();
}

export default AudioSocket;
