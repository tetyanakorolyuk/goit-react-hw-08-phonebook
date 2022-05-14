import { useDispatch, useSelector } from 'react-redux';
import { authSelectors, authOperations } from '../../redux/auth';
import Button from '@mui/material/Button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Avatar } from '@mui/material';

import s from './UserMenu.module.css';

export default function UserMenu() {
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUsername);
  const nameShort = name.charAt(0);

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
    <div className={s.container}>
      <Avatar className={s.avatar}> {nameShort} </Avatar>
      <span className={s.name}>Welcome, {name}</span>
      <ThemeProvider theme={theme}>
        <Button color="neutral" variant="contained" size="small" onClick={() => dispatch(authOperations.logOut())}>
          Log out
        </Button>
      </ThemeProvider>
    </div>
  );
}
