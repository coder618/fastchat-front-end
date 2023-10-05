import Gravatar from "react-gravatar";

function EachMessage({ messageObj }) {
    return (
        <div className="each-message">
            <div className="userImageCircle">
                <Gravatar email={messageObj.currentUserData.userEmail} />
            </div>
            <div className="name-and-date">
                <span className="name">{messageObj.currentUserData.userName}</span>
                <span className="time">{formatDate(messageObj.createdAt)}</span>{" "}
            </div>
            <span className="message">{messageObj.textMessage}</span>
        </div>
    );
}

export default EachMessage;

function formatDate(inputDate) {
    const months = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "July",
        "Aug",
        "Sept",
        "Oct",
        "Nov",
        "Dec",
    ];

    const date = new Date(inputDate);

    // Get day, month name, hours, and minutes
    const day = String(date.getDate()).padStart(2, "0");
    const monthName = months[date.getMonth()];
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const year = date.getFullYear().toString().substr(2, 2);

    // Format the date and time
    const formattedDate = `${day}-${monthName}-${year} ${hours}:${minutes} `;

    return formattedDate;
}
