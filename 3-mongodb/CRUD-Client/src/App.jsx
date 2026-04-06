import "./App.css";
import Users from "./Components/Users/Users";

const userPromise = fetch("http://localhost:5000/users").then((res) =>
  res.json(),
);

function App() {
  return (
    <>
      CRUD client
      <Users userPromise={userPromise}></Users>
    </>
  );
}

export default App;
