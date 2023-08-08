export default function Card(props) {
  return (
    <div className="card social-block">
      <div className="card-body">
        <a className="btn btn-block" href={props.href} role="button">
          <i className="fab fa-facebook"></i>
          Sign Up with {props.cardName}
        </a>
      </div>
    </div>

  );
}
