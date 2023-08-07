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

export default async function Users() {
  const users = await getUsers();
  return (<div>
    {users.map((user) => {
      return <p className="secret-text rounded-3">{user.secret}</p>
    })}
  </div>
  );
}
