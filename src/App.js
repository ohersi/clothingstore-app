import { Routes, Route } from 'react-router-dom'
// Pages
import Home from './pages/Home';
import Products from './pages/Products';
// CSS
import './App.css';

const App = () => {

  return (
    <div>
      <Routes>
    <Route path='/' element={<Home />} />
    <Route path='/' element={<Products />} />
      </Routes>
      Hello
    </div>
  );
}

export default App;

