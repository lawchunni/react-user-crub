import React from "react";

const UserList = ({error, isLoaded, users, handleUserAction}) => {

  const handlePick = (e, user) => {
    if(e.target.tagName !== 'BUTTON') {
      handleUserAction('show', user);
    }
  }

  if(error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <div className="container is-max-desktop">
        <table className="table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id} value={user} onClick={(e) => handlePick(e, user)}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td >
                  <button className="button is-light">Edit</button>
                  <button className="button is-danger is-light">Delete</button>
                </td>
              </tr>
            ))}

          </tbody>
        </table>
      </div>
    );
  }
}

export default UserList;
