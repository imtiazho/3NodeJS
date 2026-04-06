import React from "react";
import { useLoaderData } from "react-router";

const UsersDetails = () => {
  const user = useLoaderData();
  console.log(user);

  return <div>Users ID from DB : {user._id}</div>;
};

export default UsersDetails;
