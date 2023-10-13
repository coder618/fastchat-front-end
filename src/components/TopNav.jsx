export default function TopNav({ currentUserData, logout, isConnected }) {
    let userName = "";
    if (currentUserData) {
        userName = currentUserData.userName;
    }

    return (
        <>
            <div className="top-nav-wrapper">
                <nav className="top-nav ">
                    <div className="left-part">
                        <a href="#" className="branding">
                            FastChat <i className="bi bi-chat-quote"></i>
                        </a>
                        <div className="welcome-message">Welcome, {userName}</div>
                    </div>
                    <div className="right-part">
                        <div className="connection-status">
                            {isConnected ? (
                                <span className="connected badge bg-success">Connected</span>
                            ) : (
                                <div className="not-connected">
                                    <p>Backend booting up please wait 30-60s for first time load</p>

                                    <div className="badge bg-info">
                                        Connecting
                                        <img src={`loading.svg`} alt="loading" />
                                    </div>
                                </div>
                            )}
                        </div>

                        {isConnected ? (
                            <a
                                className="btn logout-btn"
                                href="#"
                                onClick={(e) => {
                                    e.preventDefault();
                                    logout();
                                }}
                            >
                                Logout
                            </a>
                        ) : (
                            ""
                        )}
                    </div>
                </nav>
            </div>

            <div className="on-mobile-status">
                <div className="left-part">
                    <div className="welcome-message">Welcome, {userName}</div>
                </div>
                <div className="right-part">
                    <div className="connection-status">
                        {isConnected ? (
                            <span className="connected badge bg-success">Connected</span>
                        ) : (
                            <div className="not-connected">
                                <p>Backend booting up please wait 30-60s for first time load</p>

                                <div className="badge bg-info">
                                    Connecting
                                    <img src={`loading.svg`} alt="loading" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}
