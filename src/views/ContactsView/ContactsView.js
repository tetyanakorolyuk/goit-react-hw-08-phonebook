import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Container from '../../components/Container';
import ContactList from '../../components/ContactList';
import ContactForm from '../../components/ContactForm';
import Filter from '../../components/Filter';
import { getLoading, getAllContacts } from '../../redux/contacts/contacts-selectors';
import contactsOperations from '../../redux/contacts/contacts-operations';
import s from './ContactsView.module.css';

export default function ContactsView() {
  const dispatch = useDispatch();
  const contacts = useSelector(getAllContacts);
  const isLoadingContacts = useSelector(getLoading);

  useEffect(() => dispatch(contactsOperations.fetchContacts()), [dispatch]);

  return (
    <Container>
      <div className={s.section}>
        <ContactForm />
        <Filter />
        {isLoadingContacts && <h1>Loading...</h1>}
        {contacts && <ContactList />}
      </div>
    </Container>
  );
}
