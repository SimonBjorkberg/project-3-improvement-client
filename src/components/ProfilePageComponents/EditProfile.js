import { useContext, useState } from "react";
import profileService from "../../services/profile.service";
import { AuthContext } from "../../context/auth.context";
import scrollToTop from "../../utils/ScrollToTop";

const EditProfile = ({ foundUser, setFoundUser, setSuccessMessage }) => {
  const { setUserInfo, loggedInUser } = useContext(AuthContext);
  const [image, setImage] = useState();
  const [editUsername, setEditUsername] = useState(foundUser?.username);
  const [errorUsername, setErrorUsername] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [repeatNewPassword, setRepeatNewPassword] = useState("");

  const appendImage = (e) => {
    const formData = new FormData();
    formData.append("imageUrl", e.target.files[0]);
    setImage(formData);
  };

  const handleImageSubmit = async (e) => {
    e.preventDefault();
    const response = await profileService.uploadImage(image);
    const userResponse = await profileService.editImage(
      loggedInUser._id,
      response.data.fileUrl
    );
    if (!image) {
      return
    }
    setFoundUser((user) => ({ ...user, image: userResponse.data.image }));
    setUserInfo((userInfo) => ({
      ...userInfo,
      image: userResponse.data.image,
    }));
    setSuccessMessage("Avatar Changed");
    window.my_modal_3.close();
    scrollToTop();
  };

  const handleUsernameChange = (e) => {
    e.preventDefault();

    if (editUsername.length < 6) {
      return setErrorUsername("Username has to be at least 8 characters long");
    }

    profileService
      .editInfo(foundUser._id, { username: editUsername, password: null })
      .then((response) => {
        if (response.data.username) {
          setFoundUser({ ...foundUser, username: response.data.username });
        } else {
          return setErrorUsername(response.data.message);
        }
        window.my_modal_3.close();
        setErrorUsername("");
        setSuccessMessage("Username Changed");
        scrollToTop();
      })
      .catch((err) => console.log(err));
  };

  const handlePasswordChange = (e) => {
    e.preventDefault();
    if (currentPassword === "") {
      return setErrorPassword("You must provide your current password");
    } else if (newPassword === "") {
      return setErrorPassword("You must provide a new password");
    } else if (repeatNewPassword === "") {
      return setErrorPassword("You must repeat your new password");
    } else if (repeatNewPassword !== newPassword) {
      return setErrorPassword("New password does not match");
    } else {
      profileService
        .editInfo(foundUser._id, {
          password: newPassword,
          currentPassword,
        })
        .then((response) => {
          if (response.data.errorMessage) {
            return setErrorPassword(response.data.errorMessage);
          } else {
            window.my_modal_3.close();
            setSuccessMessage("Password Changed");
            setErrorPassword("");
          }
        })
        .catch((err) => console.log(err));
    }
  };

  return (
    <div className="absolute md:right-[69px] md:top-[120px] right-4 top-[90px] z-20">
      <div>
        <button
          onClick={() => window.my_modal_3.showModal()}
          className="text-lg flex flex-row hover:opacity-50"
        >
          Edit Profile
          <svg
            width="18px"
            height="18px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="my-auto ml-2"
          >
            <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
            <g
              id="SVGRepo_tracerCarrier"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></g>
            <g id="SVGRepo_iconCarrier">
              {" "}
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20.8477 1.87868C19.6761 0.707109 17.7766 0.707105 16.605 1.87868L2.44744 16.0363C2.02864 16.4551 1.74317 16.9885 1.62702 17.5692L1.03995 20.5046C0.760062 21.904 1.9939 23.1379 3.39334 22.858L6.32868 22.2709C6.90945 22.1548 7.44285 21.8693 7.86165 21.4505L22.0192 7.29289C23.1908 6.12132 23.1908 4.22183 22.0192 3.05025L20.8477 1.87868ZM18.0192 3.29289C18.4098 2.90237 19.0429 2.90237 19.4335 3.29289L20.605 4.46447C20.9956 4.85499 20.9956 5.48815 20.605 5.87868L17.9334 8.55027L15.3477 5.96448L18.0192 3.29289ZM13.9334 7.3787L3.86165 17.4505C3.72205 17.5901 3.6269 17.7679 3.58818 17.9615L3.00111 20.8968L5.93645 20.3097C6.13004 20.271 6.30784 20.1759 6.44744 20.0363L16.5192 9.96448L13.9334 7.3787Z"
                fill="#0F0F0F"
              ></path>{" "}
            </g>
          </svg>
        </button>
      </div>
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box rounded-md max-w-[500px] p-0">
          <form method="dialog">
            <button
              onClick={() => {
                window.my_modal_3.close();
                setErrorPassword("");
                setErrorUsername("");
              }}
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2 text-white"
            >
              ✕
            </button>
          </form>
          <h3 className="font-bold text-lg bg-neutral text-neutral-300 p-3">
            Change Avatar
          </h3>
          <div className="flex md:flex-row flex-col p-4">
            <div className="avatar md:mx-0 mx-auto">
              <div className="w-32 h-32 shadow-xl rounded-full border-black border-2">
                <img src={foundUser.image} alt="" />
              </div>
            </div>
            <form
              onSubmit={handleImageSubmit}
              className="my-auto flex flex-col w-full"
            >
              <input
                type="file"
                className="w-60 mx-auto file-input file-input-bordered file-input-xs rounded-sm mb-2 mt-4 md:mt-0"
                onChange={appendImage}
              />
              <button className="py-1 bg-neutral px-2 w-20 text-white font-semibold rounded-sm ml-auto mx-auto md:mr-[50px]">
                Save
              </button>
            </form>
          </div>
          <p className="text-[10px] text-left px-4 pb-4 mt-[-15px]">
            By proceeding, you agree to give us access to the image you choose
            to upload. Please make sure you have the right to upload the image.
          </p>
          <h3 className="font-bold text-lg bg-neutral text-neutral-300 p-3">
            Edit Profile
          </h3>
          <form
            onSubmit={handleUsernameChange}
            className="flex flex-col max-w-[400px] mx-auto"
          >
            <label className="text-left font-semibold ml-1 mt-2">
              Username:
            </label>
            <input
              className="p-2 focus:outline-none border mt-2"
              type="text"
              name="username"
              value={editUsername}
              onChange={(e) => setEditUsername(e.target.value)}
            />
            {errorUsername && (
              <p className="text-red-500 text-sm">{errorUsername}</p>
            )}
            <button className="text-neutral p-2 border-2 border-neutral hover:bg-neutral-100 mt-2">
              Change Username
            </button>
          </form>
          <form
            onSubmit={handlePasswordChange}
            className="flex flex-col max-w-[400px] mx-auto md:pb-10"
          >
            <label className="text-left font-semibold ml-1 mt-2">
              Current Password:
            </label>
            <input
              autoComplete="off"
              className="p-2 focus:outline-none border"
              type="password"
              name="newPassword"
              placeholder="Current Password..."
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <label className="text-left font-semibold ml-1 mt-2">
              New Password:
            </label>
            <input
              className="p-2 focus:outline-none border"
              type="password"
              name="newPassword"
              placeholder="New Password..."
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <label className="text-left font-semibold ml-1 mt-2">
              Repeat New Password:
            </label>
            <input
              className="p-2 focus:outline-none border"
              type="password"
              name="repeatNewPassword"
              placeholder="Repeat New Password..."
              onChange={(e) => setRepeatNewPassword(e.target.value)}
            />
            {errorPassword && (
              <p className="text-red-500 text-sm">{errorPassword}</p>
            )}
            <button className="text-neutral p-2 border-2 border-neutral hover:bg-neutral-100 mt-2">
              Change Password
            </button>
          </form>
        </div>
      </dialog>
    </div>
  );
};

export default EditProfile;
