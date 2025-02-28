import React, { useState } from "react";
import axios from "axios";
import { API_URL, USER_STATUS } from "../../../../admin/setups/ConstDecl";
import "../../../../utilities/css/appcss.css";
import withAccessControl from "../../../../security/modulepermissions/AccessControlWrapper";
export default withAccessControl("SECURITY", "UPDATE")(ModifyUserForm);

function ModifyUserForm() {
  const [searchCriteria, setSearchCriteria] = useState({
    username: "",
    empid: "",
  });
  const [apiResponse, setApiResponse] = useState(null);
  const [userDetails, setUserDetails] = useState({
    id: null,
    username: "",
    empid: null,
    emailid: "",
    start_date: null,
    status: "",
    expiry_date: null,
  });
  const [formData, setFormData] = useState({
    id: null,
    emailid: "",
    password: "",
    password1: "", // Add this line
    status: "",
    expiry_date: "",
  });
  const [passwordError, setPasswordError] = useState(null);

  // Declare the headers object
  const headers = {
    Authorization: `Bearer ${localStorage.getItem("token")}`,
    UserId: localStorage.getItem("userid"),
  };

  // Function to format date to YYYY-MM-DD
  const formatDate = (dateString) => {
    if (!dateString) return "";

    const [day, month, year] = dateString.split("-");
    return `${year}-${month}-${day}`;
  };

  const handleSearchChange = (e) => {
    setSearchCriteria({ ...searchCriteria, [e.target.name]: e.target.value });
  };

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    // Set userDetails to null
    setUserDetails({
      id: null,
      username: "",
      empid: null,
      emailid: "",
      start_date: null,
      status: "",
      expiry_date: null,
    });

    try {
      // Call your list_users API with the searchCriteria and headers
      const response = await axios.get(`${API_URL}/list_users`, {
        headers,
        params: {
          username: searchCriteria.username,
          empid: searchCriteria.empid,
        },
      });

      // Extract the first user details
      const firstUser = response.data.users[0];

      setUserDetails({
        id: firstUser.id,
        username: firstUser.username,
        empid: firstUser.empid,
        emailid: firstUser.emailid,
        start_date: firstUser.start_date,
        status: firstUser.status,
        expiry_date: firstUser.expiry_date,
      });

      // Reset other form fields
      setFormData({
        id: null,
        emailid: "",
        password: "",
        password1: "",
        status: "",
        expiry_date: "",
      });
      setApiResponse(null);
    } catch (error) {
      console.error("Error searching for user:", error);
      // Handle errors based on your requirements
    }
  };

  const handleModifyChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    const { name, value } = e.target;

    // Update userDetails.status and userDetails.expiry_date if formData.status is changed to "Active"
    if (name === "status" && value === "Active") {
      setUserDetails({
        ...userDetails,
        status: "Active",
        expiry_date: null,
      });
    }
  };

  const handleModifySubmit = async (e) => {
    e.preventDefault();

    // Check if status is "Expired" and expiry_date is not provided
    if (formData.status === "Expired" && !formData.expiry_date) {
      alert("Expiry Date is mandatory when the status is Expired");
      return; // Do not proceed with the form submission
    }

    // Check if passwords match
    if (formData.password !== formData.password1) {
      setPasswordError("Passwords do not match");
      return;
    } else {
      setPasswordError(null);
    }

    if (formData.status === "Active" && formData.expiry_date !== null) {
      setFormData({
        ...formData,
        expiry_date: null,
      });
    }

    if (formData.status === "Active") {
      setUserDetails({
        ...userDetails,
        status: "Active",
        expiry_date: null,
      });
    }

    console.log("Form Data -->", formData)
    try {
      // Include userDetails.id in the formData
      const modifiedFormData = {
        ...formData,
        id: userDetails.id,
      };

      // Call your modify_user API with the modifiedFormData and headers
      const response = await axios.put(
        `${API_URL}/modify_user`,
        modifiedFormData,
        {
          headers,
        }
      );

      // Handle the API response based on your requirements
      console.log("API Response:", response.data);

      // Update the state to store the API response
      setApiResponse(response.data);
    } catch (error) {
      console.error("Error modifying user:", error);
      // Handle errors based on your requirements
    }
  };

  return (
    <div className="child-container menu-container">
      <h2 className="title">Search User Details</h2>
      <div className="child-container form-container">
        <form onSubmit={handleSearchSubmit}>
          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label>Username:</label>
              </div>
              <input
                type="text"
                name="username"
                value={searchCriteria.username}
                onChange={handleSearchChange}
                className="form-control input-field"
              />
            </div>
          </div>

          <div className="form-group col-md-6 mb-2">
            <div className="form-row">
              <div className="label-container">
                <label>EmpId:</label>
              </div>
              <input
                type="text"
                name="empid"
                value={searchCriteria.empid}
                onChange={handleSearchChange}
                className="form-control input-field"
              />
            </div>
          </div>
          <button type="submit">Search</button>
          {userDetails.id && (
            <div className="form-group col-md-6 mb-2">
              <div className="form-row">
                <div className="label-container">
                  <label>User Details </label>
                </div>
                <div className="singleRowContainer">
                  {userDetails.username}
                  {userDetails.status !== null && (
                    <span> - {userDetails.status}</span>
                  )}
                  {userDetails.expiry_date !== null && (
                    <span> - Expiry Date: {userDetails.expiry_date}</span>
                  )}
                  {userDetails.emailid !== null && (
                    <span> - {userDetails.emailid}</span>
                  )}
                </div>
              </div>
            </div>
          )}
        </form>
      </div>

      {userDetails.id && (
        <div>
          <div className="child-container form-container">
            <form onSubmit={handleModifySubmit}>
              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label>New Email id:</label>
                  </div>
                  <input
                    type="text"
                    name="emailid"
                    value={formData.emailid}
                    onChange={handleModifyChange}
                    className="form-control input-field"
                  />
                </div>
              </div>

              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label>New Password:</label>
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleModifyChange}
                    className="form-control input-field"
                  />
                </div>
              </div>

              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label>Confirm Password:</label>
                  </div>
                  <input
                    type="password"
                    name="password1"
                    value={formData.password1}
                    onChange={handleModifyChange}
                    className="form-control input-field"
                  />
                </div>
                {passwordError && (
                  <span className="error-message">{passwordError}</span>
                )}
              </div>

              <div className="form-group col-md-6 mb-2">
                <div className="form-row">
                  <div className="label-container">
                    <label>New Status:</label>
                  </div>
                  <select
                    name="status"
                    value={formData.status || userDetails.status}
                    onChange={handleModifyChange}
                    className="form-control input-field"
                  >
                    {USER_STATUS.map((status) => (
                      <option key={status.short_name} value={status.short_name}>
                        {status.status}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {(formData.status === "Expired" ||
                userDetails.status === "Expired" ||
                userDetails.expiry_date) && (
                  <div className="form-group col-md-6 mb-2">
                    <div className="form-row">
                      <div className="label-container">
                        <label>Expiry Date:</label>
                      </div>
                      <input
                        type="date"
                        name="expiry_date"
                        value={
                          formatDate(userDetails.expiry_date) ||
                          formData.expiry_date
                        }
                        onChange={handleModifyChange}
                        className="form-control input-field date-input"
                        style={{ width: "100%" }} // Add this line
                      />
                    </div>
                  </div>
                )}
              <button type="submit">Modify User</button>
            </form>
            {/* Display API response in the same form */}
            {apiResponse && (
              <div>
                <p>{apiResponse.message}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
