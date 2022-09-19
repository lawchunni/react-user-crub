import React, { useEffect, useState } from 'react';
// components
import Header from './Header.js';
import UserList from './UserList';
import UserDetailsModal from './UserDetailsModal.js';

function App() {

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [user, setUser] = useState({action: null, data: null});

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
    setUser({action: action, data: user});
  }

  return (
    <div>
      <Header />
      <UserList error={error} isLoaded={isLoaded} users={users.results} handleUserAction={handleUserAction} />
      <UserDetailsModal user={user.action === 'show' ? user.data : null} setUser={setUser} />
    </div>
  )
}

export default App;
