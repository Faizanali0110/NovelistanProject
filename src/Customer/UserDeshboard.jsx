import React, { useEffect, useState } from "react";
import UserHeader from "../components/UserHeader";
import Footer from "../components/Footer";
import ViewBooks from "./ViewBooks";
import axios from "axios";
import Cookies from 'js-cookie';

const UserDeshboard = () => {
  const [userImage, setUserImage] = useState(null);
  const [userName, setUserName] = useState(null);
  const userId = Cookies.get('customerId'); // Corrected cookie name as a string

  useEffect(() => {
    // Check if userId is available, if not, handle the case (e.g., redirect or show a message)
    if (!userId) {
      console.error("User ID is not available.");
      return; // Prevent further execution
    }

    // Fetch User image and username from API with the correct base URL (http://localhost:8082)
    axios
      .get(`http://localhost:8082/api/customerImage/${userId}`, { responseType: "arraybuffer" }) // Fetching the image as a byte array
      .then((response) => {
        const imageBlob = new Blob([response.data], { type: "image/jpeg" });
        const imageUrl = URL.createObjectURL(imageBlob);
        setUserImage(imageUrl);
      })
      .catch((error) => console.error("Error fetching user image", error));

    axios
      .get(`http://localhost:8082/api/Customer/UserName/${userId}`)
      .then((response) => {
        setUserName(response.data);
      })
      .catch((error) => console.error("Error fetching username", error));
  }, [userId]);

  return (
    <>
      <UserHeader userImage={userImage} userName={userName} />
      <ViewBooks />
      <Footer />
    </>
  );
};

export default UserDeshboard;
 