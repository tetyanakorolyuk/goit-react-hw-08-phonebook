import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import contactsOperations from 'redux/contacts/contacts-operations';
import { getAllContacts } from 'redux/contacts/contacts-selectors';
import { getLoading } from '../../redux/contacts/contacts-selectors';
import {Spinner} from '../Spinner/Spinner';
import { toast } from 'react-toastify';
import s from './ContactForm.module.css';

const ContactForm = () => {
  const dispatch = useDispatch();
  const contacts = useSelector(getAllContacts);
  const isLoading = useSelector(getLoading);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleChange = e => {
  const { name, value } = e.currentTarget;

  switch (name) {
    case 'name':
      setName(value);
      break;

    case 'number':
      setNumber(value);
      break;

    default:
      return;
    }
  };

  const handleSubmit = e => {
    e.preventDefault();
      if (contacts.find(contact => contact.name.toLowerCase() === name.toLowerCase())) {
        toast.error(`${name} is already in contacts.`);
        return;
        }
        dispatch(contactsOperations.addContact({ name, number }));
        reset();
        toast.success(`${name} was added to contacts`);
  }

  const reset = () => {
    setName('');
    setNumber('');
  };

  return (
  <>
    <form className={s.form} onSubmit={handleSubmit}>
      <label className={s.label}>
        Name
        <input
        className={s.input}
        type="text"
        name="name"
        value={name}
        onChange={handleChange}
        pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
        title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
        required
        />
      </label>
      <label className={s.label}>
        Number
        <input
        className={s.input}
        type="tel"
        name="number"
        value={number}
        onChange={handleChange}
        pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
        title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
        required
      />
      </label>
      <button className={s.buttonAdd} type="submit" disabled={isLoading}>Add contact</button>
      </form>
      {isLoading && <Spinner size={14} />}
  </>
  );
}

export default ContactForm;
