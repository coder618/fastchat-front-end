import { useEffect, useState } from "react";
import AddMessage from "./AddMessage";
import EachMessage from "./EachMessage";
import { v4 as uuid } from "uuid";

export default function ChatBox({ sendMessage, messageArray }) {
    useEffect(() => {
        const el = document.getElementById("all-messages-container");
        el.scrollTop = el.scrollHeight;
    }, [messageArray]);
    return (
        <div className="each-column chat-box">
            <div className="column-header">
                <h2>Group Message</h2>
            </div>

            <div className="column-content">
                <div className="all-messages" id="all-messages-container">
                    {messageArray.map((messageObj) => {
                        return (
                            <EachMessage data-id={uuid()} key={uuid()} messageObj={messageObj} />
                        );
                    })}
                </div>

                <AddMessage sendMessage={sendMessage} />
            </div>
        </div>
    );
}
