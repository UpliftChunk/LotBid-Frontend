import {Nav,Navbar} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import {AiOutlineUser} from 'react-icons/ai';
import ProfilePng from '../../images/Profile.png';
import axios from 'axios';
import { useEffect } from 'react';

function RootNavbar({isAuthenticated, user, setAuth}) {
  let navigate= useNavigate();
  // const currentPage = window.location.href;

  const LogoutUser = () => {
    // dispatch(logout());
    // alert.success(`Logout successful`);
    async function removeUser() {
        await axios.get(`/api/v1/logout`);
      
        localStorage.removeItem(`user`);
        localStorage.setItem(`isAuthenticated`, JSON.stringify(false));
        
        setAuth(false);
        console.log(isAuthenticated);
      }
      
      console.log(isAuthenticated);
      removeUser();
  }
  useEffect(() => {
    navigate('/');
  }, [navigate, isAuthenticated])
  
  return (
    <Navbar bg="dark" variant="dark">
          <Nav className="navbarContainer w-100">
            <Link className='nav-link fs-1 mb-2 active' to="" >Harvest Hack</Link>
            <div className="d-flex ms-auto">

              {/* User Option */}
              {isAuthenticated?(
                  <div className='nav-link mt-2'>
                    <Dropdown className='my-auto container-fluid'>
                      {/* dropdown tag*/}
                      <Dropdown.Toggle split variant="dark" className='mt-auto d-flex'>
                        <div className='my-auto d-flex'>
                          <div className='pe-none lead'> @{user.name} </div>
                          {/* profile button */}
                          <span>
                          {user.avatar !== undefined ?
                              (<img src= {user.avatar.url}
                                  alt="profile_img" style={{width:"4vh", height:"4vh", objectFit:"cover"}}
                                  className='rounded-circle mb-1'/>)
                              :(<img src={ProfilePng} alt="pic"
                                     style={{width:"4vh", height:"4vh", objectFit:"cover"}}
                                     className='rounded-circle mb-1'/>)
                            }
                          </span>
                        </div>
                      </Dropdown.Toggle>
                      {/* User Option */}
                      <Dropdown.Menu variant="dark">
                        <Dropdown.Item>
                          <Link className='nav-link' to="user/account">Profile</Link>
                        </Dropdown.Item>
                        <Dropdown.Item>
                          <Link className='nav-link' onClick={LogoutUser} to='#'>Logout</Link>
                        </Dropdown.Item>
                      </Dropdown.Menu>


                    </Dropdown>
                  </div>
                ):(
                  <Link className='nav-link fs-5 my-auto' to="account">
                    Guest <AiOutlineUser className='fs-5'/>
                  </Link>
                
                )
              }
            </div>
          </Nav>
      </Navbar>
  );
}

export default RootNavbar;