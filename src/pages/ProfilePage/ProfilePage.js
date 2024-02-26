import { useContext, useEffect, useState } from "react";
import { ChatContext } from "../../context/chat.context";
import { AuthContext } from "../../context/auth.context";
import { useParams } from "react-router-dom";
import profileService from "../../services/profile.service";
import Loading from "../../components/Loading/Loading";
import Products from "../../components/ProfilePageComponents/ProductsComponents/Products";
import ProfileList from "../../components/ProfilePageComponents/ProfileList";
import UserInfo from "../../components/ProfilePageComponents/UserInfo";
import LikedProducts from "../../components/ProfilePageComponents/LikedProducts";
import scrollToTop from "../../utils/ScrollToTop";
import Reviews from "../../components/ProfilePageComponents/Reviews";
import OrdersList from "../../components/ProfilePageComponents/OrdersList";

const ProfilePageTest = (props) => {
  const { potentialChats, createChat } = useContext(ChatContext);
  const { loggedInUser } = useContext(AuthContext);
  const [foundUser, setFoundUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { userId } = useParams();
  const [newContact, setNewContact] = useState(false);
  const [showInfo, setShowInfo] = useState("products");
  const [showMore, setShowMore] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [userReviews, setUserReviews] = useState([]);

  useEffect(() => {
      const isPotentialContact = potentialChats.some((user) => user._id === foundUser?._id)
      if (isPotentialContact) {
        setNewContact(true)
      }
      else {
        setNewContact(false)
      }
  }, [userId, potentialChats, foundUser]);

  useEffect(() => {
    profileService.getOne(userId).then((response) => {
      setFoundUser(response.data.user);
      setUserReviews(response.data.user.reviews);
      setLoading(false);
    });
  }, [userId]);

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <div className="pt-20 min-h-screen bg-neutral-200">
      {loading ? (
        <Loading />
      ) : (
        <div>
          <UserInfo
            userReviews={userReviews}
            successMessage={successMessage}
            setSuccessMessage={setSuccessMessage}
            foundUser={foundUser}
            setFoundUser={setFoundUser}
            loggedInUser={loggedInUser}
            newContact={newContact}
            createChat={createChat}
            setNewContact={setNewContact}
          />
          <div>
            <ProfileList
              showInfo={showInfo}
              setShowInfo={setShowInfo}
              foundUser={foundUser}
              loggedInUser={loggedInUser}
            />
            {showInfo === "products" && (
              <Products
                setSuccessMessage={setSuccessMessage}
                foundUser={foundUser}
                loggedInUser={loggedInUser}
                showMore={showMore}
                setShowMore={setShowMore}
              />
            )}
            {showInfo === "liked" && (
              <LikedProducts
                foundUser={foundUser}
                loggedInUser={loggedInUser}
              />
            )}
            {showInfo === "reviews" && (
              <Reviews
                setSuccessMessage={setSuccessMessage}
                foundUser={foundUser}
                userReviews={userReviews}
                setUserReviews={setUserReviews}
              />
            )}
            {showInfo === "orders" && (
              <OrdersList
                foundUser={foundUser}
                userId={userId}
              />
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default ProfilePageTest;
