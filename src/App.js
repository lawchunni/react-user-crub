import React, { useEffect, useState } from 'react';
// components
import Header from './components/Header.js';
import UserList from './components/UserList';
import FormModal from './components/FormModal.js';
import UserDetailsModal from './components/UserDetailsModal.js';
import Messages from './components/Messages.js';

function App() {

  const api = 'http://localhost:8000/';

  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [users, setUsers] = useState([]);
  const [action, setAction] = useState('');
  const [user, setUser] = useState({});
  // messages
  const [successMsg, setSuccessMsg] = useState('');
  const [errMsg, setErrMsg] = useState('');


  useEffect(() => {
    getAllUser();
  }, []);

  const getAllUser = () => {
    fetch(api)
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
  }

  const handleUserAction = (action, user) => {
    setAction(action);
    setUser(user);
    if (action !== 'success') {
      resetMsg();
    }
  }

  const resetMsg = () => {
    setSuccessMsg('');
    setErrMsg('');
  }

  const handleFormSubmit = (method, data) => {

    resetMsg();

    if(!data.name || !data.email || !data.phone) {
      setErrMsg('All fields required');
      return;
    }

    // create or update data in database
    fetch(api, {
      method: method,
      body: JSON.stringify(data),
      header: {
        'Content-Type': 'application/json'
      }
    })
    .then(resp => resp.json())
    .then(json => {
      if(json.status === 200 || json.status === 201) {
        setSuccessMsg(json.message);
        handleUserAction('success', {});
        getAllUser();
      } else {
        setErrMsg(json.message);
      }
    })
  }

  return (
    <div>
      <Header />
      <Messages successMsg={successMsg} errMsg={errMsg} setSuccessMsg={setSuccessMsg} setErrMsg={setErrMsg} />

      <div className="container">
        <div className="wrapper">
          <button className="button is-medium is-info" onClick={() => handleUserAction('form', {})}>Add User</button>
        </div>
      </div>

      <UserList error={error} isLoaded={isLoaded} users={users.results} handleUserAction={handleUserAction} />

      {(() => {
        if(action === 'form') {
          return (
            <FormModal user={user} handleUserAction={handleUserAction} handleFormSubmit={handleFormSubmit} />
          )
        } else if(action === 'show') {
          return (
            <UserDetailsModal user={user} handleUserAction={handleUserAction} />
          ) 
        }
      })()}
    </div>
  )
}

export default App;
