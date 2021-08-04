import './App.css';
import { Container } from '@material-ui/core';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Category from './pages/Category';
import Questions from './pages/Questions';

function App() {
  return (
    <>
      <Container>
        <Router>
          <Route path='/' component={Category} exact></Route>
          <Route path='/q/:cat/:dif/:no' component={Questions} exact></Route>
        </Router>
      </Container>
    </>
  );
}

export default App;
