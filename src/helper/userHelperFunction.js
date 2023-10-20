// This function will return user name and email from saved data
function getSavedUser() {
    let output = {};

    const userName = localStorage.getItem("quickChatUserName");
    const userEmail = localStorage.getItem("quickChatUserEmail");

    if (userName && userEmail) {
        output = {
            userName,
            userEmail,
        };
    }
    return output;
}

// This function will save user to localStorage
function savedUserToLocalStorage(userName, userEmail) {
    localStorage.setItem("quickChatUserName", userName);
    localStorage.setItem("quickChatUserEmail", userEmail);
    return true;
}

function deleteUserFromLocalStorage() {
    localStorage.setItem("quickChatUserName", false);
    localStorage.setItem("quickChatUserEmail", false);
    return true;
}

export { getSavedUser, savedUserToLocalStorage, deleteUserFromLocalStorage };
