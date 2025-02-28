import { useState, useEffect } from "react";
import axios from "axios";
import { API_URL } from "../../general/var/constdecl";
import logger from "../../utilities/Logs/logger"; // Import your logger module here

function Profile() {
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    getData();
  }, []);

  function getData() {
    // You can set your token here
    const token = "YOUR_ACCESS_TOKEN";

    // Define your headers with the Authorization header
    const headers = {
      Authorization: `Bearer ${token}`,
    };

    axios({
      method: "GET",
      url: `${API_URL}/my_profile`, // Use the desired URL here
      headers: headers,
    })
      .then((response) => {
        const res = response.data;
        setProfileData({
          profile_name: res.name,
          about_me: res.about,
        });

        // Log successful profile data retrieval with variables and constants
        logger.info(`[${new Date().toLocaleTimeString()}] Profile data retrieved successfully. Token: ${token}, API_URL: ${API_URL}`);
      })
      .catch((error) => {
        if (error.response) {
          console.log(error.response);
          console.log(error.response.status);
          console.log(error.response.headers);
        }

        // Log profile data retrieval error with variables and constants
        logger.error(`[${new Date().toLocaleTimeString()}] Error retrieving profile data. Token: ${token}, API_URL: ${API_URL}`, error);
      });
  }

  return (
    <div className="Profile">
      <p>To get your profile details: </p>
      <button onClick={getData}>Click me</button>
      {profileData && (
        <div>
          <p>Profile name: {profileData.profile_name}</p>
          <p>About me: {profileData.about_me}</p>
        </div>
      )}
    </div>
  );
}

export default Profile;
