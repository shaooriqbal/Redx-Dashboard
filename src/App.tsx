import { Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './pages/Dashboard';
import Products from './pages/Products';
import Resources from './pages/Resources';
import Finance from './pages/Finance';
import Overtimes from './pages/Overtimes';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Dashboard />} />
        <Route path="products" element={<Products />} />
        <Route path="resources" element={<Resources />} />
        <Route path="finance" element={<Finance />} />
        <Route path="overtimes" element={<Overtimes />} />
      </Route>
    </Routes>
  );
}

export default App;
