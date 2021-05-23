import DateFnsUtils from '@date-io/date-fns';
import { AntDesign } from '@expo/vector-icons';
import { KeyboardDatePicker, MuiPickersUtilsProvider } from '@material-ui/pickers';
import makeStyles from "@material-ui/styles/makeStyles";
import { Formik } from 'formik';
import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, TextInput, View } from 'react-native';
import { ListItem } from 'react-native-elements';
import { FlatList, ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import withQuery from 'with-query';
import { ApiInfo } from '../../../ApiEndpoints';
import { PageBackground } from '../../../assets/Color Constants/WebColors';
import FormButton from '../../../components/FormButton';
import { PersonalModuleBreadCrumbs } from '../../../components/WebComponents/BreadCrumbs/Personal';
import Footer from '../../../components/WebComponents/footer';
// import MyDatePicker from '../../../../components/WebComponents/DateRangePicker';
import SecondHeaderButtons from '../../../components/WebComponents/SecondHeaderButtons';
import { PersonalPageBlueCard } from '../../../components/WebComponents/SidebarNavigatonComponents/Personal';
import { StaticWordsWeb } from '../../staticwordsFile';

// const Footer=React.lazy(()=> import ('../../../components/WebComponents/footer'));
// const SecondHeaderButtons=React.lazy(()=>import ('../../../components/WebComponents/SecondHeaderButtons'));
// const FormButton=React.lazy(()=>import ('../../../components/FormButton'));
// const Demo=React.lazy(()=>import ('../../demo'));
 
const useStyles = makeStyles({
  root: {
    "& .MuiInputBase-root": { 
      padding: 0, 
      
      "& .MuiButtonBase-root": {
        padding: 0,
        paddingLeft: 10,
        borderWidth:0,
      },
      "& .MuiInputBase-input": {
        padding: 8,
        paddingLeft: 30,
        borderWidth:0,
      },

      
    },
    
   } }
);



//const db = SQLite.openDatabase('db.testDb1')

// const DarkCyanActiveColor='#0079AE'
// const DarkCyanInactiveColor='#0085BF'

export default function ProfileWeb(){
    const classes = useStyles();

    const [empid, setEmpid] = React.useState(null); 
    const [name,setName]= React.useState(null);
    const [email,setEmail]=React.useState(null);
    const [skype,setSkype]=React.useState(null);
    const [join_date,setJoin_date]=React.useState(null);
    const [dob,setDob]=React.useState(null);
    const [designation,setDesignation]=React.useState(null);
    const [pending_leaves,setPending_leaves]=React.useState(null);
    const [leaves,setLeaves]=React.useState(null);
    const [last_appraisal_date,setLast_appraisal_date]=React.useState(null);
    const [next_appraisal_date,setNext_appraisal_date]=React.useState(null);
    const [appraiser_name,setAppraiser_name]=React.useState(null);
    const [current_address,setCurrent_address]=React.useState('');
    const [permanent_address,setPermanent_address]=React.useState('');
    const [p_contact_num,setP_contact_num]=React.useState( '');
    const [s_contact_num,setS_contact_num]=React.useState('');
    const [pan_num,setPan_num]=React.useState('');
    const [bank_name,setBank_name]=React.useState('');
    const [branch_name,setBranch_name]=React.useState('');
    const [acc_num,setAcc_num]=React.useState('');
    const [acc_holder_name,setAcc_holder_name]=React.useState('');
    const [ifsc,setIfsc]=React.useState('');
  
    let updateAllStates = (empid,name,email,skype,join_date,dob,designation,pending_leaves,leaves,last_appraisal_date,next_appraisal_date,appraiser_name,current_address,permanent_address,p_contact_num,s_contact_num,pan_num,bank_name,branch_name,acc_num,acc_holder_name,ifsc) => {
        setEmpid(empid);  
        setName(name);
        setEmail(email),
        setSkype(skype),
        setJoin_date(join_date),
        setDob(dob),
        setDesignation(designation),
        setPending_leaves(pending_leaves),
        setLeaves(leaves),
        setLast_appraisal_date(last_appraisal_date),
        setNext_appraisal_date(next_appraisal_date),
        setAppraiser_name(appraiser_name),
        setCurrent_address(current_address),
        setPermanent_address(permanent_address),
        setP_contact_num(p_contact_num),
        setS_contact_num(s_contact_num),
        setPan_num(pan_num),
        setBank_name(bank_name),
        setBranch_name(branch_name),
        setAcc_num(acc_num),
        setAcc_holder_name(acc_holder_name),
        setIfsc(ifsc)
        setLoading(true)
    };

  const fname=String(name).split(" ");
  var [objectives,setObjectives]=React.useState([]);
 
  const [isLoaded,setLoading]=React.useState(false);
  const [objectivesLoaded,setObjectivesLoaded]=React.useState(false);
 
   
  React.useEffect(() => {
                               // localStorage.getItem('password')==null?navigation.navigate('Login'):null
                              console.log(JSON.parse(localStorage.getItem('empDetails')).emp_id)
                                objectives.length=0;
                                fetch(ApiInfo.baseUrlForWeb+ApiInfo.objectivesEndpoint , 
                                    { method:'GET', 
                                      headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem("username")+ ':' + localStorage.getItem("password")),
                                                'accept':'application/json',
                                                'content-type':'application/json' 
                                              }
                                      
                                    }
                                    )
                                    .then(response => response.json())
                                    .then(json => { 
                                                    if(json.success){
                                                  
                                                        for(let i=0;i<json.data.length;i++){
                                                          objectives.push(json.data[i].objectives) 
                                                          i==json.data.length-1?(setObjectivesLoaded(true),console.log(objectives)):null
                                                        }
                                                        console.log(objectives+'objectives')
                                                    }
                                                }
                                        )
                                    
                                // db.transaction(tx => {
                                //     // sending 4 arguments in executeSql
                                //     tx.executeSql('SELECT * FROM statusInfo', null, // passing sql query and parameters:null
                                //         // success callback which sends two things Transaction object and ResultSet Object
                                //         (txObj,results ) => 
                                //         {
                                //             var len = results.rows.length;
                                //             for (let i = 0; i < len; i++) {
                                //                 let row = results.rows.item(i);
                                //                 console.log(`Employee id: ${row.empid_id},Name : ${row.name} `);
                                //                 updateAllStates(
                                //                     row.emp_id,
                                //                     row.name,
                                //                     row.email_id,
                                //                     row.skype_id,
                                //                     row.joining_date,
                                //                     row.dob,
                                //                     row.designation,
                                //                     row.pen_leaves,
                                //                     row.leaves,
                                //                     row.last_appraisal_date,
                                //                     row.next_appraisal_date,
                                //                     row.appraiser_name,
                                //                     row.c_address,
                                //                     row.p_address,
                                //                     row.p_contact_num,
                                //                     row.c_contact_num,
                                //                     row.pan_no,
                                //                     row.bank_name,
                                //                     row.branch_name,
                                //                     row.account_number,
                                //                     row.account_holder_name,
                                //                     row.ifsc_code,

                                //                 );
                                                
                                //             }
                                //         } ,
                                //         // failure callback which sends two things Transaction object and Error
                                //         (txObj, error) => console.log('Error ', error)
                                //         ) // end executeSQL
                                //     })
                                fetch(ApiInfo.baseUrlForWeb+ApiInfo.loginEndpoint , 
                                    { method:'POST', 
                                    headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem('username')+':'+localStorage.getItem('password'))
                                        
                                            }
                                    }
                                    )
                                .then(response => response.json())
                                 .then(json => {   
                                                    if(json.success)
                                                    {  
                                                                          updateAllStates(
                                                                            json.data.emp_id,
                                                                            json.data.name,
                                                                            json.data.email_id,
                                                                            json.data.skype_id,
                                                                            json.data.joining_date,
                                                                            json.data.dob,
                                                                            json.data.designation,
                                                                            json.data.pen_leaves,
                                                                            json.data.leaves,
                                                                            json.data.last_appraisal_date,
                                                                            json.data.next_appraisal_date,
                                                                            json.data.appraiser_name,
                                                                            json.data.c_address,
                                                                            json.data.p_address,
                                                                            json.data.p_contact_num,
                                                                            json.data.c_contact_num,
                                                                            json.data.pan_no,
                                                                            json.data.bank_name,
                                                                            json.data.branch_name,
                                                                            json.data.account_number,
                                                                            json.data.account_holder_name,
                                                                            json.data.ifsc_code
                                                                        )
                                                                        
                                                    
                                                }
                                                
                                }
                                )
                                .catch(error=>console.log(error))     
                                
                                  
                        
                           }, []
    );
 
    return(
          
        <View style={{flex:1}} >

          <React.Suspense fallback={null}>
                   
            <View style={{   
                             backgroundColor:PageBackground.MidnightBlue,
                             position:'relative',
                             flex:1, }}
            >
                
                <SecondHeaderButtons />
                
                <View style={{alignItems:'center',flexGrow:1}}>
                                 
                  <Card style={{
                              width:responsiveWidth(63)  , 
                              borderRadius:10, 
                              marginTop:responsiveHeight(6)  ,            // WHITE CARD
                              flexGrow:1,alignSelf:'center'
                            }}>
                                
                    <View style={{flexDirection:'row', }}>           
                    
                        {PersonalPageBlueCard.Profile()}  

                        <View style={{marginHorizontal: responsiveWidth(3),
                                   marginTop:responsiveHeight(3)}}>
                           
                            <View style={{flexDirection:'row',justifyContent:'space-between'
                                                              }}>
                                                    <View style={{flexDirection:'row',minWidth:responsiveWidth(15),justifyContent:'space-between'}}>
                                                      <Image source={require('../../../assets/images/profile.jpeg')} style={{height:35,width:35,borderRadius:30}} />
                                                        <Text style={{color:'#333333',fontSize:responsiveFontSize(1.2),fontWeight:'500',alignSelf:'center'}}>
                                                          Welcome {localStorage.getItem('loginUserName')}
                                                          </Text> 
                                                    </View>
                                                    <View style={{flexDirection:'row',alignSelf:'center'}}>
                                                             {PersonalModuleBreadCrumbs.ProfilePageBreadCrumb()}
                                                    </View>
                                                    
                            </View> 

                            <Formik 
            
                                initialValues={{ 
                                                     p_contact_num:'',
                                                branch_name:'',acc_num:'',acc_holder_name:'', 
                                                ifsc:'',bank_name:``,pan_num:'',s_contact_num:'',
                                                current_address:'',permanent_address:'' 
          
                                                }} //must required to store form intitial values else after writing the field wont keep the values in the field
                                
                                onSubmit={
                                (values,{resetForm})=>{   
                                        // console.log(values.p_contact_num,
                                        //     values. branch_name,values.acc_num,
                                        //     values.acc_holder_name, values.ifsc,
                                        //     values.bank_name,values.pan_num, 
                                        //     values.s_contact_num,values.current_address,values.permanent_address)
                                    // setIfsc(values.ifsc)
                                            fetch(withQuery(ApiInfo.baseUrlForWeb+ApiInfo.updateProfileEndpoint,{"id": String(JSON.parse(localStorage.getItem('empDetails')).emp_id)}) ,
                                            {
                                            method :'POST',
                                            headers: {'Authorization': 'Basic ' +btoa(localStorage.getItem('username')+':'+localStorage.getItem('password'))
                                            ,
                                                        'accept':'application/json',
                                                        'content-type':'application/json',
                                                        
                                                        },
                                            body:JSON.stringify({
                                                "bank_name":`${values.bank_name==''?bank_name:values.bank_name}`,
                                                "branch_name":`${values.branch_name==''?branch_name:values.branch_name}` ,
                                                "account_number": `${values.acc_num==''?acc_num:values.acc_num}` , 
                                                "account_holder_name":`${values.acc_holder_name==''?acc_holder_name:values.acc_holder_name}`  ,
                                                "ifsc_code": `${values.ifsc==''?ifsc:values.ifsc}`,
                                                "pan_no": `${values.pan_num==''?pan_num:values.pan_num}`,
                                                "p_contact_num":`${values.p_contact_num==''?p_contact_num:values.p_contact_num}`,
                                                "c_contact_num":`${values.s_contact_num==''?s_contact_num:values.s_contact_num}` ,
                                                "p_address":`${values.permanent_address==''?permanent_address:values.permanent_address}`,
                                                "c_address":`${values.current_address==''?current_address:values.current_address}`,
                                                "dob":dob
                                            })
                                                
                                            }
                                            )
                                            .then(response => response.json())
                                            .then(json => {   
                                                    if(json.success)
                                                    {
                                                    
                                                    
                                                    alert( json.data.msg) 
                                                    fetch(ApiInfo.baseUrlForWeb+ApiInfo.loginEndpoint , 
                                                        { method:'POST', 
                                                        headers: {'Authorization': 'Basic ' + btoa(localStorage.getItem('username')+':'+localStorage.getItem('password'))
                
                                                                }
                                                        }
                                                        )
                                                        .then(response => response.json())
                                                        .then(json => {   
                                                                            if(json.success)
                                                                            { 
                                                                                                updateAllStates(
                                                                                                    json.data.emp_id,
                                                                                                    json.data.name,
                                                                                                    json.data.email_id,
                                                                                                    json.data.skype_id,
                                                                                                    json.data.joining_date,
                                                                                                    json.data.dob,
                                                                                                    json.data.designation,
                                                                                                    json.data.pen_leaves,
                                                                                                    json.data.leaves,
                                                                                                    json.data.last_appraisal_date,
                                                                                                    json.data.next_appraisal_date,
                                                                                                    json.data.appraiser_name,
                                                                                                    json.data.c_address,
                                                                                                    json.data.p_address,
                                                                                                    json.data.p_contact_num,
                                                                                                    json.data.c_contact_num,
                                                                                                    json.data.pan_no,
                                                                                                    json.data.bank_name,
                                                                                                    json.data.branch_name,
                                                                                                    json.data.account_number,
                                                                                                    json.data.account_holder_name,
                                                                                                    json.data.ifsc_code
                                                                                                )
                                                                                                resetForm();
                                                                            }
                                                                            else{
                                                                                alert('Enter any of the field to submit.')
                                                                                                  
                                                                            }
                                                                        
                                                              }
                                                        )
                                                        .catch(error=>console.log(error))         
                                                                                
                                                
                                                    
                                                    }
                                                    else{
                                                    console.log(json.message)
                                                    }
                        
                                                }
                                                )
                                            .then(error => console.log(error))
                            
                                    
                                    }}
                            
                            >
                            
                            {({ handleChange, values, handleSubmit,errors,touched,handleBlur,setFieldValue}) => (
                        
                            <Card 
                                    style={{  
                                            width:responsiveWidth(42)  ,
                                            height:responsiveHeight(62),
                                            borderRadius:10,
                                            backgroundColor:'#F3F1F1', 
                                            paddingLeft:responsiveWidth(2),
                                            //paddingRight:responsiveWidth(2),
                                            marginTop:responsiveHeight(1)  ,             //FORM CARD CONTAINER
                                            }}
                                >
                                {
                                 isLoaded&&objectivesLoaded
                                 ? 
                                 <ScrollView 
                                            style={{paddingRight:responsiveWidth(2)}}
                                   >
                                    <Text 
                                            style={{fontWeight:'700',
                                                fontSize:responsiveFontSize(1.5),
                                                color:'#333333',
                                                marginTop:responsiveHeight(2),
                                                marginBottom:responsiveHeight(3)
                                                }}>

                                    {StaticWordsWeb.ProfilePage.header}

                                    </Text>
                                    
                                    <View 
                                            style={{
                                                    justifyContent:'space-between',
                                                    flexDirection:'row', 
                                                    marginBottom:responsiveHeight(2)
                                                    }}
                                        > 
                                            
                                            <TextInput 
                                                    placeholder={`First Name : ${fname[0]}`}
                                                        editable={false}      
                                                        placeholderTextColor={'#333333' }                         
                                                    // value={values.firstName}
                                                        style={{        
                                                                borderColor:'#ECECEC', 
                                                                paddingVertical:3,
                                                                backgroundColor:'#fff',
                                                                // borderColor: '#DEDEDE', 
                                                                borderWidth: 1 ,
                                                                borderRadius:5,
                                                                height:responsiveHeight(6) ,
                                                                width:responsiveWidth(30),
                                                                paddingLeft:responsiveWidth(.9),
                                                                fontSize:responsiveFontSize(1)
                                                                // borderColor: this.state.borderColor
                                                                }} 
                                                        onBlur={handleBlur('firstName')}
                                                        onChangeText ={handleChange('firstName')} 
                                                        //onTextInput={ () => this.onTextInput('username') }
                                                        // onFocus={color='#295584'}
                                            />
                                            <TextInput 
                                                        placeholder={`Last Name : ${fname[fname.length-1]}`}   
                                                        placeholderTextColor={'#333333'}
                                                        editable={false}                           
                                                        //value={values.lastName}
                                                        style={{
                                                                borderColor:'#ECECEC', 
                                                                paddingVertical:3,
                                                                backgroundColor:'#fff',
                                                                // borderColor: '#DEDEDE',
                                                                marginLeft:responsiveWidth(2), 
                                                                borderWidth: 1 ,
                                                                borderRadius:5, 
                                                                height:responsiveHeight(6) ,
                                                                width:responsiveWidth(30),
                                                                paddingLeft:responsiveWidth(.7),
                                                                fontSize:responsiveFontSize(1),
                                                                // borderColor: this.state.borderColor
                                                                }} 
                                                        onBlur={handleBlur('lastName')}
                                                        onChangeText ={handleChange('lastName')} 
                                                        //onTextInput={ () => this.onTextInput('username') }
                                                        // onFocus={color='#295584'}
                                            />
                                    </View> 
                                    <View 
                                        style={{  
                                                marginBottom:'2%',
                                                }}
                                    >
                                        <TextInput 
                                                    placeholder={`Email : ${email} `}
                                                    editable={false}      
                                                    placeholderTextColor={'#333333' }                               
                                                    value={values.email}
                                                    style         ={{borderColor:'#ECECEC',  
                                                                    paddingVertical:3,
                                                                    backgroundColor:'#fff',
                                                                    height:responsiveHeight(6) , 
                                                                    // borderColor: '#DEDEDE', 
                                                                    borderWidth: 1 ,
                                                                    borderRadius:5, 
                                                                    paddingLeft:responsiveScreenWidth(.9),
                                                                    fontSize:responsiveFontSize(1),
                                                                    // borderColor: this.state.borderColor
                                                                    }} 
                                                    onBlur={handleBlur('email')}
                                                    onChangeText ={handleChange('email')} 
                                        />
                                    </View>
                                    <View 
                                        style={{  
                                                marginBottom:'2%',
                                                }}
                                    >
                                        <TextInput 
                                                    placeholder= {`Skype ID : ${skype} `}
                                                    placeholderTextColor={'#33333380' }                              
                                                    editable={false}
                                                    style         ={{borderColor:'#ECECEC',  
                                                                    paddingVertical:3,
                                                                    backgroundColor:'#fff',
                                                                    height:responsiveHeight(6) , 
                                                                    // borderColor: '#DEDEDE', 
                                                                    borderWidth: 1 ,
                                                                    borderRadius:5, 
                                                                    paddingLeft:responsiveScreenWidth(.9),
                                                                    fontSize:responsiveFontSize(1),
                                                                    // borderColor: this.state.borderColor
                                                                    }} 
                                        />
                                    </View>

                                    <View style={{
                                                    marginBottom:'2%',
                                                    flexDirection:'row',
                                                    justifyContent:'space-between',
                                                    
                                                }}
                                    > 
                                        <TextInput 
                                                    placeholder={`Joining Date : ${join_date} `}
                                                    editable={false}
                                                    placeholderTextColor={'#333333' }                              
                                                    //value={values.email}
                                                    style         ={{borderColor:'#ECECEC',  
                                                                    paddingVertical:3,
                                                                    backgroundColor:'#fff',
                                                                    height:responsiveHeight(6) ,                                                                width:responsiveWidth(15), 
                                                                    width:responsiveWidth(15.5), 
    
                                                                    // borderColor: '#DEDEDE', 
                                                                    borderWidth: 1 ,
                                                                    borderRadius:5, 
                                                                    paddingLeft:responsiveScreenWidth(.9),
                                                                    fontSize:responsiveFontSize(1),
                                                                    // borderColor: this.state.borderColor
                                                                    }} 
                                                    // onBlur={handleBlur('email')}
                                                    // onChangeText ={handleChange('email')} 
                                        />
                                        {/* < MyDatePicker placeholder='Joining Date' /> */}
                                        {/* < MyDatePicker placeholder='Date Of Birth' /> */}

                                            <MuiPickersUtilsProvider utils={DateFnsUtils}> 
                                        
                                            <KeyboardDatePicker
                                            
                                                                InputProps={{disableUnderline:true,
                                                                            style:{ height:responsiveHeight(6),paddingTop:responsiveHeight(0),paddingBottom:responsiveHeight(0),borderBottomWidth:0}}}
                                                                autoOk
                                                                variant="inline"
                                                                // inputVariant='standard'
                                                                openTo={'year'}
                                                                views={['year',"month",'date']}
                                                                format="MM/dd/yyyy"
                                                                value={new Date(dob).toLocaleDateString()}
                                                                InputAdornmentProps={{ position: "start" }}
                                                            
                                                                onChange={(value)=>{setDob(new Date(value).toLocaleDateString('fr-CA'))}}
                                                                className={classes.root}
                                                                 style={{ 
                                                                    backgroundColor:'#fff',
                                                                    width:responsiveWidth(15),
                                                                    fontSize:responsiveFontSize(1), 
                                                                    borderRadius:5, 
                                                                    borderBottomWidth:0

                                                                }}
                                                        //     disableFuture
                                                        //     autoOk
                                                        //     openTo={'year'}
                                                        //    views={["year", "month", "date"]}
                                                        //     onChange={(value)=>{setDob(new Date(value).toLocaleDateString('fr-CA'))}}//toLocaleDateString('fr-CA')coverts date-time string to only YYYY-MM-DD whereas toLocaleDateString() only converts to MM-DD-YYYY
                                                        //     format="dd/MM/yyyy" 
                                                        //    InputProps={{style:{textDecoration:'none',height:responsiveHeight(2),paddingTop:responsiveHeight(0),paddingBottom:responsiveHeight(0)}}}
                                                        //    emptyLabel
                                                        //      style={{ 
                                                        //             backgroundColor:'#fff',
                                                        //             width:responsiveWidth(11),
                                                        //               fontSize:responsiveFontSize(1), 
                                                        //             borderRadius:5,

                                                        //           }}
                                                        keyboardIcon={
                                                        <View style={{alignItems:'center',flexDirection:'row',justifyContent:'space-between',width:responsiveWidth(4)}}> 
                                                            <Text style={{fontSize:responsiveFontSize(1)}}>DOB</Text>
                                                            <AntDesign name="calendar" size={20} style={{marginTop:0,paddingVertical:0}} color="black" />
                                                        </View>
                                                        } 
                                                        //     value={new Date(dob).toLocaleDateString()} 
                                                            
                                                    />
                                                    </MuiPickersUtilsProvider>
                                    
                                    </View>
                                    
                                    
                                    <View 
                                        style={{  
                                                marginBottom:'2%',   zIndex:-1
                                                }}
                                    >
                                        <TextInput 
                                                    placeholder={`Designation : ${designation}`}
                                                    editable={false}
                                                    placeholderTextColor={'#333333' }                              
                                                    value={values.email}
                                                    style         ={{borderColor:'#ECECEC',  
                                                                    paddingVertical:3,
                                                                    backgroundColor:'#fff',
                                                                    height:responsiveHeight(6) , 
                                                                    // borderColor: '#DEDEDE', 
                                                                    borderWidth: 1 ,
                                                                    borderRadius:5, 
                                                                    paddingLeft:responsiveScreenWidth(.9),
                                                                    fontSize:responsiveFontSize(1),
                                                                    // borderColor: this.state.borderColor
                                                                    }} 
                                                    onBlur={handleBlur('email')}
                                                    onChangeText ={handleChange('email')} 
                                        />
                                    </View>
                                    <View 
                                        style={{  
                                                marginBottom:'2%',   zIndex:-1
                                                }}
                                    >
                                        <TextInput 
                                                    placeholder={`Pending Leaves : ${pending_leaves}`} 
                                                    editable={false}
                                                    placeholderTextColor={'#333333' }                              
                                                    value={values.email}
                                                    style         ={{borderColor:'#ECECEC',  
                                                                    paddingVertical:3,
                                                                    backgroundColor:'#fff',
                                                                    height:responsiveHeight(6) , 
                                                                    // borderColor: '#DEDEDE', 
                                                                    borderWidth: 1 ,
                                                                    borderRadius:5, 
                                                                    paddingLeft:responsiveScreenWidth(.9),
                                                                    fontSize:responsiveFontSize(1),
                                                                    // borderColor: this.state.borderColor
                                                                    }} 
                                                    onBlur={handleBlur('email')}
                                                    onChangeText ={handleChange('email')} 
                                        />
                                    </View>
                                    <View 
                                        style={{  
                                                marginBottom:'2%',   zIndex:-1
                                                }}
                                    >
                                        <TextInput 
                                                    placeholder={`Leaves : ${leaves}`} 
                                                    placeholderTextColor={'#333333' }
                                                    editable={false}                              
                                                    value={values.email}
                                                    style         ={{borderColor:'#ECECEC',  
                                                                    paddingVertical:3,
                                                                    backgroundColor:'#fff',
                                                                    height:responsiveHeight(6) , 
                                                                    // borderColor: '#DEDEDE', 
                                                                    borderWidth: 1 ,
                                                                    borderRadius:5, 
                                                                    paddingLeft:responsiveScreenWidth(.9),
                                                                    fontSize:responsiveFontSize(1),
                                                                    // borderColor: this.state.borderColor
                                                                    }} 
                                                    onBlur={handleBlur('email')}
                                                    onChangeText ={handleChange('email')} 
                                        />
                                    </View>
                                    
                                    <View style={{  marginTop:'2%',
                                                    marginBottom:'2%',
                                                    flexDirection:'row',
                                                    justifyContent:'space-between',
                                                    zIndex:-1
                                                }}
                                    > 

                                        <TextInput 
                                                    placeholder={`Last Appraiser Date : ${last_appraisal_date} `}
                                                    editable={false}
                                                    placeholderTextColor={'#333333' }                              
                                                    //value={values.email}
                                                    style         ={{borderColor:'#ECECEC',  
                                                                    paddingVertical:3,
                                                                    backgroundColor:'#fff',
                                                                    height:responsiveHeight(6) ,                                                                width:responsiveWidth(15), 
                                                                    width:responsiveWidth(15.5), 
    
                                                                    // borderColor: '#DEDEDE', 
                                                                    borderWidth: 1 ,
                                                                    borderRadius:5, 
                                                                    paddingLeft:responsiveScreenWidth(.9),
                                                                    fontSize:responsiveFontSize(1),
                                                                    // borderColor: this.state.borderColor
                                                                    }} 
                                                    // onBlur={handleBlur('email')}
                                                    // onChangeText ={handleChange('email')} 
                                        />
                                        <TextInput 
                                                    placeholder={`Next Appraiser Date : ${next_appraisal_date} `}
                                                    editable={false}
                                                    placeholderTextColor={'#333333' }                              
                                                    //value={values.email}
                                                    style         ={{borderColor:'#ECECEC',  
                                                                    paddingVertical:3,
                                                                    backgroundColor:'#fff',
                                                                    height:responsiveHeight(6) ,
                                                                    width:responsiveWidth(15.5), 
                                                                    // borderColor: '#DEDEDE', 
                                                                    borderWidth: 1 ,
                                                                    borderRadius:5, 
                                                                    paddingLeft:responsiveScreenWidth(.9),
                                                                    fontSize:responsiveFontSize(1),
                                                                    // borderColor: this.state.borderColor
                                                                    }} 
                                                    // onBlur={handleBlur('email')}
                                                    // onChangeText ={handleChange('email')} 
                                        /> 
                                    {/* <MyDatePicker placeholder='Last Appraisal Date' />
                                    <MyDatePicker placeholder='Next Appraisal Date'/> */}
                                    
                                    </View>
                                    
                                    <View 
                                        style={{  
                                                marginBottom:'2%',   zIndex:-2
                                                }}
                                    >
                                        <TextInput 
                                                    placeholder={`Appraiser Name : ${appraiser_name}`} 
                                                    editable={false}
                                                    placeholderTextColor={'#333333' }                              
                                                    value={values.email}
                                                    style         ={{borderColor:'#ECECEC',  
                                                                    paddingVertical:3,
                                                                    backgroundColor:'#fff',
                                                                    height:responsiveHeight(6) , 
                                                                    // borderColor: '#DEDEDE', 
                                                                    borderWidth: 1 ,
                                                                    borderRadius:5, 
                                                                    paddingLeft:responsiveScreenWidth(.9),
                                                                    fontSize:responsiveFontSize(1),
                                                                    // borderColor: this.state.borderColor
                                                                    }} 
                                                    onBlur={handleBlur('email')}
                                                    onChangeText ={handleChange('email')} 
                                        />
                                    </View>

                                    <View style={{ marginBottom:'1%',zIndex:-2
                                            }}> 
                                                                                                    
                                        <TextInput   
                                            placeholder={`Current Address : ${current_address}`}
                                            
                                            value={values.current_address} 
                                            placeholderTextColor='#333333'
                                            multiline
                                            style={{
                                                    textAlignVertical:'top',
                                                    borderColor:'#ECECEC',
                                                    borderWidth:1,
                                                    paddingTop:13, 
                                                    fontWeight:'400',
                                                    backgroundColor:'#fff' , 
                                                    marginTop:5,
                                                    height:responsiveScreenHeight(15),  
                                                    borderRadius:5,
                                                    paddingLeft:13, 
                                                    fontSize:responsiveFontSize(1),
                                                    }}
                                            onBlur={handleBlur('current_address')}
                                            onChangeText={handleChange('current_address')} 
                                            
                                        />
                                    </View> 
                                    <View style={{ marginBottom:'1%',   zIndex:-2
                                            }}> 
                                                                                                    
                                        <TextInput   
                                            placeholder={`Permanent Address : ${permanent_address}`}
                                            placeholderTextColor='#333333'
                                            multiline
                                            value={values.permanent_address}
                                            style={{
                                                        textAlignVertical:'top',
                                                        borderColor:'#ECECEC',
                                                        borderWidth:1,
                                                        paddingTop:13, 
                                                        fontWeight:'400',
                                                        backgroundColor:'#fff' , 
                                                        marginTop:5,
                                                        height:responsiveScreenHeight(15),  
                                                        borderRadius:5, paddingLeft:13, fontSize:responsiveFontSize(1),
                                            }} 
                                            onBlur={handleBlur('permanent_address')}
                                            onChangeText={handleChange('permanent_address')} 
                                        />
                                    </View> 

                                    <View 
                                        style={{  
                                                marginBottom:'2%',   zIndex:-2
                                                }}
                                    >
                                        <TextInput 
                                                    placeholder={`Primary Contact Number : ${p_contact_num}`} 
                                                
                                                    placeholderTextColor={'#333333' }                              
                                                    value={values.p_contact_num}
                                                    style         ={{borderColor:'#ECECEC',  
                                                                    paddingVertical:3,
                                                                    backgroundColor:'#fff',
                                                                    height:responsiveHeight(6) , 
                                                                    // borderColor: '#DEDEDE', 
                                                                    borderWidth: 1 ,
                                                                    borderRadius:5, 
                                                                    paddingLeft:responsiveScreenWidth(.9),
                                                                    fontSize:responsiveFontSize(1),
                                                                    // borderColor: this.state.borderColor
                                                                    }} 
                                                    onBlur={handleBlur('p_contact_num')}
                                                    onChangeText ={handleChange('p_contact_num')} 
                                        />
                                    </View>
                                    <View 
                                        style={{  
                                                marginBottom:'2%',   zIndex:-2
                                                }}
                                    >
                                        <TextInput 
                                                    placeholder={`SecondaryContact Number : ${s_contact_num}`} 
                                                
                                                    placeholderTextColor={'#333333' }                              
                                                    value={values.s_contact_num}
                                                    style         ={{borderColor:'#ECECEC',  
                                                                    paddingVertical:3,
                                                                    backgroundColor:'#fff',
                                                                    height:responsiveHeight(6) , 
                                                                    // borderColor: '#DEDEDE', 
                                                                    borderWidth: 1 ,
                                                                    borderRadius:5, 
                                                                    paddingLeft:responsiveScreenWidth(.9),
                                                                    fontSize:responsiveFontSize(1),
                                                                    // borderColor: this.state.borderColor
                                                                    }} 
                                                    onBlur={handleBlur('s_contact_num')}
                                                    onChangeText ={handleChange('s_contact_num')} 
                                        />
                                    </View>

                                    <View 
                                        style={{  
                                                marginBottom:'2%',   zIndex:-2
                                                }}
                                    >
                                        <TextInput 
                                                    placeholder={`Pan Number: ${pan_num}`} 
                                                
                                                    placeholderTextColor={'#333333' }                              
                                                    value={values.pan_num}
                                                    style         ={{borderColor:'#ECECEC',  
                                                                    paddingVertical:3,
                                                                    backgroundColor:'#fff',
                                                                    height:responsiveHeight(6) , 
                                                                    // borderColor: '#DEDEDE', 
                                                                    borderWidth: 1 ,
                                                                    borderRadius:5, 
                                                                    paddingLeft:responsiveScreenWidth(.9),
                                                                    fontSize:responsiveFontSize(1),
                                                                    // borderColor: this.state.borderColor
                                                                    }} 
                                                    onBlur={handleBlur('pan_num')}
                                                    onChangeText ={handleChange('pan_num')} 
                                        />
                                    </View>

                                    <View 
                                        style={{  
                                                marginVertical:responsiveHeight(2),   zIndex:-2
                                                }}
                                    >
                                        <Text style={{fontSize:responsiveFontSize(1.2),fontWeight:'bold',color:'#ee4000'}}>
                                            Bank Account Details
                                        </Text>

                                    </View>

                                    <View 
                                        style={{  
                                                marginBottom:'2%',   zIndex:-2
                                                }}
                                    >
                                        <TextInput 
                                                placeholder={`Bank Name: ${bank_name}`} 
                                            
                                                    placeholderTextColor={'#333333' }                              
                                                    value={values.bank_name}
                                                    style         ={{borderColor:'#ECECEC',  
                                                                    paddingVertical:3,
                                                                    backgroundColor:'#fff',
                                                                    height:responsiveHeight(6) , 
                                                                    // borderColor: '#DEDEDE', 
                                                                    borderWidth: 1 ,
                                                                    borderRadius:5, 
                                                                    paddingLeft:responsiveScreenWidth(.9),
                                                                    fontSize:responsiveFontSize(1),
                                                                    // borderColor: this.state.borderColor
                                                                    }} 
                                                    onBlur={handleBlur('bank_name')}
                                                    onChangeText ={handleChange('bank_name')} 
                                        />
                                    </View>

                                    <View 
                                        style={{  
                                                marginBottom:'2%',   zIndex:-2
                                                }}
                                    >
                                        <TextInput 
                                                    placeholder={`Branch Name: ${branch_name}`} 
                                                    
                                                    placeholderTextColor={'#333333' }                              
                                                    value={values.branch_name}
                                                    style         ={{borderColor:'#ECECEC',  
                                                                    paddingVertical:3,
                                                                    backgroundColor:'#fff',
                                                                    height:responsiveHeight(6) , 
                                                                    // borderColor: '#DEDEDE', 
                                                                    borderWidth: 1 ,
                                                                    borderRadius:5, 
                                                                    paddingLeft:responsiveScreenWidth(.9),
                                                                    fontSize:responsiveFontSize(1),
                                                                    // borderColor: this.state.borderColor
                                                                    }} 
                                                    onBlur={handleBlur('branch_name')}
                                                    onChangeText ={handleChange('branch_name')} 
                                        />
                                    </View>
                                    
                                    <View 
                                        style={{  
                                                marginBottom:'2%',   zIndex:-2
                                                }}
                                    >
                                        <TextInput 
                                                    placeholder={`Account Number : ${acc_num}`} 
                                                
                                                    placeholderTextColor={'#333333' }                              
                                                    value={values.acc_num}
                                                    style         ={{borderColor:'#ECECEC',  
                                                                    paddingVertical:3,
                                                                    backgroundColor:'#fff',
                                                                    height:responsiveHeight(6) , 
                                                                    // borderColor: '#DEDEDE', 
                                                                    borderWidth: 1 ,
                                                                    borderRadius:5, 
                                                                    paddingLeft:responsiveScreenWidth(.9),
                                                                    fontSize:responsiveFontSize(1),
                                                                    // borderColor: this.state.borderColor
                                                                    }} 
                                                    onBlur={handleBlur('acc_num')}
                                                    onChangeText ={handleChange('acc_num')} 
                                        />
                                    </View>

                                    <View 
                                        style={{  
                                                marginBottom:'2%',   zIndex:-2
                                                }}
                                    >
                                        <TextInput 
                                                    placeholder={`Account Holder's Name	 : ${acc_holder_name}`} 
                                                
                                                    placeholderTextColor={'#333333' }                              
                                                    value={values.acc_holder_name}
                                                    style         ={{borderColor:'#ECECEC',  
                                                                    paddingVertical:3,
                                                                    backgroundColor:'#fff',
                                                                    height:responsiveHeight(6) , 
                                                                    // borderColor: '#DEDEDE', 
                                                                    borderWidth: 1 ,
                                                                    borderRadius:5, 
                                                                    paddingLeft:responsiveScreenWidth(.9),
                                                                    fontSize:responsiveFontSize(1),
                                                                    // borderColor: this.state.borderColor
                                                                    }} 
                                                    onBlur={handleBlur('acc_holder_name')}
                                                    onChangeText ={handleChange('acc_holder_name')} 
                                        />
                                    </View>

                                    <View 
                                        style={{  
                                                marginBottom:'2%',   zIndex:-2
                                                }}
                                    >
                                        <TextInput 
                                                    placeholder={`IFSC Code : ${ifsc}`} 
                                                
                                                    placeholderTextColor={'#333333' }                              
                                                    value={values.ifsc}
                                                    style         ={{borderColor:'#ECECEC',  
                                                                    paddingVertical:3,
                                                                    backgroundColor:'#fff',
                                                                    height:responsiveHeight(6) , 
                                                                    // borderColor: '#DEDEDE', 
                                                                    borderWidth: 1 ,
                                                                    borderRadius:5, 
                                                                    paddingLeft:responsiveScreenWidth(.9),
                                                                    fontSize:responsiveFontSize(1),
                                                                    // borderColor: this.state.borderColor
                                                                    }} 
                                                    onBlur={handleBlur('ifsc')}
                                                    onChangeText ={handleChange('ifsc')} 
                                        />
                                    </View>

                                    <View 
                                        style={{  
                                                marginVertical:responsiveHeight(2),   zIndex:-2
                                                }}
                                    >
                                        <Text style={{fontSize:responsiveFontSize(1.2),fontWeight:'bold',color:'#ee4000'}}>
                                              Objectives set by you in the last appraisal.
                                        </Text>

                                    </View>
                                    <View>

                                     { 
                                            <FlatList          
                                            keyExtractor={(item, index) => index.toString()}
                                                                data={objectives}
                                                                renderItem={
                                                                                ({item,index}) => (    <ListItem style={{ marginTop:responsiveHeight(-2),marginLeft:responsiveWidth(-1) }}>
                                                                                
                                                                                <ListItem.Content>
                                                                                
                                                                                  <ListItem.Title style={{fontSize:responsiveFontSize(1.1),fontWeight:'500'}}>{index+1})  {item}</ListItem.Title>
                                                                                  
                                                                                </ListItem.Content>
                                                                                
                                                                                </ListItem>
                                                                                )}
                                            />  
                                         
                                     }
                                     </View>
                                    <View style={styles.buttonContainer}>                                   
                                        <FormButton
                                        buttonType='solid'
                                        // type='submit' see if needed in future
                                        onPress={handleSubmit}  //it calls the onSubmit(line:246) method passing the form value in object form
                                        title='SUBMIT' 
                                        titleStyle={{fontSize:responsiveFontSize(1),color:'#fff',fontWeight:'bold'}}
                                        buttonStyle={{ backgroundColor:'#F15A25', borderRadius:20,
                                                        paddingVertical:responsiveHeight(1) 
                                                                        
                                                    }} 
                                                    containerStyle={{width:responsiveScreenWidth(10),
                                                    marginTop:responsiveScreenHeight(1)}} 
                                        buttonColor='#a3f1ff'  
                                        />
                                    </View>
                              
                                </ScrollView>
                                :<ActivityIndicator style={{marginTop:responsiveHeight(20)}}>Please Wait...</ActivityIndicator> 
                            }
                                </Card> 
                            
                            )}
                        
                        </Formik>    
                        
                        </View>
                 
                    </View> 
                </Card>   
                 
                  <Footer/>
                
                </View>
           
            </View> 
        
          </React.Suspense>
        
        </View> 
     )
 }
 const styles = StyleSheet.create({
     
    buttonContainer:{
      marginTop:responsiveHeight(2), 
      marginBottom:responsiveHeight(5),
      alignItems:'center', 
    }
     
  }) 

