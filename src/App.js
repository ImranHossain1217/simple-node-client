import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setUsers(data));
  }, []);

  const handleAdduser = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const user = { name, email };
    e.target.reset();
    fetch("http://localhost:5000/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(user),
    })
      .then((res) => res.json())
      .then((data) => {
        const newUsers = [...users, data];
        console.log(newUsers)
        setUsers(newUsers);
      });
      
  };
  return (
    <div className="App">
      <form onSubmit={handleAdduser}>
        <input type="text" name="name" />
        <br />
        <input type="email" name="email" />
        <br />
        <button type="submit">Add User</button>
      </form>
      <h1>Users: {users.length}</h1>
      <div>
        {users.map((user) => (
          <p key={user.id}>
            {" "}
            Name: {user.name} email: {user.email}
          </p>
        ))}
      </div>
    </div>
  );
}

export default App;
