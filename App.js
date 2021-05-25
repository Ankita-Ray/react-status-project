 
import React from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import { config } from './env';
import Demo from './screens/demo';


const AppliedLeaveTableView=React.lazy(()=>import   ('./screens/NavbarScreens/appliedLeavesTableView'));
const AppraisalDetails=React.lazy(()=>import   ('./screens/NavbarScreens/AppraisalDetails'));
const AppraisalForm=React.lazy(()=>import   ('./screens/NavbarScreens/AppraisalForm'));
const AppraiserAppraisalForm=React.lazy(()=>import   ('./screens/NavbarScreens/AppraiserAppraisalForm'));

const ChangePassword=React.lazy(()=>import   ('./screens/NavbarScreens/Personal/ChangePasswordWeb'));
const CheckStatus=React.lazy(()=>import   ('./screens/NavbarScreens/Status/CheckStatusWeb'));
const Contacts=React.lazy(()=>import   ('./screens/NavbarScreens/General/ContactsWeb'));
const CheckStatusAdmin=React.lazy(()=>import   ('./screens/WebAdminPanelScreens/Status/CheckStatus'));

const EnterStatus=React.lazy(()=>import   ('./screens/NavbarScreens/Status/EnterStatusWeb'));
const EnterStatusAdmin=React.lazy(()=>import   ('./screens/WebAdminPanelScreens/Status/EnterStatus/index'));

const ForgotPasswordWeb=React.lazy(()=>import   ('./screens/ForgotPasswordWeb'));

const Holidays=React.lazy(()=>import   ('./screens/NavbarScreens/General/HolidaysWeb'));
const HRAppraisalForm=React.lazy(()=>import   ('./screens/NavbarScreens/HRappraisalForm'));
const HomeWeb=React.lazy(()=>import   ('./screens/HomeWeb'));

const LoginWeb=React.lazy(()=>import   ('./screens/LoginWeb'));
const LeaveDetails=React.lazy(()=>import   ('./screens/NavbarScreens/appliedLeaveDetails'));
const Leaves=React.lazy(()=>import   ('./screens/NavbarScreens/Leaves/LeavesWeb'));

const Notifications=React.lazy(()=>import   ('./screens/NavbarScreens/Personal/NotificationWeb'));

const Policy=React.lazy(()=>import   ('./screens/NavbarScreens/General/PolicyWeb'));
const Profile=React.lazy(()=>import   ('./screens/NavbarScreens/Personal/ProfileWeb'));
const PrintPreview=React.lazy(()=>import   ('./screens/NavbarScreens/PrintPreview'));
const Page404 =React.lazy(()=>import   ('./screens/Page404'));

// const dotenv = require('dotenv')

// const config = dotenv.parse(buf)  
 

 
export default  function App() { 
  const PrivateRoute = ({ component: Component ,...rest }) => 
  (  
    <Route {...rest} render={props => 
    (
      localStorage.getItem('password') ? <Component {...props} /> : <Redirect to={{pathname: '/'}}/>
    )}/>
  );
  const ConditionalWrapper = ({ condition, wrapper, children,secondWrapper }) => 
  condition!="" ? wrapper(children) : secondWrapper(children);
  return ( 
             
                   <ConditionalWrapper
                      condition={config.SUBDOMAIN}
                      children={
                              <React.Suspense fallback={<Demo/>}>
                                <Switch>
                                    
                                        <Route exact  path='/'>
                                        <LoginWeb/> 
                                        </Route> 
                    
                                        <Route exact path='/forgotpassword' component={ForgotPasswordWeb}/> 
                                      
                                        <PrivateRoute exact path='/home' component={HomeWeb} />
                                        
                    
                                        <PrivateRoute exact path='/general/contacts' component={Contacts}/>
                                        
                    
                                        <PrivateRoute exact path='/general/holidays' component={Holidays} />
                                      
                                        <PrivateRoute exact path='/personal/changepassword' component={ChangePassword} /> 
                    
                                        <PrivateRoute exact path='/personal/notifications' component={Notifications} /> 
                    
                                        <PrivateRoute exact path='/personal/profile' component={Profile} /> 
                    
                                        <PrivateRoute exact path='/leaves' component={Leaves} /> 
                    
                                        <PrivateRoute exact path='/general/policy' component={Policy}/>  
                    
                                        <PrivateRoute exact path='/status/enterstatus' component={EnterStatus}/> 
                                        
                                        <PrivateRoute exact path='/status/checkstatus' component={CheckStatus}/> 
                                        
                                        <PrivateRoute exact path="/leave-details" component={LeaveDetails}/>
                                        
                                        <PrivateRoute exact path="/applied-leave-table-view" component={AppliedLeaveTableView}  /> 
                    
                                        <PrivateRoute exact path="/print-preview" component={PrintPreview} /> 
                    
                                      
                                        <PrivateRoute exact path="/appraisal-form" component={AppraisalForm} /> 
                    
                                        <PrivateRoute exact path="/hr-appraisal-form" component={HRAppraisalForm} /> 
                    
                                        <PrivateRoute exact path="/appraiser-appraisal-form" component={AppraiserAppraisalForm}  /> 
                                        
                                        
                                        <PrivateRoute exact path="/appraisal-details" component={AppraisalDetails}  /> 

                                        

                                        <PrivateRoute exact path="/status/check-status" component={CheckStatusAdmin}  /> 
                                        <PrivateRoute exact path="/status/enter-status" component={EnterStatusAdmin}  /> 

                                        
                                        
                                        
                                        
                                        <Route component={Page404} />

            
                              </Switch>
                              </React.Suspense>
                      }
                      wrapper={children => <BrowserRouter basename={config.SUBDOMAIN}>{children}</BrowserRouter>}
                      secondWrapper={children=><BrowserRouter>{children}</BrowserRouter>}
                    />
                   
                      
               
  );

   
} 





 