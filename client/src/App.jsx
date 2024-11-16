import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";





import Contacts from "./components/Contacts";
import AddContact from "./components/AddContact";

const App = () => {
  const [contacts, setcontacts] = useState([]);
  const [reload, setReload] = useState(false);
  const [id, setId] = useState("");


  useEffect(() => {
    const fetchData = async () => {
      const api = await axios.get(`${import.meta.env.VITE_APP_BASE_URL}/`, {
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
      <h1>Contact Managemnet System in MERN Stack</h1>
      <AddContact
        url={import.meta.env.VITE_APP_BASE_URL}
        reload={reload}
        setReload={setReload}
        id={id}
        setId={setId}
      />
      <Contacts
        contacts={contacts}
        url={import.meta.env.VITE_APP_BASE_URL}
        reload={reload}
        setReload={setReload}
        setId={setId}
      />
    </>
  );
};

export default App;
