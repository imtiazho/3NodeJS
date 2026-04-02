import React, { use, useState } from "react";

const Users = ({ usersPromise }) => {
  const LoadedUsers = use(usersPromise);
  const [users, setUsers] = useState(LoadedUsers);
  console.log(users);

  const handleAddUser = (e) => {
    e.preventDefault();
    const Name = e.target.name.value;
    const Email = e.target.email.value;

    const user = { Name, Email };

    // Create user in the server
    fetch("http://localhost:3000/users", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        // console.log("Data after post", data);
        const newUser = [...users, data];
        setUsers(newUser);
        e.target.reset();
      });
  };

  return (
    <div>
      <form onSubmit={handleAddUser}>
        <input type="text" name="name" />
        <br />
        <input type="email" name="email" id="" />
        <br />
        <input type="submit" value="ADD User" />
      </form>
      <div>
        {users.map((user) => (
          <p>Name: {user.Name}</p>
        ))}
      </div>
    </div>
  );
};

export default Users;
