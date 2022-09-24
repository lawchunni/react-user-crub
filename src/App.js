import React, { useEffect, useState } from 'react';
// components
import Header from './components/Header.js';
import UserList from './components/UserList';
import UserDetailsModal from './components/UserDetailsModal.js';

function App() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [action, setAction] = useState('');
  const [user, setUser] = useState({});

  useEffect(() => {
    fetch('http://localhost:8000/')
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setUsers(result);
        },
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const handleUserAction = (action, user) => {
    setAction(action);
    setUser(user);
  }

  return (
    <div>
      <Header />
      <UserList error={error} isLoaded={isLoaded} users={users.results} handleUserAction={handleUserAction} />
      <UserDetailsModal user={action === 'show' ? user : null} handleUserAction={handleUserAction} />
    </div>
  )
}

export default App;
