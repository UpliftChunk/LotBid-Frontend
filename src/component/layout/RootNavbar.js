import {Nav,Navbar} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Dropdown from 'react-bootstrap/Dropdown';
import {AiOutlineUser} from 'react-icons/ai';
import ProfilePng from '../../images/Profile.png';
import axios from 'axios';

function RootNavbar({isAuthenticated, user, setAuth}) {

  const LogoutUser = () => {
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

  
  
  return (
    <Navbar bg="dark" variant="dark">
          <Nav className="navbarContainer w-100 d-flex">
            <Link className='nav-link fs-1 mb-2 active' to="" >Harvest Hack</Link>

              <div className="d-flex flex-grow-1">
              {/* User Option */}
              {isAuthenticated?(
                    <div className='d-flex w-100'>
                      {user.role==='farmer' && <>
                        <Link className='nav-link fs-5 mt-4' to="friends">
                          Friends
                        </Link>
                        <Link className='nav-link fs-5 mt-4' to="bids">
                          Bids
                        </Link></>
                        }
                      <Link className='nav-link fs-5 mt-4' to="deals">
                        Deals
                      </Link>
                      <div className='nav-link mx-3 mt-3 ms-auto'>
                        <Dropdown className='my-auto container-fluid'>
                          {/* dropdown tag*/}
                          <Dropdown.Toggle split variant="dark" className='mt-auto d-flex'>
                            <div className='my-auto d-flex'>
                              <div className='pe-none lead'> @{user.name} </div>
                              {/* profile button */}
                              <span>
                              {user.avatar?.url?
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
                    </div>
                ):(
                  <div className='d-flex flex-grow-1 container'>
                    <Link className='nav-link fs-5 ms-auto my-auto' to="account">
                      Guest <AiOutlineUser className='fs-5'/>
                    </Link>
                  </div>
                
                )
              }
              </div>
          </Nav>
      </Navbar>
  );
}

export default RootNavbar;