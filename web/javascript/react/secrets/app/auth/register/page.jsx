import Card from '../Card';
import Form from '../Form'


export default function Register() {
  return (
    <div className="container mt-5">
      <h1>Register</h1>

      <div className="row">
        <div className="col-sm-8">
          <div className="card">
            <Form />
          </div>
        </div>

        <div className="col-sm-4">
          <Card cardName="Facebook" href="/auth/facebook" />
          <Card cardName="Google" href="/auth/google" />
        </div>

      </div>
    </div>
  );
}
