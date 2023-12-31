import Card from "../Card"
import Form from "../Form"

export default function Login() {
  return (
    <div className="container mt-5">
      <h1>Login</h1>

      <div className="row">
        <div className="col-sm-8">
          <div className="card">
            <Form />
          </div>
        </div>

        <div className="col-sm-4">
          <Card cardName="Facebook" href="/auth/facebook" />
          <Card cardName="Github" href="/api/auth/signin" />
          <Card cardName="Google" href="/auth/google" />
        </div>

      </div>
    </div>

  );
}
