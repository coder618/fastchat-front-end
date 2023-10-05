import TopNav from "./components/TopNav";
import RoomList from "./components/RoomList";
import Footer from "./components/Footer";
import ChatBox from "./components/ChatBox";
import UserList from "./components/UserList";
import { useState, useEffect } from "react";
import LoginModal from "./components/LoginModal";
import socket from "./socket";
import { v4 as uuid } from "uuid";

import { getSavedUser, deleteUserFromLocalStorage } from "./helper/userHelperFunction";

export default function Home() {
    const [isConnected, setIsConnected] = useState(socket.connected);
    const [currentUserData, setUserData] = useState({});
    const [modalStatus, setModalStatus] = useState(false);
    const [currentRoom, setCurrentRoom] = useState("general");

    const [globalMessageArray, setGlobalMessageArray] = useState([]);
    const [filteredMessageArray, setFilteredMessageArray] = useState([]);

    // update filter message when messageArray change
    useEffect(() => {
        const output = [];
        for (let i = 0; i < globalMessageArray.length; i++) {
            const item = globalMessageArray[i];
            if (item.room == currentRoom) {
                output.push(item);
            }
        }
        setFilteredMessageArray(output);
    }, [globalMessageArray, currentRoom]);

    // send join status to server
    useEffect(() => {
        const socketId = socket.id;
        const toServerData = {
            currentUserObj: currentUserData,
            socketId: socketId,
        };

        // console.log("Join from client > ", toServerData);

        socket.timeout(5000).emit("join", toServerData);
    }, [currentUserData, isConnected]);

    // on initial load check if user data saved or not, if saved assign to CurrentUserData
    useEffect(() => {
        const savedUser = getSavedUser();
        // console.log("Saved user >> ", savedUser);
        if (savedUser) {
            setUserData(savedUser);

            setModalStatus(false);
        } else {
            setModalStatus(true);
        }
    }, []);

    // when User change room send "switch-room" event to server
    useEffect(() => {
        const serverData = { currentRoom, currentUserData, clientId: socket.id };
        socket.timeout(5000).emit("switch-room", serverData);
        // console.log("Switch room trigger from client to server", serverData, socket);
    }, [currentRoom, isConnected]);

    function logout() {
        deleteUserFromLocalStorage();
        setUserData({});
        setModalStatus(true);
    }

    // When Received message from server
    function messageSavedEventFromServer(responseObject) {
        // console.log("Response receive from server ", responseObject);
        setGlobalMessageArray(function (previousData) {
            return [...previousData, responseObject.messageObj];
        });
        // remove the disabled state and empty the value
        if (responseObject.clientId == socket.id) {
            document.getElementById("messageSubmitBtn").removeAttribute("disabled");
            document.getElementById("messageInput").value = "";
        }
    }

    function switchRoomSuccess(incomingObj) {
        // console.log("switchRoomSuccess trigger with >> ", incomingObj);
        setGlobalMessageArray(incomingObj.data);
    }

    // SOCKET IO EVENTS
    useEffect(() => {
        function onConnect() {
            setIsConnected(true);
        }

        function onDisconnect() {
            setIsConnected(false);
        }

        socket.on("connect", onConnect);
        socket.on("disconnect", onDisconnect);
        socket.on("message-saved", messageSavedEventFromServer);
        socket.on("switch-room-success", switchRoomSuccess);

        return () => {
            socket.off("connect", onConnect);
            socket.off("disconnect", onDisconnect);
            socket.off("switch-room-success", switchRoomSuccess);
            socket.off("message-saved", messageSavedEventFromServer);
        };
    }, []);

    // send message to Server
    function sendMessage(textMessage) {
        if (textMessage) {
            const messageObj = {
                messageId: uuid(),
                room: currentRoom,
                textMessage: textMessage,
                currentUserData: currentUserData,
                clientId: socket.id,
            };
            document.getElementById("messageSubmitBtn").setAttribute("disabled", true);
            socket.timeout(5000).emit("send-message", messageObj);
        } else {
            alert("No input message");
        }

        // remove the disable state after 5 second if noting happen
        setTimeout(() => {
            document.getElementById("messageSubmitBtn").removeAttribute("disabled");
        }, 5000);
    }

    return (
        <>
            <TopNav isConnected={isConnected} currentUserData={currentUserData} logout={logout} />

            <div className="container-fluid">
                <div className="main-columns-container">
                    <RoomList setCurrentRoom={setCurrentRoom} currentRoom={currentRoom} />
                    <ChatBox
                        messageArray={filteredMessageArray}
                        sendMessage={sendMessage}
                        currentUserData={currentUserData}
                    />
                    <UserList filteredMessageArray={filteredMessageArray} />
                </div>
            </div>
            <Footer />
            <LoginModal
                modalStatus={modalStatus}
                setModalStatus={setModalStatus}
                setUserData={setUserData}
            />
        </>
    );
}
