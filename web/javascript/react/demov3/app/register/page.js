'use client'
import { useState } from 'react';

export default function Register() {

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
    const result = response.json();
    alert(result);
  };
  return (
    <div className="container mt-5">
      <h1>Register</h1>

      <div className="row">
        <div className="col-sm-8">
          <div className="card">
            <div className="card-body">
              <form>
                <div className="form-group">
                  <label for="email">Email</label>
                  <input onChange={handleChange} type="email" className="form-control" name="username" />
                </div>
                <div className="form-group">
                  <label for="password">Password</label>
                  <input onChange={handleChange} type="password" className="form-control" name="password" />
                </div>
                <button onClick={submit} type="submit" className="btn btn-dark mt-3">Register</button>
              </form>

            </div>
          </div>
        </div>

        <div className="col-sm-4">
          <div className="card social-block">
            <div className="card-body">
              <a className="btn btn-block" href="/auth/facebook" role="button">
                <i className="fab fa-facebook"></i>
                Sign Up with Facebook
              </a>
            </div>
          </div>

          <div className="card social-block mt-3">
            <div className="card-body">
              <a className="btn btn-block" href="/auth/google" role="button">
                <i className="fab fa-google"></i>
                Sign Up with Google
              </a>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
