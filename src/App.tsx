import React, {useCallback, useEffect, useState} from 'react';
import './App.css';
import AudioWebSocketConnection, {EventType, WebsocketMessage} from "./util/AudioSocket";
import "./style.css";
import CONFIG from "./config.music_sync";
import {VolumeUp} from "@mui/icons-material";

function App() {
    const [songName, setSongName] = useState<string | number>("");
    const [albumName, setAlbumName] = useState<string | number>("");
    const [artist, setArtist] = useState<string | number>("");
    const [albumCover, setAlbumCover] = useState<string | number>("");
    const [volume, setVolume] = useState<string | number>(0);
    const callbacks = {
        "songName": setSongName,
        "albumCover": setAlbumCover,
        "albumName": setAlbumName,
        "artist": setArtist,
        "volume": setVolume
    };

    document.title = "Audio Listener";

    const messageCallback = useCallback((message: WebsocketMessage) => {
        callbacks[message.type](message.value);
    }, []);

    useEffect(() => {
        let currentUrl = CONFIG.WEBSOCKET_URL;
        AudioWebSocketConnection(
            currentUrl,
            messageCallback
        );
    }, []);

    return (
        <div className="app">
            <div className="songInfos">
                <h3 className={"headline"}>{songName} - {artist}</h3>
                <h3 className={"album"}>{albumName}</h3>
            </div>
            <div className="image" style={{backgroundImage: "url(" + albumCover as string + ")"}}/>
            <div className="volume">
                <VolumeUp/>
                <div className={"volumeBarOuter"}>
                    <div className={"volumeBarInner"} style={{width: volume + "%"}}/>
                </div>
                <div>{volume}%</div>
            </div>
        </div>
    );
}

export default App;
