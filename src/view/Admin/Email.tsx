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
      const result = await MySwal.fire({
        icon: "success",
        title: "Success!",
        text: "Email send successfully!",
        confirmButtonText: "OK",
      });
      if (result.isConfirmed) {navigate(-1);}
    } catch (error) {
      MySwal.fire("Fail!", "Failed to send email.", "error");
    }
  };

  return (
    <div className="email-form-container container">
      <br />
      <h2><strong>E-mail</strong></h2>
      <form
        onSubmit={handleSubmitNewEmail}
        className="edit-forms"
      >
        <label htmlFor="address"><strong>Address</strong></label>
        <input
          type="text"
          id="address"
          name="address"
          value={newEmail.address}
          onChange={handleInputChange}
          className="input-fields"
        />
        <label htmlFor="title"><strong>Title</strong></label>
        <input
          type="text"
          id="title"
          name="title"
          value={newEmail.title}
          onChange={handleInputChange}
          className="input-fields"
        />
        <label htmlFor="message"><strong>Message</strong></label>
        <input
          type="text"
          id="message"
          name="message"
          value={newEmail.message}
          onChange={handleInputChange}
          className="input-fields"
        />
        <button type="submit" className="submit-button">
          Send
        </button>
      </form>
    </div>
  );
  
}

export default Email;
