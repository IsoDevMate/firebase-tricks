import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './navbar/index';
import Error from './error';
import { Home } from './home';
import { SignUpForm } from './auth/signup';
import { SignIn } from './auth/signin';
import { ResetPassword } from './auth/resetpassword';
import ErrorBoundary from './errorboundary';

// Create a new component for the container
const Container = ({ children }) => (
  <div className="container mx-auto px-4 py-8">{children}</div>
);

// Create a new component for the Navbar container
const NavbarContainer = () => (
  <div className="sticky top-0 z-50">
    <Navbar />
  </div>
);

function App() {

  return (
  <ErrorBoundary>
    <Router>
      <NavbarContainer />
      <Container>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signup" element={<SignUpForm />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/resetpassword" element={<ResetPassword />} />
          <Route path="*" element={<Error />} />
        </Routes>
      </Container>
    </Router>
  </ErrorBoundary>
  );
}

export default App;