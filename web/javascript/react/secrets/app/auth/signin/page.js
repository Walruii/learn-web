export default function Login() {
  return (
<div className="container mt-5">
  <h1>Login</h1>

  <div className="row">
    <div className="col-sm-8">
      <div className="card">
        <div className="card-body">
          <form action="/login" method="POST">
            <div className="form-group">
              <label htmlFor="email">Email</label>
              <input type="email" className="form-control" name="username" />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input type="password" className="form-control" name="password" />
            </div>
            <button type="submit" className="btn btn-dark mt-3">Login</button>
          </form>

        </div>
      </div>
    </div>

    <div className="col-sm-4">
      <div className="card">
        <div className="card-body">
          <a className="btn btn-block" href="/auth/google" role="button">
            <i className="fab fa-google"></i>
            Sign In with Google
          </a>
        </div>
      </div>
      <div className="card mt-3">
        <div className="card-body">
          <a className="btn btn-block" href="/auth/facebook" role="button">
            <i className="fab fa-facebook"></i>
            Sign In with Facebook
          </a>
        </div>
      </div>
    </div>

  </div>
</div>

  );
}
