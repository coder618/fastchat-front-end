export default function RoomList({ currentRoom, setCurrentRoom }) {
    return (
        <div className="each-column room-list">
            <div className="column-header">
                <h2>Chat rooms</h2>
            </div>

            <div className="column-content">
                <a
                    href="#"
                    className={currentRoom == "general" ? "active" : ""}
                    onClick={(e) => {
                        e.preventDefault();
                        setCurrentRoom("general");
                    }}
                >
                    <div>#General</div>
                    <div>Perfect place to meet with community</div>
                </a>
                <a
                    href="#"
                    className={currentRoom == "developer" ? "active" : ""}
                    onClick={(e) => {
                        e.preventDefault();
                        setCurrentRoom("developer");
                    }}
                >
                    <div>#Developer Hub</div>
                    <div>Developer communication</div>
                </a>
                <a
                    href="#"
                    className={currentRoom == "designer" ? "active" : ""}
                    onClick={(e) => {
                        e.preventDefault();
                        setCurrentRoom("designer");
                    }}
                >
                    <div>#Designer Hub</div>
                    <div>UI/UX related discussion</div>
                </a>

                <a
                    href="#"
                    className={currentRoom == "off-topic" ? "active" : ""}
                    onClick={(e) => {
                        e.preventDefault();
                        setCurrentRoom("off-topic");
                    }}
                >
                    <div>#Off-topic </div>
                    <div>Talk about anything</div>
                </a>
            </div>
        </div>
    );
}
