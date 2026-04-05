import React from "react";

const Users = () => {
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
    </div>
  );
};

export default Users;
