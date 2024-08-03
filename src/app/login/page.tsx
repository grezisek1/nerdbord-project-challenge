import { login, signup } from './actions';
export default function LoginPage() {
  return (
    <form>
      <label>
        Email:
        <input id="email" name="email" type="email" required />
      </label>
      <label>
        Password:
        <input id="password" name="password" type="password" required />
      </label>
      <button formAction={login}>Log in</button>
      <button formAction={signup}>Create account</button>
    </form>
  );
}