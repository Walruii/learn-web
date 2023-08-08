'use client'
import { useState } from 'react';

export default function Form() {
  const [user, setUser] = useState({ username: '', password: '' })

  function handleChange(event) {
    const { value, name } = event.target;
    setUser((prevUser) => {
      const { username, password } = prevUser
      if (name === 'username') {
        return {
          username: value,
          password: password
        };
      } else if (name === 'password') {
        return {
          username: username,
          password: value
        };
      }
    });
    console.log(user);
  };

  async function submit(event) {
    event.preventDefault()
    const response = await fetch('/api/user', {
      method: 'POST',
      body: JSON.stringify(user),
      headers: {
        'Content-Type': 'application/json'
      }
    });
    const result = await response.json();
    console.log(result);
  };

  return (
    <div className="card-body">
      <form action="/login" method="POST">
        <div className="form-group">
          <label htmlFor="email">Email</label>
          <input onChange={handleChange} type="email" className="form-control" name="username" />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input onChange={handleChange} type="password" className="form-control" name="password" />
        </div>
        <button onClick={submit} type="submit" className="btn btn-dark mt-3">Login</button>
      </form>
    </div>
  );
}
