import { useSelector, useDispatch } from 'react-redux';
import { getLoading } from '../../redux/contacts/contacts-selectors';
import contactsOperations from '../../redux/contacts/contacts-operations';
import Button from '@mui/material/Button';
import DeleteIcon from '@mui/icons-material/Delete';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import PropTypes from 'prop-types';
import s from './ContactList.module.css';

const ContactListItem = ({ id, name, number }) => {
  const dispatch = useDispatch();
  const isLoading = useSelector(getLoading);

  const theme = createTheme({
    status: {
      danger: '#e53e3e',
    },
    palette: {
      primary: {
        main: '#0971f1',
      },
      neutral: {
        main: 'rgb(248, 177, 177)',
        contrastText: '#000000',
      },
    },
  });

  return (
    <li className={s.item}>
      <span>{name}:</span>
      <span>{number}</span>
      <ThemeProvider theme={theme}>
        <Button variant="outlined" startIcon={<DeleteIcon />} onClick={() => dispatch(contactsOperations.deleteContact(id))} size="small" color="neutral" disabled={isLoading}>
          Delete
        </Button>
      </ThemeProvider>
    </li>
  );
}

ContactListItem.propTypes = {
  name: PropTypes.string,
  phone: PropTypes.string,
  onDelete: PropTypes.func,
};

export default ContactListItem;
