import { useEffect, Suspense, lazy } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Route, Routes, Navigate } from 'react-router-dom';
import AppBar from './components/AppBar';
import Container from './components/Container';
import PrivateRoute from './components/PrivateRoute';
import PublicRoute from './components/PublicRoute';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { authOperations, authSelectors } from './redux/auth';

const HomeView = lazy(() => import('./views/HomeView'));
const RegisterView = lazy(() => import('./views/RegisterView'));
const LoginView = lazy(() => import('./views/LoginView'));
const ContactsView = lazy(() => import('./views/ContactsView'));

export default function App() {
  const dispatch = useDispatch();
  const isFetchingCurrentUser = useSelector(authSelectors.getIsFetchingCurrent);

  useEffect(() => {
    dispatch(authOperations.fetchCurrentUser());
  }, [dispatch]);

  return (
    <Container>
      {!isFetchingCurrentUser && (
        <>
      <AppBar />
        <Suspense fallback={<p>Loading...</p>}>
          <Routes>
            <Route path="/" element={
              <PublicRoute restricted>
               <HomeView />
             </PublicRoute>}
            />
            <Route path="/contacts" element={
              <PrivateRoute restricted>
                <ContactsView />
              </PrivateRoute>}
            />
            <Route path="/register" element={
              <PublicRoute restricted>
               <RegisterView />
              </PublicRoute>}
            />
            <Route path="/login" element={
              <PublicRoute restricted>
                <LoginView />
              </PublicRoute>}
            />
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Suspense>
      </>
      )}
      <ToastContainer />
    </Container>
  );
}

