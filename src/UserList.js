import React from "react";

const UserList = ({error, isLoaded, users}) => {
  if(error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>
  } else {
    return (
      <div class="container is-max-desktop">
        <table class="table">
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
            {users.results.map(user => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>{user.phone}</td>
                <td>
                  <button class="button is-light">Edit</button>
                  <button class="button is-danger is-light">Delete</button>
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
