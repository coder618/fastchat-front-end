export default function AddMessage({ sendMessage }) {
    function submitForm(e) {
        const msg = document.getElementById("messageInput").value;
        if (msg) {
            sendMessage(msg);
        }
    }

    return (
        <form
            action="#"
            className="add-message"
            method="post"
            autoComplete="off"
            onSubmit={(e) => {
                e.preventDefault();
                submitForm();
            }}
        >
            <div className="fields">
                <input
                    name="detail"
                    type="text"
                    className="form-control"
                    id="messageInput"
                    autoComplete="off"
                    placeholder="Type your message here"
                />

                <button className="btn btn-primary" type="submit" id="messageSubmitBtn">
                    <i className="bi bi-send-fill"></i>
                    <img src={`loading.svg`} alt="loading" />
                </button>
            </div>
        </form>
    );
}
