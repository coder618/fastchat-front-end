import { savedUserToLocalStorage } from "../helper/userHelperFunction";

export default function LoginModal({ modalStatus, setUserData, setModalStatus }) {
    let modalVisibilityClass = "";

    if (modalStatus == true) {
        modalVisibilityClass = "d-block";
    } else {
        modalVisibilityClass = "d-none";
    }

    function onSubmit() {
        const userName = document.getElementById("user-name").value;
        const userEmail = document.getElementById("user-email").value;

        if (userName && userEmail) {
            savedUserToLocalStorage(userName, userEmail);
            setUserData({
                userName,
                userEmail,
            });
            setModalStatus(false);
        } else {
            alert("Please provide User name and email!");
        }
    }

    return (
        <>
            <div className={`small-modal-wrapper ${modalVisibilityClass}`}>
                <div className="small-modal filter-modal">
                    <div className="modal-heading">
                        <h2>Introduce yourself</h2>
                        {/* <button
                            className="btn btn-close"
                            type="button"
                            onClick={() => {
                                setModalStatus(false);
                            }}
                        ></button> */}
                    </div>

                    <div className="modal-content">
                        <form
                            action="#"
                            id="feedback-filter-form"
                            onSubmit={(e) => {
                                e.preventDefault();
                                onSubmit();
                            }}
                        >
                            <div className="each-form-field-group">
                                <label htmlFor="user-name">Name</label>
                                <input
                                    type="text"
                                    className="form-control"
                                    required
                                    id="user-name"
                                />
                            </div>
                            <div className="each-form-field-group">
                                <label htmlFor="user-email">Email</label>
                                <input
                                    type="email"
                                    className="form-control"
                                    required
                                    id="user-email"
                                />
                            </div>

                            <div className="btn-wrapper mt-4">
                                <button className="btn btn-primary ">Join</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    );
}

// CreateProject.propTypes = {
//     modalStatus: PropTypes.bool.isRequired, // Assuming modalStatus is a boolean prop
//     setModalStatus: PropTypes.object.isRequired, // Assuming modalStatus is a boolean prop
// };
