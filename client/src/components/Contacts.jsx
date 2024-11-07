import React from "react";
import { Button } from "react-bootstrap";
import axios from "axios";

const Contacts = ({ contacts, url, reload, setReload, setId }) => {
  const deleteContact = async (id) => {
    const api = await axios.delete(`${url}/${id}`, {
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log("Deleted data", api);
    setReload(!reload);
  };

  return (
    <>
      <div className="container my-5" style={{ width: "600px" }}>
        {contacts.map((data) => (
          <div
            key={data._id}
            className="bg-black p-3 my-3 d-flex  justify-content-between align-items-center"
            style={{ borderRadius: "10px", border: "3px solid green" }}
          >
            <div>
              <h1>
                <span className="material-symbols-outlined mx-3">
                  account_circle
                </span>{" "}
                {data.name}{" "}
              </h1>
              <h3>
                <span className="material-symbols-outlined mx-3">mail</span>{" "}
                {data.email}
              </h3>
              <h3>
                <span className="material-symbols-outlined mx-3">call</span>{" "}
                {data.phone}{" "}
              </h3>
            </div>

            <div className="d-flex flex-column gap-3">
              <Button
                variant="primary"
                onClick={() => {
                  setId(data._id);
                }}
              >
                Edit
              </Button>
              <Button variant="danger" onClick={() => deleteContact(data._id)}>
                Delete
              </Button>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Contacts;
