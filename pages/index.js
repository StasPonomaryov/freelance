import { useState } from 'react';
import { useRouter } from 'next/router';
import { Inter } from 'next/font/google';
import { useAuth } from '../context/AuthUserContext';

const inter = Inter({ subsets: ['latin'] });

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const router = useRouter();
  const { signIn } = useAuth();

  const onSubmit = (event) => {
    setError(null);
    signIn(email, password)
      .then((authUser) => {
        router.push('/admin');
      })
      .catch((error) => {
        setError(error.message);
      });
    event.preventDefault();
  };

  return (
    <main>
      <section className="index-wrapper">
        <div className="index-container">
          <div className="login-frame">
            <div className="login-frame-content">
              <h1 className="login-title">Sign in to your account</h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={onSubmit}
              >
                <div>
                  <label htmlFor="email" className="input-label">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="input-field"
                    placeholder="name@company.com"
                    required=""
                    value={email}
                    onChange={(event) => setEmail(event.target.value)}
                  />
                </div>
                <div>
                  <label htmlFor="password" className="input-label">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="input-field"
                    required=""
                    value={password}
                    onChange={(event) => setPassword(event.target.value)}
                  />
                </div>
                <button type="submit" className="submit-button">
                  Sign in
                </button>
                <div className="error">{error}</div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
