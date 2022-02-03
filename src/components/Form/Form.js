import { useState } from "react";
import "./form.scss";

const Form = ({ onSubmit }) => {
  const [name, setName] = useState("");
  const [number, setNumber] = useState("");

  const handlerChange = (event) => {
    const { name, value } = event.currentTarget;
    switch (name) {
      case "name":
        setName(value);
        break;
      case "number":
        setNumber(value);
        break;
      default:
        return;
    }
  };
  const reset = () => {
    setName("");
    setNumber("");
  };

  const handlerSubmit = (event) => {
    event.preventDefault();
    onSubmit([name, number]);
    reset();
  };

  return (
    <div className="form">
      <form onSubmit={handlerSubmit}>
        <label className="form__label">
          Name:
          <input
            placeholder="Enter your name"
            value={name}
            type="text"
            name="name"
            onChange={handlerChange}
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
          />
        </label>
        <label className="form__label">
          Tel:
          <input
            placeholder="enter your phone number"
            value={number}
            type="tel"
            name="number"
            onChange={handlerChange}
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    </div>
  );
};

export default Form;
