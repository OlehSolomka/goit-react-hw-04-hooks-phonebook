import "./styles/base.scss";
import { useState } from "react";
import { nanoid } from "nanoid/non-secure";
import Section from "./components/Section";
import Form from "./components/Form";
import Contactlist from "./components/Contactlist";
import Filter from "./components/Filter";
import useLocalStorage from "./hooks/useLocalStorage";

export default function App() {
  const [contact, setContact] = useLocalStorage("contact", []);
  const [filter, setFilter] = useState("");

  const onDeleteContact = (contactName) => {
    setContact((prevState) =>
      prevState.filter((unit) => unit.name !== contactName)
    );
  };

  const onSubmitData = ([name, number]) => {
    const normalizedName = name.toLowerCase();

    const checkedName = contact.find(
      (element) => element.name.toLowerCase() === normalizedName
    );

    if (checkedName) {
      alert(`${normalizedName} is already in contacts`);
      return;
    }

    setContact((prevState) => [...prevState, { name, id: nanoid(), number }]);
  };

  const handlerChange = (event) => {
    const { value } = event.currentTarget;
    setFilter(value);
  };
  const getVIsibleContacts = () => {
    const normalizedFilter = filter.toLowerCase();

    return contact.filter((item) =>
      item.name.toLowerCase().includes(normalizedFilter)
    );
  };
  const filteredItems = getVIsibleContacts();
  return (
    <div className="root">
      <h1 className="header">Phonebook</h1>
      <Form onSubmit={onSubmitData} />
      <Section title={"Contacts"}>
        <Filter onChange={handlerChange} value={filter} />
        <Contactlist contacts={filteredItems} onDelete={onDeleteContact} />
      </Section>
    </div>
  );
}
