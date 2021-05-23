// import React from 'react';
// import { responsiveFontSize, responsiveWidth } from 'react-native-responsive-dimensions';
// import {
//       HeaderButtons,

//       Item
// } from 'react-navigation-header-buttons';


 
// export default function SecondHeaderButtons({navigation},{scolor}){
//     return( 
//         <HeaderButtons >
//                 <Item title="Home"  
//                       onPress={() => {navigation.navigate('Home')
                       
//                      }} 
//                       buttonStyle={{marginRight:responsiveWidth(5.5),
//                                     color:'#333333',
//                                     fontWeight:'bold',
//                                     fontSize:responsiveFontSize(1)}}  />
//                 <Item title="Status" 
//                       onPress={() =>{navigation.navigate('CheckStatusWeb')}}
//                       buttonStyle={{marginRight:responsiveWidth(5.5),
//                                     color:'#333333',
//                                     fontWeight:'bold',
//                                     fontSize:responsiveFontSize(1)}}  />
//                 <Item title="Leaves"  
//                       onPress={()=>{navigation.navigate('Leaves')
                                     
//                         }} 
//                       buttonStyle={{marginRight:responsiveWidth(5.5),
//                                     color:'#333333',
//                                     fontWeight:'bold',
//                                     fontSize:responsiveFontSize(1)}}/>
//                 <Item title="Personal" 
//                       onPress={() =>{ navigation.navigate('Profile')
                                 
//                         }} 
//                       buttonStyle={{marginRight:responsiveWidth(5.5),
//                                     color:'#333333',
//                                     fontWeight:'bold',
//                                     fontSize:responsiveFontSize(1)}}  />
//                 {/* <Item title="Report"  
//                       onPress={() => navigation.navigate('Report')} 
//                       buttonStyle={{marginRight:responsiveWidth(5.5),
//                                      fontWeight:'bold',
//                                     fontSize:responsiveFontSize(1)}}  />
//                                      */}
//                 <Item title="General"  
//                       onPress={() =>{ navigation.navigate('Holidays')}} 
//                       buttonStyle={{marginRight:responsiveWidth(0),
//                                     fontWeight:'bold',
//                                     fontSize:responsiveFontSize(1),
//                                     color:'#333333'}} />
//                {/* <Item title="Admin Privileges"  
//                       onPress={() => navigation.navigate('EnterStatus')} 
//                       buttonStyle={{marginRight:responsiveWidth(0),
//                                     fontWeight:'bold',
//                                     fontSize:responsiveFontSize(1),
//                                     color:'#333333'}} />
//                  */}
//             </HeaderButtons>  
//     )
// }

import 'bootstrap/dist/css/bootstrap.css';
import React, { useState } from "react";
import { useHistory, withRouter } from 'react-router';
import { Link } from 'react-router-dom';
import {
  Button,



  Collapse, DropdownItem, DropdownMenu, DropdownToggle,
  Media, Nav, Navbar, NavbarBrand,
  NavbarToggler, NavItem, NavLink, UncontrolledDropdown
} from "reactstrap";
import { ApiInfo } from '../../ApiEndpoints';
import Logo from '../../assets/images/WebImage/headerLeftLogo.png';
import './css/NavbarStyle.css';



