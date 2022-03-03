import { Routes, Route } from 'react-router-dom'
// Components
import Nav from './components/Nav';
// Pages
import Home from './pages/Home';
import Products from './pages/Products';
// CSS
import './App.css';

const App = () => {

  return (
    <div>
      <Nav />
        <Routes>
        <Route path='/' element={<Home />} />
        <Route path='products' element={<Products />} />
      </Routes>
    </div>
  );
}

export default App;

