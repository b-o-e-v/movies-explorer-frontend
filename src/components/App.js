import { Route, Switch, Redirect, useHistory } from 'react-router-dom'

import Header from './Header/Header'
import Main from './Main/Main'
import Movies from './Movies/Movies'
import Footer from './Footer/Footer'

export default function App() {
  return (
    <div className='page'>
      <Header />

      <Switch>
        <Route exact path='/'>
          <Main />
        </Route>
        <Route path='/movies'>
          <Movies />
        </Route>
      </Switch>

      <Footer />
    </div>
  )
}