const AppNavbar = (props) => {
const {location}=props;
  const [dropdownOpen1, setDropdownOpen1] = useState(false); //for status
 const [dropdownOpen2, setDropdownOpen2] = useState(false);  //for personal
 const [dropdownOpen3, setDropdownOpen3] = useState(false);  //for general
 const [dropdownOpen4, setDropdownOpen4] = useState(false);  //for general

 const onMouseEnter1=()=>  {setDropdownOpen1(true)};
 const onMouseLeave1=()=>  {setDropdownOpen1(false)}; 
 const toggleDropdown1=()=>  {setDropdownOpen1((prevState)=>!prevState)};
 
 const onMouseEnter2=()=>  {setDropdownOpen2(true)};
 const onMouseLeave2=()=>  {setDropdownOpen2(false)}; 
 const toggleDropdown2=()=>  {setDropdownOpen2((prevState)=>!prevState)};
 
 const onMouseEnter3=()=>  {setDropdownOpen3(true)};
 const onMouseLeave3=()=>  {setDropdownOpen3(false)}; 
 const toggleDropdown3=()=>  {setDropdownOpen3((prevState)=>!prevState)};
 
 
 const onMouseEnter4=()=>  {setDropdownOpen4(true)};
 const onMouseLeave4=()=>  {setDropdownOpen4(false)}; 
 const toggleDropdown4=()=>  {setDropdownOpen4((prevState)=>!prevState)};
  
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);
 const history=useHistory();
  return ( 
      <Navbar color="white" light expand="md"    >
        <NavbarBrand >
              
                  <Media left  tag={Link} to="/home">
                    <Media object src={Logo} alt="Keyss Logo"  /> 
                  </Media>
         </NavbarBrand>
        <NavbarToggler onClick={toggle} />
        <Collapse isOpen={isOpen} navbar>
          <Nav className="mx-auto py-0" navbar>

            <NavItem> 
              <NavLink   tag={Link} exact to="/home" active={true}  style={{color:'black',fontWeight:'500'}} className="nav-link" activeClassName="active">Home</NavLink>
            </NavItem> 

            <UncontrolledDropdown nav inNavbar onMouseOver={onMouseEnter1} onMouseLeave={onMouseLeave1} isOpen={dropdownOpen1} toggle={toggleDropdown1}>
              <DropdownToggle style={{color:'black',fontWeight:'500'}} nav caret>
                Status
              </DropdownToggle>
              <DropdownMenu right style={{left:0}}>
                <DropdownItem tag={Link} to='/status/enterstatus'>Enter Status</DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag={Link} to='/status/checkstatus'>Check Status</DropdownItem> 
              </DropdownMenu>
            </UncontrolledDropdown>

            <NavItem>
              <NavLink tag={Link} to='/leaves' style={{color:'black',fontWeight:'500'}}>Leaves</NavLink>
            </NavItem> 

            <UncontrolledDropdown nav inNavbar onMouseOver={onMouseEnter2} onMouseLeave={onMouseLeave2} isOpen={dropdownOpen2} toggle={toggleDropdown2}>
              <DropdownToggle style={{color:'black',fontWeight:'500'}} nav caret>
                Personal
              </DropdownToggle>
              <DropdownMenu right style={{left:0}}>
                <DropdownItem tag={Link} to='/personal/changepassword'>Change Password</DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag={Link} to='/personal/profile'>Profile</DropdownItem> 
                <DropdownItem divider />
                <DropdownItem tag={Link} to='/personal/notifications'>Notifications</DropdownItem> 
              </DropdownMenu>
            </UncontrolledDropdown>

            <UncontrolledDropdown nav inNavbar className='lastNavlink' onMouseOver={onMouseEnter3} onMouseLeave={onMouseLeave3} isOpen={dropdownOpen3} toggle={toggleDropdown3}>
              <DropdownToggle style={{color:'black',fontWeight:'500'}} nav caret>
                General
              </DropdownToggle>
              <DropdownMenu right style={{left:0}}>
                <DropdownItem tag={Link} to='/general/contacts'>Contacts</DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag={Link} to='/general/holidays'>Holidays</DropdownItem> 
                <DropdownItem divider />
                <DropdownItem tag={Link} to='/general/policy'>Policy</DropdownItem> 
              </DropdownMenu>
            </UncontrolledDropdown>
           
            <UncontrolledDropdown nav inNavbar className='lastNavlink' onMouseOver={onMouseEnter4} onMouseLeave={onMouseLeave4} isOpen={dropdownOpen4} toggle={toggleDropdown4}>
              <DropdownToggle style={{color:'black',fontWeight:'500'}} nav caret>
                Admin Panel
              </DropdownToggle>
              <DropdownMenu right style={{left:0}}>
                <DropdownItem tag={Link} to='/status/check-status'>Check Status</DropdownItem>
                <DropdownItem divider />
                <DropdownItem tag={Link} to='/status/enter-status'>Enter Status</DropdownItem> 
                <DropdownItem divider />
                <DropdownItem tag={Link} to='/general/policy'>Policy</DropdownItem> 
              </DropdownMenu>
            </UncontrolledDropdown>

             </Nav>

            <Button    
                      color="danger" 
                      size="md"  
                      onClick={
                        ()=>{
                                
                                let encryptedCredentials =   btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password'));
                                localStorage.removeItem('password');
                                console.log(localStorage.removeItem('password') 
                                )
                                history.push('/');

                                window.location.reload();
                                fetch(ApiInfo.baseUrlForWeb+ApiInfo.logoutEndpoint ,{
                                            method:'POST',
                                            headers: {
                                                      'Authorization': 'Basic ' + encryptedCredentials  ,
                                                      'Content-Type': 'application/json'
                                                      
                                                      }
                                              
                                            
                                  }
                                ) 
                                  .then(response => response.json())

                                  .then(json => {   
                                           console.log(json);
                                       
                                          //  localStorage.removeItem('password');
                                          //  console.log(localStorage.removeItem('password') 
                                          //  )
                                          //  history.push('/');

                                          //  window.location.reload();
           
                                     }
                                  )
                              }
                                
                                                                    
                    }
            >
              Logout
            </Button> 
         
          
        </Collapse>
      </Navbar> 
  );
};

export default withRouter(AppNavbar);

