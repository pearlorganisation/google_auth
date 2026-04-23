import React from "react";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";

function App() {
  const handleSuccess = async (credentialResponse) => {
    try {
      const token = credentialResponse.credential;

      console.log("✅ Google Token:", token);

      const res = await axios.post(
        "https://lenstick-backend.onrender.com/api/v1/auth/google",
        { token },
        { withCredentials: true } // important for cookies
      );

      console.log("✅ Backend Response:", res.data);
      alert("Login Successful ✅");
    } catch (error) {
      console.log("error resonpnse ", error);
      console.error("❌ Error:", error.response?.data || error.message);
      alert("Login Failed ❌");
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h2>Google Auth Test</h2>

      <GoogleLogin
        onSuccess={handleSuccess}
        onError={() => {
          console.log("❌ Google Login Failed");
        }}
      />
    </div>
  );
}

export default function Root() {
  return (
    <GoogleOAuthProvider clientId="1009752700096-ii2dusrtffr6r3t9b612lj2mr9doiqkr.apps.googleusercontent.com">
      <App />
    </GoogleOAuthProvider>
  );
}
