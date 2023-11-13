import './App.css';
import {Navigate} from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './component/layout/RootLayout';
import AllLots from './component/AllLots';
import LotDetails from './component/LotDetails';
import LoginRegister from './component/user/auth/LoginRegister';
import Login from './component/user/auth/Login';
import Register from './component/user/auth/Register';
import UserAccount from './component/user/auth/UserAccount';
import UserValidity from './component/user/auth/UserValidity';

function App() {
  const Router = createBrowserRouter([
    {
      path: '*',
      element: <Navigate to={"/"}/>
    },
    {
      path : "/",
      element :<RootLayout/>,
      children:[
        {
          path : '',
          element : <AllLots/>
        },
        {
          path : 'lot/:id',
          element : <LotDetails/>
        },
        {
          path : 'account',
          element : <LoginRegister/>,
          children:[
            {
              path : 'login',
              element : <Login/> 
            },
            {
              path : 'register',
              element : <Register/> 
            }
          ]
        },
        {
          path : 'user',
          element : <UserValidity/>,
          children:[
            {
              path : 'account',
              element : <UserAccount/>
            }
          ]
        }
      ]
    }
  ]);

  return (
    <div className="App">
      {/* provide browser router */}
      <RouterProvider router={Router}/>
    </div>
  );
}

export default App;
