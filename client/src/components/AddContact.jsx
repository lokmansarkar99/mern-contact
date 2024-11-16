import React, { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import Form from "react-bootstrap/Form";
import axios from "axios";

function AddContact({ url, reload, setReload, id, setId }) {
  const [show, setShow] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleClose = () => {
    setShow(false);
    setId("");
    setName("");
    setEmail("");
    setPhone("");
  };
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (id) {
      const fetchContact = async () => {
        try {
          const response = await axios.get(`${url}/${id}`, {
            headers: {
              "Content-Type": "application/json",
            },
          });
          const contact = response.data.contact;
          setName(contact.name);
          setEmail(contact.email);
          setPhone(contact.phone);
          setShow(true);
        } catch (error) {
          console.error("There was an error fetching the contact!", error);
        }
      };
      fetchContact();
    }
  }, [id, url]);

  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      if (id) {
        await axios.put(
          `${url}/${id}`,
          { name, email, phone },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Data updated successfully");
      } else {
        await axios.post(
          `${url}/`,
          { name, email, phone },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log("Data sent successfully");
      }
      handleClose(); // Close modal after successful submission
      setReload(!reload);
    } catch (error) {
      console.error("There was an error sending the data!", error);
    }
  };

  return (
    <>
      <div className="d-flex justify-content-center mt-5">
        <Button variant="primary" onClick={handleShow}>
          Add Contact
        </Button>
      </div>

      <Modal show={show} onHide={handleClose} style={{ color: "red" }}>
        <Modal.Header closeButton>
          <Modal.Title>{id ? "Edit Contact" : "Add New Contact"}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={submitHandler}>
            <Form.Group className="mb-3" controlId="formName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="e.g: Lokman"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="lokman@mail.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Form.Group>

            <Form.Group className="mb-3" controlId="formPhone">
              <Form.Label>Phone</Form.Label>
              <Form.Control
                type="text"
                placeholder="+880123456789"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </Form.Group>

            <Modal.Footer>
              <Button variant="danger" onClick={handleClose}>
                Cancel
              </Button>
              <Button variant="primary" type="submit">
                {id ? "Update" : "Submit"}
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default AddContact;
