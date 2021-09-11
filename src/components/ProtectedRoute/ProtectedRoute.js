import { Route, Redirect } from 'react-router-dom';

export default function ProtectedRoute({ isLoggedIn, children }) {
  return (
    <Route>
      {isLoggedIn ? children : <Redirect to="/signin" />}
    </Route>
  )
}
