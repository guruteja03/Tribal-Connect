import { AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import AppRoutes from './routes/AppRoutes';

function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <AppRoutes location={location} key={location.pathname} />
    </AnimatePresence>
  );
}

export default App;
