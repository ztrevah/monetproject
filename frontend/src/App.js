import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import Home from './Pages/Home.jsx';
import About from './Pages/About.jsx';
import ForgotPassword from './Pages/ForgotPassword.jsx';
import Signup from './Pages/Signup.jsx';
import ProductList from './Pages/ProductList.jsx';
import "./App.css"

const router = createBrowserRouter([
  {
    path: "/",
    element: <Home />
  },
  {
    path: "/about",
    element: <About />
  },
  {
    path: "/products",
    element: <ProductList />
  },
  {
    path: "/forgotpassword",
    element: <ForgotPassword />
  },
  {
    path: "/signup/step1",
    element: <Signup step={1} />
  },
  {
    path: "/signup",
    element: <Signup step={1} />
  },
  {
    path: "/signup/step2",
    element: <Signup step={2} />
  },
  {
    path: "/signup/step3",
    element: <Signup step={3} />
  },
  {
    path: "/signup/step4",
    element: <Signup step={4} />
  }
])

function App() {
  return (
    <div className='App'>
      <RouterProvider router={router} />
    </div>
    
  );
}

export default App;
