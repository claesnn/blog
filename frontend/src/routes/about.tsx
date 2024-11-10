import { Link } from "react-router-dom";

export default function About() {
  return (
    <div>
      <h1>About</h1>
      <p>This is the about page.</p>
      <Link to="/">Go back to the homepage</Link>
    </div>
  );
}
