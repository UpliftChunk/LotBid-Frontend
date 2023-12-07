import './App.css';
import {Navigate} from 'react-router-dom';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import RootLayout from './component/layout/RootLayout';
import AllLots from './component/AllLots';
import FriendRequests from './component/friendrequest/FriendRequests';
import BidRequests from './component/bidrequest/BidRequests';
import DealRequests from './component/DealRequests';
import LotDetails from './component/LotDetails';
import LoginRegister from './component/user/auth/LoginRegister';
import Login from './component/user/auth/Login';
import Register from './component/user/auth/Register';

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
          path : 'friends',
          element : <FriendRequests/>
        },
        {
          path : 'bids',
          element : <BidRequests/>
        },
        {
          path : 'deals',
          element : <DealRequests/>
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
