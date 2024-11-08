import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";
import { Button, Navbar, Container, Nav } from "react-bootstrap";
import Contacts from "./components/Contacts";
import AddContact from "./components/AddContact";

const App = () => {
  const [contacts, setcontacts] = useState([]);
  const [reload, setReload] = useState(false);
  const [id, setId] = useState("");


  const url = "https://mern-contact.onrender.com/";
  useEffect(() => {
    const fetchData = async () => {
      const api = await axios.get(`${url}/`, {
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("This data is coming from api", api.data.contact);
      setcontacts(api.data.contact);
    };

    fetchData();
  }, [reload]);

  console.log("Getting id for edit", id)

  return (
    <>
      <AddContact
        url={url}
        reload={reload}
        setReload={setReload}
        id={id}
        setId={setId}
      />
      <Contacts
        contacts={contacts}
        url={url}
        reload={reload}
        setReload={setReload}
        setId={setId}
        
      />
    </>
  );
};

export default App;
