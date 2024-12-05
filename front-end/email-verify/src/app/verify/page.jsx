"use client";
// import { useEffect, useState } from "react";
// import { useRouter } from "next/navigation";

// const VerifyPage = () => {
//   const router = useRouter();
//   const [message, setMessage] = useState("");

  // useEffect(() => {
  //   // Extract token from the query string
  //   const params = new URLSearchParams(window.location.search);
  //   console.log(params)
  //   const token = params.get("token");
  //  console.log(token,"JJJJJJJJJJJJJJJJJJJJ")
  //   if (token) {
  //     verifyToken(token);
  //   } else {
  //     setMessage("Invalid or missing token.");
  //   }
  // }, []);


//   const verifyToken = async (token) => {
//     try {
//       const response = await fetch("http://localhost:8080/api/verify-email", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({"emailToken":token}),
//       });

//       const data = await response.json();

//       if (data.isVerified==true) {
//         setMessage("Email successfully verified!");
//         router.push("/"); // Redirect to registration or another page
//       } else {
//         setMessage("Invalid or expired link.");
//       }
//     } catch (error) {
//       console.error("Error verifying token:", error);
//       setMessage("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div>
//       <h1>Email Verification</h1>
//       <p>{message}</p>
//     </div>
//   );
// };

// export default VerifyPage;


import React, { useState,useEffect } from "react";
import { useRouter } from "next/navigation";
import Success from "../../../component/success";
const VerifyPage = () => {
  const [isVerified, setIsVerified] = useState(null); // Manage verification state
  const router = useRouter();

  
  useEffect(() => {
    // Extract token from the query string
    const params = new URLSearchParams(window.location.search);
    console.log(params)
    const token = params.get("token");
   console.log(token,"JJJJJJJJJJJJJJJJJJJJ")
    if (token) {
      verifyToken(token);
    } else {
      setMessage("Invalid or missing token.");
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const response = await fetch("http://localhost:8080/api/verify-email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ emailToken: token }),
      });

      const data = await response.json();

      if (data.isVerified) {
        setIsVerified(true); // Update state for success
        setTimeout(() => {
          router.push("/"); // Redirect after a short delay
        }, 3000); // Optional delay before redirect
      } else {
        setIsVerified(false); // Update state for failure
      }
    } catch (error) {
      console.error("Error verifying token:", error);
      setIsVerified(false); // Show error component
    }
  };

  return (
    <div>
      {isVerified === null && <p>Verifying your email...</p>}
      {isVerified === true && (
        <Success/>
      )}
    </div>
  );
};

export default VerifyPage;
