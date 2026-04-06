import React from "react";
import { useLoaderData } from "react-router";

const UpdateUser = () => {
  const user = useLoaderData();

  const handleUpdateUser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const updatedUser = { name, email };

    // Update
    fetch(`http://localhost:5000/users/${user._id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedUser),
    })
      .then((res) => res.json())
      .then((data) => {
        console.log("After update", data);
        if (data.modifiedCount) {
          alert("Update Perfectly");
        }
      });
  };

  return (
    <div>
      Edit a User
      <form onSubmit={handleUpdateUser}>
        <input type="text" name="name" defaultValue={user.name} /> <br />
        <input type="email" name="email" defaultValue={user.email} />
        <br />
        <input type="submit" value="Submit" />
      </form>
    </div>
  );
};

export default UpdateUser;
