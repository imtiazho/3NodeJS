import React, { use, useState } from "react";

const Users = ({ userPromise }) => {
  const initialUsers = use(userPromise);
  console.log(initialUsers);
  const [users, setUser] = useState(initialUsers);

  const handleForm = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const newUser = { name, email };

    // Save this user to database via server
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("After saving user", data);
        if (data.insertedId) {
          newUser._id = data.insertedId;
          const newUsers = [...users, newUser];
          setUser(newUsers);
          alert("User created successfully!");
          e.target.reset();
        }
      });
  };

  return (
    <div>
      Users
      <form onSubmit={handleForm}>
        <input type="text" name="name" />
        <br />
        <input type="text" name="email" />
        <br />
        <input type="submit" value="SUBMIT" />
        <br />
      </form>
      <p>---------------------</p>
      <div>
        {users.map((user) => (
          <div key={user._id}>
            <p>{user?.name}</p>
            <button>X</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Users;
