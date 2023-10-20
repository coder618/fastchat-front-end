import { useEffect, useState } from "react";
import Gravatar from "react-gravatar";

export default function UserList({ filteredMessageArray }) {
    // console.log(currentRoomUserList.length);

    const [userArray, setUserArray] = useState([]);

    useEffect(() => {
        const output = [];

        const reversedArray = filteredMessageArray.reverse();

        for (let i = 0; i < reversedArray.length; i++) {
            const currentMessage = reversedArray[i];
            const userEmail = currentMessage.currentUserData.userEmail;
            const userName = currentMessage.currentUserData.userName;

            let userAdded = false;

            for (let j = 0; j < output.length; j++) {
                const ignoreUserObj = output[j];
                if (ignoreUserObj.email == userEmail) {
                    userAdded = true;
                }
            }
            if (userAdded == false) {
                output.push({
                    id: currentMessage._id,
                    time: currentMessage.createdAt,
                    name: userName,
                    email: userEmail,
                });
            }
        }

        // console.log(output);
        setUserArray(output);
    }, [filteredMessageArray]);
    return (
        <div className="each-column user-list">
            <div className="column-header">
                <h2>User History</h2>
            </div>

            <div className="column-content">
                {userArray.map((item) => {
                    return (
                        <>
                            <div className="each-user" key={item.email}>
                                <Gravatar email={item.email} />
                                <div>
                                    <p className="name">{item.name}</p>
                                    <p className="email">{item.email}</p>
                                </div>
                                <div className="last-seen">{formatDate(item.time)}</div>
                            </div>
                        </>
                    );
                })}
                {userArray.length == 0 ? (
                    <div className="alert alert-info">No user activity</div>
                ) : (
                    ""
                )}
            </div>
        </div>
    );
}

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

    // Format the date and time
    const formattedDate = `${day}-${monthName} ${hours}:${minutes}`;

    return formattedDate;
}
