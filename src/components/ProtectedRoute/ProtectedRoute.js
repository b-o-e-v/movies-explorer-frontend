import { Route } from 'react-router-dom';

// Для следующего этапа диплома
export default function ProtectedRoute({ children }) {
  return (
    <Route>{children}</Route>
  )
}
