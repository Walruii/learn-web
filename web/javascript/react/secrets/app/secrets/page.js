import Link from 'next/link';
import { options } from '../api/auth/[...nextauth]/options'
import { getServerSession } from 'next-auth/next'

const getUsers = async () => {
  const response = await fetch('http://localhost:3000/api/secrets', {
    cache: 'no-store',
    headers: {
      'Content-Type': 'application/json',
    }
  });
  const data = await response.json();
  return data.users;
}

export default async function Secrets() {
  const session = await getServerSession(options);
  const users = await getUsers();
  return (
    <div className="jumbotron text-center mt-5">
      <i className="fas fa-user-secret fa-6x"></i>
      <div className="container box mt-5">
        {session
          &&
          <Link className="btn btn-light btn-lg" href="/logout" role="button">Log Out</Link>}
        <Link className="btn btn-dark btn-lg" href="/submit" role="button">Submit a Secret</Link>
        <hr />
        <h1 className="display-3 my-4">I hope you don't find out it was me!</h1>
        {users.map((user) => {
          return <p className="secret-text rounded-3">{user.secret}</p>
        })}

      </div>
    </div>
  );
}
