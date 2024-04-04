import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

interface Emp_Email {
    address: string ;
    title: string ;
    message: string ;
}

const MySwal = withReactContent(Swal);

function Email(): JSX.Element {
  const navigate = useNavigate();

  const [newEmail, setNewEmail] = useState<Emp_Email>({
    address: "",
    title: "",
    message: ""
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewEmail((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmitNewEmail = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8080/api/mail", newEmail);
      MySwal.fire("Success!", "Email send successfully!", "success");
      navigate(-1);
    } catch (error) {
      MySwal.fire("Fail!", "Failed to send email.", "error");
    }
  };

  return (
    <div>
        <form
        onSubmit={handleSubmitNewEmail}
        className="edit-form"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "10px",
          maxWidth: "400px",
          margin: "auto",
          textAlign: "center",
        }}
      >
      <label htmlFor="address">Address:</label>
        <input
        type="text"
        id="address"
        name="address"
        value={newEmail.address}
        onChange={handleInputChange}
        />
        <label htmlFor="title">Title:</label>
        <input
        type="text"
        id="title"
        name="title"
        value={newEmail.title}
        onChange={handleInputChange}
        />
        <label htmlFor="message">Message:</label>
        <input
        type="text"
        id="message"
        name="message"
        value={newEmail.message}
        onChange={handleInputChange}
        />
        <button type="submit" className="btn btn-center">
          Send
        </button></form>
    </div>
  );
}

export default Email;
