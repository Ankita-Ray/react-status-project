import { AntDesign, Entypo } from '@expo/vector-icons';
import moment from 'moment';
import React, { Component } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { CSVLink } from "react-csv";
import { ActivityIndicator, FlatList, Image, LayoutAnimation, Platform, StyleSheet, Text, TextInput, View } from 'react-native';
// import { Formik } from 'formik'; 
import { ListItem } from 'react-native-elements';
import { ScrollView } from 'react-native-gesture-handler';
import { Card } from 'react-native-paper';
import RNPickerSelect from 'react-native-picker-select';
import { responsiveFontSize, responsiveHeight, responsiveScreenHeight, responsiveScreenWidth, responsiveWidth } from 'react-native-responsive-dimensions';
import Icon from "react-native-vector-icons/MaterialIcons";
import Pagination from "react-paginating";
import { withRouter } from 'react-router';
import withQuery from 'with-query';
import { ApiInfo } from '../../../ApiEndpoints';
import DraggableList from '../../../components/DraggableList';
import FormButton from '../../../components/FormButton';
import Footer from '../../../components/WebComponents/footer';
import SecondHeaderButtons from '../../../components/WebComponents/SecondHeaderButtons';
import { StatusPageBlueCard } from '../../../components/WebComponents/SidebarNavigatonComponents/Status';
import { StaticWordsWeb } from '../../staticwordsFile';

// const DraggableList = React.lazy(() => import('../../../components/DraggableList')); 
// const Calendar = React.lazy(() => import('react-calendar'));   
// const FormButton = React.lazy(() => import('../../../components/FormButton'));
// const Footer = React.lazy(() => import  ('../../../components/WebComponents/footer'));
// const SecondHeaderButtons= React.lazy(() => import  ('../../../components/WebComponents/SecondHeaderButtons')); 
// const Demo=React.lazy(()=>import ('../../demo'));

const csvHeaders = [
  { label: "Client", key: "name" },
  { label: "Project", key: "proj_name" },
  { label: "Employee Name", key: "employee_name" },
  { label: "Task Details", key: "task_details" },
   { label: "Date", key: "date" },
  { label: "Start Time", key: "start_time" },
  { label: "End Time", key: "end_time" },
  { label: "Total Hours", key: "totalhrs" }


 
 
];  


 
const style = {
   pageItem: {
     display: "inline",
     position: "relative",
     padding: "0.5rem 0.75rem",
     marginLeft: "-1px",
     lineHeight: "0.25",
     color: "#ee4000",
     backgroundColor: "#fff",
     border: "1px solid #ee4000",
     touchAction: "manipulation",
     textDecoration: "none",
     cursor:"pointer",
     paddingLeft: 7,
     paddingRight: 7
   },
   pageItemActive: {
     color: "#fff",
     backgroundColor: "#ee4000",
     borderColor: "#ee4000"
   }
 }; 

const dateObj=new Date();

  
class CheckStatusWeb extends Component {

   constructor(props){
      super(props);
      this.state = 
                  {
                    date: null,
                    focus: 'startDate',
                    startDate: null,
                    endDate: null,
                    show:false,
                    dateRangeValue:null,
                    fromDate:new Date(),
                    toDate:new Date(),
                    csvData : [],
                    currentPage: 1,
                    total_records:null,
                    selectedEmployeeItem:'null',
                    selectedClientItem: null,
                    selectedProjectItems:null,
                    items : [],
                    items2:[],
                    projectItems:[],
                    loginEmpId:null, 
                    total_pages:null,
                    listHeaders:[{
                                    client:'Client',
                                    project:'Project',
                                    employee:'Employee',
                                    task:'Task Details',
                                    date:'Date',
                                    start:'Start Time',
                                    end:'End Time',
                                    hrs:'Total Hours',  
                                    
                                }],
                    listData:[],   

                   
                    expanded : false,
                    isLoaded: false, 
                  }
        
        
    }  

  
    componentDidMount(){
                       
                        var lists=[];
                        lists.length=0  
                        
                        const emp_details=JSON.parse(localStorage.getItem('empDetails'));
                         
                       const emp_name=emp_details.name;
                       const loginEmpId=emp_details.emp_id;
                      this.setState({loginEmpId:emp_details.emp_id});
                                                      
                        
                        fetch(ApiInfo.baseUrlForWeb+ApiInfo.employeeNameEndpoint,
                          {
                            method :'POST',
                            headers: {'Authorization': 'Basic ' +btoa(localStorage.getItem('username') + ':' + localStorage.getItem('password')) ,
                                        'accept':'application/json',
                                      'content-type':'application/json'
                                      },
                            body : JSON.stringify({
                              "emp_id":loginEmpId //localStorage.getItem('empid') //localStorage.getItem('empid'),
                              })
                          }
                          )
                          .then(response => response.json())
                          .then( (json) => {   
                                            if(json.success)
                                              {   
                                                if(json.data.length==0)  
                                                {
                                                  var eid_of_loggedin_User=loginEmpId;
                                                          
                                                  lists.push(
                                                    {label:emp_name,value:eid_of_loggedin_User.toString() ,color:'#333333'}//if dropdown not resets put value:eid.toString() here
                                                  ),
                                                  this.setState({items:lists,isLoaded:true});
                                                // console.log(this.state.items); 
                                                  
                                                this.setState({selectedEmployeeItem:eid_of_loggedin_User.toString()})
                                                }//inner if ends
                                                else{
                                                      for(let i=0;i<json.data.length;i++)
                                                        {
                                                          var row=json.data[i];
                                                          var eid=row.emp_id;
                                                          var eid_of_loggedin_User=localStorage.getItem('empid');  //***change */
                                                          

                                                            i==0
                                                            ?
                                                            lists.push(
                                                              {
                                                                label:emp_name,//it is for login user name
                                                                value:eid_of_loggedin_User.toString() ,color:'#333333'
                                                              },//if dropdown not resets put value:eid_of_loggedin_User.toString() here
                                                            //  {label:row.name,value:eid.toString() ,color:'#333333'}//if dropdown not resets put value:eid.toString() here
                                                            )
                                                            :
                                                            lists.push({label:row.name,value:eid.toString() ,color:'#333333'});//if dropdown not resets put value:eid.toString() here

                                                          i==(json.data.length-1)?( this.setState({items:lists,isLoaded:true}),console.log(this.state.items) ):null;
                                                        
                                                        }
                                              }//inner else ends
                                                
                                            }//outer if ends
                                              else {
                                                console.log('emp name is not fetched');
                                                
                                                
                                              }//outer else ends

                                          }
                                ); 
 

    }
     
    handlePageChange = (page, e) => {
       console.log(page)
       var draggableValue=JSON.parse(localStorage.getItem('dragValue')); 

      fetch(withQuery(ApiInfo.baseUrlForWeb+ApiInfo.checkStatusEndpoint, { 
         "emp_id":this.state.selectedEmployeeItem, //localStorage.getItem('selected_emp_id') ,
         "from_date":String(this.state.startDate.format('YYYY/MM/DD')),  //String(new Date(this.state.fromDate).getFullYear()+'/'+(new Date(this.state.fromDate).getMonth()+1)+'/'+new Date(this.state.fromDate).getDate() ),
           
         "to_date":String(this.state.endDate.format('YYYY/MM/DD')) ,//String(new Date(this.state.toDate).getFullYear()+'/'+(new Date(this.state.toDate).getMonth()+1)+'/'+new Date(this.state.toDate).getDate() )  
         "current_page":page,
       }
        ), 
        { 
        method:'POST', 
        headers: { 
        'accept':'application/json',
        'content-type':'application/json' ,
        "sort_by": draggableValue,

        },
        body:JSON.stringify({
                          "selected_project_id": this.state.selectedProjectItems,
                          "selected_client_id": this.state.selectedClientItem,
                          "sort_by":draggableValue
        })
        }
        )
        .then(response => response.json())
        .then(json => {   
        if(json.success)
        { 
        

          this.state.listData.splice(0, this.state.listData.length)
          var result= this.state.listData.concat( json.data.filter_data); 


          this.setState({listData: result,currentPage: page})

          console.log( json.data) 
        //  this.setState({items:this.state.selectedEmployeeItem})

        

        }
        else{
        console.log(json)
        }

        }
        )
        .then(error => console.log(error))

       };
   
   onChange=(val)=>{ 
                    this.setState({dateRangeValue:val}),
                    this.setState({show:false}),
                    this.setState({startDate:moment(new Date(val.toString().split(',')[0]).toLocaleDateString())}),
                    this.setState({endDate:moment(new Date(val.toString().split(',')[1]).toLocaleDateString())})  ;
         
      }

  render()
    {  
     
       const { currentPage } = this.state;

       const toggleExpand=async()=>{
                                LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);
                           
                                this.setState({expanded : !this.state.expanded});
                              
                                const response = await fetch(ApiInfo.baseUrlForWeb+ApiInfo.projDropdownForCheckStatusEndpoint,
                                  {
                                  method :'POST',
                                  headers: {
                                              'Authorization': 'Basic ' + btoa(localStorage.getItem("username")+ ":" + localStorage.getItem("password")),
                                              'accept':'application/json', 
                                              'content-type':'application/json'
                                           },
                                  body : JSON.stringify({
                                                "emp_id":  this.state.loginEmpId, 
                                                "selected_emp_id": localStorage.getItem('selected_emp_id'), 
                                                "selected_client_id"  :this.state.selectedClientItem
                                    })
                                  }
                                )
                                
                                const json = await response.json(); 
                               
                                if(json.success) 
                                {    console.log(json);
                                  this.setState({projectItems: []});
                                  if(json.data.length==1)
                                  {
                                      this.setState({projectItems:   this.state.projectItems.concat([{label:json.data[0].project_name,value:json.data[0].project_id,color:'#333333'}])});
                                    this.setState({selectedProjectItems:json.data[0].project_id})
                                  }
                                  else{
                                    this.setState({projectItems: []});
                                    for(let i=0;i<json.data.length;i++) 
                                    {
                                    this.setState({projectItems:   this.state.projectItems.concat([{label:json.data[i].project_name,value:json.data[i].project_id,color:'#333333'}])})
                                
                                    }}
                                }
                                else{
                                    console.log('client list is not fetched') 
                                }

                              };
                              
       const handleSubmit=()=>{
 
                                 var draggableValue=JSON.parse(localStorage.getItem('dragValue')); 
                                 console.log(draggableValue);

                                 this.state.selectedEmployeeItem=='null' || this.state.startDate==null || this.state.endDate==null
                                 ?
                                 alert('Select All Fields')
                                 :
                                 fetch(withQuery(ApiInfo.baseUrlForWeb+ApiInfo.checkStatusEndpoint, { 
                                                                                                "emp_id":this.state.selectedEmployeeItem, //localStorage.getItem('selected_emp_id') ,
                                                                                                "from_date":String(this.state.startDate.format('YYYY/MM/DD')),  //String(new Date(this.state.fromDate).getFullYear()+'/'+(new Date(this.state.fromDate).getMonth()+1)+'/'+new Date(this.state.fromDate).getDate() ),
           
                                                                                                "to_date":String(this.state.endDate.format('YYYY/MM/DD')) ,//String(new Date(this.state.toDate).getFullYear()+'/'+(new Date(this.state.toDate).getMonth()+1)+'/'+new Date(this.state.toDate).getDate() )  
                                                                                                
                                                                                                 "current_page":"1"
                                                                                              }
                                              ), 
                                              { 
                                                method:'POST', 
                                               headers: { 
                                                            'accept':'application/json',
                                                           'content-type':'application/json' 
                                                         },
                                                body:JSON.stringify({
                                                   "selected_project_id": this.state.selectedProjectItems,//==null?"": this.state.selectedProjectItems,
                                                  "selected_client_id": this.state.selectedClientItem,//==null?"": this.state.selectedClientItem
                                                  "sort_by": draggableValue,
                                                })
                                              }
                                    )
                                  .then(response => response.json())
                                  .then(json => {                                                      
                                                    console.log(json);
                                                    console.log(this.state.selectedEmployeeItem,this.state.startDate.format('YYYY/MM/DD'),this.state.endDate.format('YYYY/MM/DD'), this.state.selectedProjectItems,this.state.selectedClientItem)
                                                    if(json.success)
                                                    { 
                                                     // this.setState({selectedEmployeeItem:'null'})
                                                     // alert('Records Fetched');
 
                                                      this.state.listData.splice(0, this.state.listData.length)
                                                      var result= this.state.listData.concat( json.data.filter_data); 
                                                        
                                                      this.setState({listData: result})
                                                      const total_pages=json.data.total_records%10==0?json.data.total_records/10:Number((String(json.data.total_records/10).split('.')[0]))+1
                                                      this.setState({total_pages})
                                                  
                                                      this.setState({total_records:json.data.total_records})
                                                      toggleExpand();
                                                      
                                                
                                                      fetch(withQuery(ApiInfo.baseUrlForWeb+ApiInfo.checkStatusEndpoint, { 
                                                        "emp_id": localStorage.getItem('selected_emp_id') ,
                                                        "from_date":String(this.state.startDate.format('YYYY/MM/DD')),
                                                        "to_date": String(this.state.endDate.format('YYYY/MM/DD'))  ,
                                                          
                                                      }
                                                            ), 
                                                            { 
                                                              method:'POST', 
                                                            headers: { 
                                                                          'accept':'application/json',
                                                                        'content-type':'application/json' 
                                                                      },
                                                              body:JSON.stringify({
                                                                "selected_project_id": this.state.selectedProjectItems,
                                                                "selected_client_id": this.state.selectedClientItem
                                                              })
                                                            }
                                                      )
                                                      .then(response => response.json())
                                                      .then(json => {   console.log(json);
                                                        
                                                                      if(json.success)
                                                                      { 
                                                                        this.setState({csvData:[]});
                                                                       // this.setState({csvData:json.data.filter_data});
                                                                         localStorage.setItem('empNameOfsearchedStatus', json.data.filter_data[0].employee_name);     
                                                                        json.data.filter_data.map(item=>{
                                                                            this.setState({csvData:this.state.csvData.concat
                                                                                                      ([{ 
                                                                                                        "name" :item.name,
                                                                                                          "proj_name":item.proj_name,
                                                                                                          "employee_name":item.employee_name,
                                                                                                          "task_details":item.task_details,
                                                                                                          "date":item.date,
                                                                                                          "start_time":item.start_time,
                                                                                                          "end_time":item.end_time,
                                                                                                          "totalhrs":item.totalhrs
                                                                                                      }])

                                                                                            });
                                                                                           this.setState({projectItems: []});
                                                                                            
                                                                                            
                                                                        })//map end
                                                                      }//if ends
                                                                      
                                                                    }
                                                        );//then ends;

                                                      
                                                    }
                                                    else {
                                                      alert('Records Not Found.');
                                                     // this.setState({selectedEmployeeItem:'null'})
                                                    
                                                  } 
                                                }
                                      )
                                  .then(error => console.log(error))
  

                              };

        const onDatesChange = ({ startDate, endDate, focusedInput }) =>
        { 
          this.setState({ ...this.state, focus: focusedInput }, () =>
            this.setState({ ...this.state, startDate, endDate })
          );
          
          endDate ? this.setState({show:false}):null;
        
        }
    
        // const onDateChange = ({ date }) =>
        //   this.setState({ ...this.state, date });
        
        
          const{show,dateRangeValue}=this.state;
                         
     return(
    
       
        <View style={{flex:1,flexGrow:1}} >
          
           <React.Suspense fallback={null}>
          
              <View style={{
                              backgroundColor:'#003A59',
                              position:'relative',
                              flex:1
                           }}
              >
                 
                    <SecondHeaderButtons/>
                  
                  

                  <View style={{alignItems:'center',flexGrow:1}}>
                    
                    <Card style={{
                                  width:responsiveWidth(63)  ,  
                                  borderRadius:10, 
                                  marginTop:responsiveHeight(6)  ,            // WHITE CARD
                                  alignSelf:'center',
                                  flexGrow:1
                                }}
                    >
                                    
                      <View style={{flexDirection:'row' }} >           
                    
                        {StatusPageBlueCard.CheckStatus(this.props)}

                        <View style={{marginHorizontal: responsiveWidth(3),
                                      marginTop:responsiveHeight(3)}}
                          >
                                  <View style={{flexDirection:'row',justifyContent:'space-between'
                                                              }}>
                                                    <View style={{flexDirection:'row',minWidth:responsiveWidth(15),justifyContent:'space-between'}}>
                                                      <Image source={require('../../../assets/images/profile.jpeg')} style={{height:35,width:35,borderRadius:30}} />
                                                        <Text style={{color:'#333333',fontSize:responsiveFontSize(1.2),fontWeight:'500',alignSelf:'center'}}>
                                                          Welcome {localStorage.getItem('loginUserName')}
                                                          </Text> 
                                                    </View>
                                                    <View style={{flexDirection:'row',alignSelf:'center'}}>
                                                        <Text style={{fontWeight:'500'}}>
                                                              <Text onPress={()=>this.props.history.push('/home')}>
                                                                Home
                                                              </Text>
                                                              <Text> / Status /</Text>
                                                              <Text style={{color:'#F15A25'}}>
                                                                CheckStatus
                                                              </Text>
                                                        </Text>
                                
                                                        
                                                    </View>
                                                    
                                 </View> 

                               
                                <Card
                                      style={{
                                            width:responsiveWidth(42)  ,
                                            height:responsiveHeight(62),
                                            borderRadius:10,                                    
                                            backgroundColor:'#F3F1F1', 
                                            //paddingHorizontal:responsiveWidth(2),          //form card
                                              marginTop:responsiveHeight(1) 
                                          }}
                                >
                                  
                                     <ScrollView style={{
                                                          paddingLeft:responsiveWidth(2),
                                                          paddingRight:responsiveWidth(2),
                                                       }}
                                    >
                                  
                                      <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                        
                                        <View>
                                            <Text style={{fontWeight:'700',fontSize:responsiveFontSize(1.5),
                                                        color:'#333333', 
                                                        marginTop:responsiveHeight(1)

                                                        }}>
                                                {StaticWordsWeb.CheckStatusPage.header}
                                            </Text>
                                        </View>
                                        <View style={{marginTop:responsiveHeight(1)}}>
                                            <Icon color={'#ee4000'}  name={ this.state.expanded ? 'keyboard-arrow-down' : 'keyboard-arrow-up' } size={25} onPress={()=>toggleExpand()} />
                                        </View>
                                      </View> 

                                      <View>
                                        {
                                          ( this.state.expanded )
                                          ?
                                          null
                                            
                                          :
                                            (
                                              this.state.isLoaded  
                                              ?
                                              <React.Fragment>
                                                  
                                                    <View style={{marginTop:'2%',
                                                                marginBottom:responsiveHeight(1),
                                                              }}
                                                        > 

                                                          {/* <View style={{flexDirection:'row', justifyContent:'space-between',maxWidth:responsiveWidth(34)}}> 
                                                            <TextInput 
                                                                      editable={false}
                                                                      placeholderTextColor={this.state.startDate ?'#333333':null}
                                                                      onFocus={()=>this.setState({show:true})}  
                                                                      
                                                                      placeholder={this.state.startDate ? this.state.startDate.format('DD/MM/YYYY'):'Start Date'} 
                                                                      style={{fontWeight:'500',fontSize:responsiveFontSize(1.1),backgroundColor:'#fff',maxWidth:responsiveWidth(15),padding:10,height:responsiveHeight(5),borderRadius:5 }}
                                                            />
                                                            <Entypo name="calendar" size={20} color="#ee4000" style={{marginLeft:responsiveWidth(-1.8),marginTop:5}}/>

                                                            <TextInput  
                                                                      editable={false}
                                                                      placeholderTextColor={this.state.endDate ?'#333333':null}
                                                                      onFocus={()=>this.setState({show:true})}  
                                                                      placeholder={this.state.endDate ? (this.state.endDate.format('DD/MM/YYYY')):'End Date'} 
                                                                      style={{fontWeight:'500',fontSize:responsiveFontSize(1.1),backgroundColor:'#fff',height:responsiveHeight(5),maxWidth:responsiveWidth(15),padding:10,borderRadius:5 }}
                                                            />
                                                            <Entypo name="calendar" size={20} color="#ee4000" style={{marginLeft:responsiveWidth(-1.8),marginTop:3}}/>
                                                          </View>    
                                                        
                                                          {
                                                            show &&    
                                                            <Dates
                                                            
                                                                onDatesChange={onDatesChange}
                                                                isDateBlocked={()=>false}
                                                                startDate={this.state.startDate}
                                                                endDate={this.state.endDate}
                                                                focusedInput={this.state.focus}
                                                              
                                                                focusedMonth={ moment('05/09/2030','DD/MM/YYYY')}
                                                                range
                                                              
                                                              />
                                                          } */}
                                                          <View style={{flexDirection:'row',justifyContent:'space-between'}}>
                                                          <TextInput  
                                                                     editable={false}
                                                                      placeholderTextColor={'#333333'}
                                                                      style={{  borderWidth:1,borderColor:'transparent',
                                                                                borderRadius:5,backgroundColor:'#fff',
                                                                                height:responsiveHeight(6),fontSize:responsiveFontSize(1.1),
                                                                                paddingLeft:responsiveWidth(.5),
                                                                                cursor:'pointer',width:'93%' 
                                                                            }} 
                                                                      placeholder={dateRangeValue ?( moment(new Date(dateRangeValue.toString().split(',')[0]).toLocaleDateString()).format('DD/MM/YYYY') +' -> '+ moment(new Date(dateRangeValue.toString().split(',')[1]).toLocaleDateString()).format('DD/MM/YYYY')):'Start Date -> End Date' } 
                                                                      
                                                          />
                                                            <Entypo name="calendar" size={20} color="#ee4000" style={{marginTop:responsiveWidth(.3),cursor:'pointer'}} onPress={()=>this.setState({show:!this.state.show})} />
                                                          </View>
                                                            {(show ) && 
                                                                
                                                                <Calendar
                                                                selectRange={true} 
                                                                  onChange={(val)=>this.onChange(val)
                                                                  }
                                                                  
                                                                  value={dateRangeValue}
                                                                />
                                                            }
                                                      
                                                    </View>
                                                    
                                                    <View style={{ 
                                                                marginBottom:responsiveHeight(2),
                                                                  
                                                                    }}
                                                        > 
                                                            <View>
                                                                    <RNPickerSelect
                                                                                    placeholder= {{label: 'Employee Name',value:'null',  color:'red'}}
                                                                                    items={this.state.items}
                                                                                    onValueChange={ async  (value )=> {
                                                                                                    
                                                                                                    this.setState({
                                                                                                      selectedEmployeeItem: value,
                                                                                                    });  
                                                                                                    let encryptedCredentials =  btoa(localStorage.getItem("username")+ ":" + localStorage.getItem("password"));
                                                                                                        
                                                                                                    const response = await  fetch(ApiInfo.baseUrlForWeb+ApiInfo.clientDropdownEndpoint,
                                                                                                      {
                                                                                                          method :'POST', 
                                                                                                          headers: {'Authorization': 'Basic ' +encryptedCredentials ,
                                                                                                                      'accept':'application/json',
                                                                                                                  'content-type':'application/json'
                                                                                                                  },
                                                                                                          body : JSON.stringify({
                                                                                                          "emp_id":   this.state.loginEmpId, 
                                                                                                          "selected_emp_id": value  
                                                                                                                  
                                                                                                          })
                                                                                                      }
                                                                                                      )
                                                                                                    
                                                                                                      const json =await response.json(); 
                                                                                                              // {
                                                                                                              //   success:true,
                                                                                                              //   data:[
                                                                                                              //     {
                                                                                                              //       name:'dfr',
                                                                                                              //       client_id:23
                                                                                                              //     },{
                                                                                                              //       name:'jhgjg',
                                                                                                              //       client_id:45
                                                                                                              //     }

                                                                                                              //   ]
                                                                                                              // };
                                                                                                      if(json.success) 
                                                                                                      {   this.setState({items2: []});
                                                                                                          if(json.data.length==1){
                                                                                                            
                                                                                                                this.setState({items2:   this.state.items2.concat([{label:json.data[0].name,value:json.data[0].client_id,color:'#333333'}])});
                                                                                                                  this.setState({selectedClientItem:json.data[0].client_id});
                                                                                                                  localStorage.setItem('selected_emp_id',String(value)); 

                                                                                                          }  
                                                                                                          else
                                                                                                          {
                                                                                                            for(let i=0;i<json.data.length;i++) 
                                                                                                                {
                                                                                                                  this.setState({items2:   this.state.items2.concat([{label:json.data[i].name,value:json.data[i].client_id,color:'#333333'}])})
                                                                                                                  localStorage.setItem('selected_emp_id',String(value)); 
                                                                                                                  //console.log(localStorage.getItem('selected_emp_id'));

                                                                                                                }
                                                                                                          }
                                                                                                      }
                                                                                                      else{
                                                                                                        console.log('client list is not fetched') 
                                                                                                      }
                                                                                
                                                                                    }}
                                                                                    style={{
                                                                                    ...pickerSelectStyles,
                                                                                    iconContainer: {
                                                                                          top: responsiveHeight(3.5),
                                                                                          right: responsiveWidth(4),
                                                                                    },
                                                                                    placeholder:{
                                                                                      
                                                                                      color:'#33333350',
                                                                                      fontSize:responsiveFontSize(2)
                                                                                    }, 
                                                                                    inputWeb:{
                                                                                      height:responsiveHeight(6), 
                                                                                      fontSize:responsiveFontSize(1.2),
                                                                                      paddingLeft:responsiveWidth(.5),
                                                                                      borderRadius:5 ,
                                                                                      borderWidth:0, 
                                                                                      color:'#333333',
                                                                                    marginTop:responsiveHeight(1),
                                                  
                                                                                      marginBottom:responsiveHeight(1)
                                                                                    },
                                                                                    
                                                                                    }} 
                                                                                    value={this.state.selectedEmployeeItem}//this.state.selectedEmployeeItem}
                                                                                    useNativeAndroidPickerStyle={false}
                                                                                    textInputProps={{ underlineColor: 'yellow' }}
                                                                                    Icon={() => {
                                                                                    return( 
                                                                                      Platform.OS === 'android' ? <AntDesign name="down" size={responsiveFontSize(1.5)}  color="#F15A25" /> : <AntDesign name="down" size={0}  color="#F15A25" />
                                                                                      //<AntDesign name="down" size={responsiveFontSize(1.5)}  color="#F15A25" />;
                                                                                    )
                                                                                    }}
                                                                    />

                                                                    <RNPickerSelect
                                                                                    placeholder={ {
                                                                                                      label: 'Client Name ',
                                                                                                      value: null,  
                                                                                                      color:'red'
                                                                                                  } } 
                                                                                
                                                                                    items={this.state.items2}
                                                                                    onValueChange={ async (value )=> {
                                                                                                                        this.setState({
                                                                                                                                selectedClientItem: value,
                                                                                                                        });
                                                                                                                        let emp_id=localStorage.getItem('selected_emp_id');
                                                                                                             console.log( this.state.loginEmpId); 
                                                                                                             console.log( emp_id);
                                                                                                              console.log(value);
                                                                                                                        const response = await fetch(ApiInfo.baseUrlForWeb+ApiInfo.projDropdownForCheckStatusEndpoint,
                                                                                                                                         {
                                                                                                                                            method :'POST',
                                                                                                                                            headers: {'Authorization': 'Basic ' +btoa(localStorage.getItem("username")+ ":" + localStorage.getItem("password")),
                                                                                                                                                        'accept':'application/json', 
                                                                                                                                                        'content-type':'application/json'
                                                                                                                                                        },
                                                                                                                                            body : JSON.stringify({
                                                                                                                                              "emp_id":  this.state.loginEmpId, 
                                                                                                                                              "selected_emp_id": emp_id, 
                                                                                                                                              "selected_client_id"  :value
                                                                                                                                              })
                                                                                                                                         }
                                                                                                                        )
                                                                                                                        const json = await response.json(); 
                                                                                                                    // {
                                                                                                                    //   success:true,
                                                                                                                    //   data:[{
                                                                                                                    //     project_name:'vjhdbkn',
                                                                                                                    //     project_id:67
                                                                                                                    //   }]
                                                                                                                    // };
                                                                                                                    this.setState({projectItems:[]});
                                                                                                                      if(json.success) 
                                                                                                                    {    
                                                                                                                      console.log(json)
                                                                                                                      if(json.data.length==1)
                                                                                                                      {
                                                                                                                          this.setState({projectItems:   this.state.projectItems.concat([{label:json.data[0].project_name,value:json.data[0].project_id,color:'#333333'}])});
                                                                                                                        this.setState({selectedProjectItems:json.data[0].project_id});
                                                                                                                        this.setState({loaded:true});

                                                                                                                      }
                                                                                                                      else{
                                                                                                                        for(let i=0;i<json.data.length;i++) 
                                                                                                                        {
                                                                                                                        this.setState({projectItems:   this.state.projectItems.concat([{label:json.data[i].project_name,value:json.data[i].project_id,color:'#333333'}])});
                                                                                                                         i==(json.data.length-1)?console.log(this.state.projectItems):null;
                                                                                                                        }}
                                                                                                                    }
                                                                                                                    else{
                                                                                                                        console.log('projectitems list is not fetched') 
                                                                                                                    }
                                                
                                                                                                                    
                                                                                                      
                                                                                                                          
                                                                                                                  
                                                                                    
                                                                                    }}
                                                                                    style={{
                                                                                    ...pickerSelectStyles,
                                                                                    iconContainer: {
                                                                                      top: responsiveHeight(3.5),
                                                                                      right: responsiveWidth(4),
                                                                                    },
                                                                                    placeholder:{
                                                                                      
                                                                                      color:'#33333350',
                                                                                      fontSize:responsiveFontSize(2)
                                                                                    }, 
                                                                                    inputWeb:{
                                                                                      height:responsiveHeight(6), 
                                                                                      fontSize:responsiveFontSize(1.2),
                                                                                      paddingLeft:responsiveWidth(.5),
                                                                                      borderRadius:5 ,
                                                                                      borderWidth:0, 
                                                                                      color:'#333333',
                                                                                      
                                                                                      marginTop:responsiveHeight(1),
                                                  
                                                                                      marginBottom:responsiveHeight(1)
                                                                                      
                                                                                    },
                                                                                    
                                                                                    }} 
                                                                                    value={this.state.selectedClientItem}
                                                                                    useNativeAndroidPickerStyle={false}
                                                                                    textInputProps={{ underlineColor: 'yellow' }}
                                                                                    Icon={() => {
                                                                                              return( 
                                                                                                Platform.OS === 'android' ? <AntDesign name="down" size={responsiveFontSize(1.5)}  color="#F15A25" /> : <AntDesign name="down" size={0}  color="#F15A25" />
                                                                                                //<AntDesign name="down" size={responsiveFontSize(1.5)}  color="#F15A25" />;
                                                                                              )
                                                                                    }}
                                                                    /> 
                                                                    
                                                                    <RNPickerSelect
                                                                                    placeholder={ {
                                                                                                  label: 'Project Name ',
                                                                                                  value: null,  
                                                                                                  color:'red'
                                                                                                } } 
                                                                                
                                                                                    items={this.state.projectItems}
                                                                                    onValueChange={ (value )=> {
                                                                                   
                                                                                                                   this.setState({
                                                                                                                    selectedProjectItems: value,
                                                                                                                  }); 
                                                                                    
                                                                                    }}
                                                                                    style={{
                                                                                    ...pickerSelectStyles,
                                                                                    iconContainer: {
                                                                                      top: responsiveHeight(3.5),
                                                                                      right: responsiveWidth(4),
                                                                                    },
                                                                                    placeholder:{
                                                                                      
                                                                                      color:'#33333350',
                                                                                      fontSize:responsiveFontSize(2)
                                                                                    }, 
                                                                                    inputWeb:{
                                                                                      height:responsiveHeight(6), 
                                                                                      fontSize:responsiveFontSize(1.2),
                                                                                      paddingLeft:responsiveWidth(.5),
                                                                                      borderRadius:5 ,
                                                                                      borderWidth:0, 
                                                                                      color:'#333333',
                                                                                      marginBottom:responsiveHeight(1),
                                                                                      marginTop:responsiveHeight(1)
                                                                                      
                                                  
                                                                                      
                                                                                      
                                                                                    },
                                                                                    
                                                                                    }} 
                                                                                    value={this.state.selectedProjectItems}
                                                                                    useNativeAndroidPickerStyle={false}
                                                                                    textInputProps={{ underlineColor: 'yellow' }}
                                                                                    Icon={() => {
                                                                                    return( 
                                                                                      Platform.OS === 'android' ? <AntDesign name="down" size={responsiveFontSize(1.5)}  color="#F15A25" /> : <AntDesign name="down" size={0}  color="#F15A25" />
                                                                                      //<AntDesign name="down" size={responsiveFontSize(1.5)}  color="#F15A25" />;
                                                                                    )
                                                                                    }}
                                                                    />
                                                          </View>
                            
                                                    </View>
                                                       
            
                                                        <DraggableList/> 

                                                    
                                                    <View style={{marginTop:responsiveHeight(.5)}}>
                                                            <Text style={{textAlign:'center',fontWeight:'500',color:'#006498',fontSize:responsiveFontSize(1.1)}}>
                                                              Drag Boxes To change order. Click to change between ASC & DESC
                                                            </Text>
                                                    </View>
                                                  
          
                                                      <View style={styles.buttonContainer}>                                   
                                                          <FormButton
                                                            buttonType='solid'
                                                            title='SUBMIT' 
                                                            onPress={handleSubmit}
                                                            titleStyle={{fontSize:responsiveFontSize(1),color:'#fff',fontWeight:'bold'}}
                                                            buttonStyle={{ backgroundColor:'#F15A25', borderRadius:20,
                                                                            paddingVertical:responsiveHeight(1)
                                                                                            
                                                                      }}  
                                                            containerStyle={{width:responsiveScreenWidth(10),
                                                            marginTop:responsiveScreenHeight(0)}}  
                                                          />
                                                      </View>


                                              </React.Fragment>
                                        
                                              :
                                              <ActivityIndicator/>
                                            )
                                        }
                                        
                                        
                                      </View>
                                    
                                      <View style={{marginTop:responsiveHeight(3)}}>
                                          { 
                                            (
                                                this.state.listData.length>0)
                          
                                              &&  
                                                              
                                              <FlatList 
                                                                ListHeaderComponent={
                                                                  <View style={{justifyContent:'space-between',backgroundColor:'#fff',padding:10,borderRadius:5 ,flexDirection:'row',marginBottom:responsiveHeight(2)}}>
                                                                        <Text style={{color:'#ee4000',fontWeight:'bold'}}> 
                                                                        {this.state.listData[0].employee_name}
                                                                        </Text>
                                                                        <Text style={{color:'#ee4000',fontWeight:'bold',fontSize:responsiveFontSize(1.2),}}>
                                                                          {this.state.startDate.format('DD/MM/YYYY') + ' to ' + this.state.endDate.format('DD/MM/YYYY')}
                                                                        </Text>
                                                                        
                                                                          
                                                                      </View>
                                                                                            }
                                                                ListFooterComponent={ 
                                                                  <View style={{flexDirection:'row',justifyContent:'space-between',
                                                                                marginTop:responsiveHeight(-3),alignItems:'center',
                                                                                marginBottom:responsiveHeight(1),
                                                                                marginLeft:responsiveWidth(0)
                                                                                
                                                                              }}>
                                                                    <View style={{backgroundColor:'#fff',padding:3}}>
                                                                      <Text style={{fontWeight:'bold',textAlign:'center',fontSize:responsiveFontSize(1),color:'#ee4000'}}>Total Results :{this.state.total_records}</Text>
                                                                    </View> 
                                                                    {this.state.total_pages==1? 
                                                                      null
                                                                      :
                                                                      <Pagination
                                                                        total={this.state.total_pages}
                                                                        limit={1}
                                                                        pageCount={3}
                                                                        currentPage={currentPage}
                                                                      >
                                                                            {({
                                                                              pages,
                                                                              currentPage,
                                                                              hasNextPage,
                                                                              hasPreviousPage,
                                                                              previousPage,
                                                                              nextPage,
                                                                              totalPages,
                                                                              getPageItemProps
                                                                            }) => (
                                                                              <div>
                                                                                <button
                                                                                  {...getPageItemProps({
                                                                                    pageValue: 1,
                                                                                    onPageChange: this.handlePageChange,
                                                                                    style: style.pageItem
                                                                                  })}
                                                                                >
                                                                                  first
                                                                                </button>
                                                                  
                                                                                {hasPreviousPage && (
                                                                                  <button
                                                                                    {...getPageItemProps({
                                                                                      pageValue: previousPage,
                                                                                      onPageChange: this.handlePageChange,
                                                                                      style: style.pageItem
                                                                                    })}
                                                                                  >
                                                                                    {"<"}
                                                                                  </button>
                                                                                )}
                                                                  
                                                                                {pages.map(page => {
                                                                                  let activePage = null;
                                                                                // alert(currentPage,page)
                                                                                  if (currentPage === page) {
                                                                                    activePage = style.pageItemActive;
                                                                                  }
                                                                                  return (
                                                                                    <button
                                                                                      {...getPageItemProps({
                                                                                        pageValue: page,
                                                                                        key: page,
                                                                                        style: { ...style.pageItem, ...activePage },
                                                                                        onPageChange: this.handlePageChange
                                                                                      })}
                                                                                    >
                                                                                      {page}
                                                                                    </button>
                                                                                  );
                                                                                })}
                                                                  
                                                                                {hasNextPage && (
                                                                                  <button
                                                                                    {...getPageItemProps({
                                                                                      pageValue: nextPage,
                                                                                      onPageChange: this.handlePageChange,
                                                                                      style: style.pageItem
                                                                                    })}
                                                                                  >
                                                                                    {">"}
                                                                                  </button>
                                                                                )}
                                                                  
                                                                                <button
                                                                                  {...getPageItemProps({
                                                                                    pageValue: this.state.total_pages,
                                                                                    onPageChange: this.handlePageChange,
                                                                                    style: style.pageItem
                                                                                  })}
                                                                                >
                                                                                  last
                                                                                </button>
                                                                              </div>
                                                                            )}
                                                                      </Pagination>
                                                                    
                                                                        
                                                                      }
                                                                    <CSVLink data={this.state.csvData} filename={localStorage.getItem('empNameOfsearchedStatus')+"/"+(dateObj.getDate()+"/"+(dateObj.getMonth()+1)+"/"+dateObj.getFullYear())+"/"+(dateObj.getHours()+":"+dateObj.getMinutes()+":"+dateObj.getSeconds())+`.csv`} headers={csvHeaders} style={{color:'black',textDecoration:'none'}}>
                                                                          
                                                                        <FormButton
                                                                              buttonType='solid'
                                                                              // type='submit' see if needed in future
                                                                              title='Download' 
                                                                              titleStyle={{fontSize:responsiveFontSize(1),color:'#fff',fontWeight:'bold'}}
                                                                              buttonStyle={{ backgroundColor:'#F15A25', borderRadius:10,
                                                                                              paddingVertical:responsiveHeight(0.5) 
                                                                                                              
                                                                                          }} 
                                                                              containerStyle={{  
                                                                                                width:responsiveScreenWidth(8),
                                                                                              
                                                                                              }} 
                                                                              buttonColor='#a3f1ff'  
                                                                              onPress={()=>null}
                                                                        />
                                                                      </CSVLink>
                                                                      </View>   
                                                                } 
                                                                showsVerticalScrollIndicator={false}
                                                              
                                                                keyExtractor={(item, index) => index.toString()}
                                                                data={this.state.listData}
                                                                renderItem={
                                                                  ({item,index}) => (   
                                                                        
                                                                        <ListItem style={{marginBottom:responsiveHeight(5),borderRadius:10}}>
                                                                                                                                                                          
                                                                          <ListItem.Content  key={item.p_id} >
                                                                              
                                                                              <View  style={{flexDirection:'row',justifyContent:'space-between',width:'100%',marginBottom:responsiveHeight(1)}}>
                                                                                                            
                                                                                      <ListItem.Title style={{fontSize:responsiveFontSize(1.1),fontWeight:'bold',opacity:0.7}}>
                                                                                        
                                                                                        {item.start_time + ' - ' + item.end_time}   
                                                                                    
                                                                                      </ListItem.Title>
                                                                                      
                                                                                      <ListItem.Title style={{fontSize:responsiveFontSize(1.1),fontWeight:'bold',opacity:0.7}}>
                                                                                          
                                                                                          {item.totalhrs}   
                                                                                      
                                                                                      </ListItem.Title>
                                                                                
                                                                              </View>
                                                                                                        
                                                                              <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',marginBottom:responsiveHeight(1)}}>
                                                                                  
                                                                                  <ListItem.Title style={{fontSize:responsiveFontSize(1.1),fontWeight:'bold',opacity:0.7}}>
                                                                                    {item.employee_name}
                                                                                  </ListItem.Title> 
                                                                                  <ListItem.Title style={{fontSize:responsiveFontSize(1.1),fontWeight:'bold',opacity:0.7}}>
                                                                                      {item.date}  
                                                                                  </ListItem.Title>
                                                    
                                                                              </View>
                                                    
                                                                              <View style={{flexDirection:'row',justifyContent:'space-between',width:'100%',marginBottom:responsiveHeight(1)}}>
                                                                                  
                                                                                  <ListItem.Title style={{maxWidth:responsiveWidth(10),fontSize:responsiveFontSize(1.1),fontWeight:'bold',opacity:0.7}}>
                                                                                    {item.name}
                                                                                  </ListItem.Title> 
                                                                                  <ListItem.Title style={{maxWidth:responsiveWidth(10),fontSize:responsiveFontSize(1.1),textAlign:'right',fontWeight:'bold',opacity:0.7}}>
                                                                                    {item.proj_name}  
                                                                                  </ListItem.Title>
                                                    
                                                                              </View>
                                                    
                                                                              <ListItem.Title style={{fontSize:responsiveFontSize(1.2),fontWeight:'bold',color:'#333333',textAlign:'justify'}}>
                                                                                {item.task_details}
                                                                              </ListItem.Title>
                                                    
                                                                          </ListItem.Content>
                                                                        </ListItem>
                                                    
                                                                      )}
                                                                  
                                                                
                                              />
                                                                  
                                          }
                                      </View>
                                  
                                    </ScrollView>
                              
                                </Card>  
                                
                              
                        </View>
                          

                      </View> 

                    </Card> 
          
                       <Footer />
                    
                 </View>
                 
            </View> 
          
          </React.Suspense>
            
      </View> 
     )
    }
 }
 const styles = StyleSheet.create({
     
    buttonContainer:{
      marginTop:responsiveHeight(2), 
      marginBottom:responsiveHeight(0),
      alignItems:'center',zIndex:-1
    }
     
  }) 

  const pickerSelectStyles = StyleSheet.create({
       
   inputAndroid: { 
     paddingHorizontal: '4%', 
     borderRadius: 5,
     color: '#333333',
     paddingRight: 30, // to ensure the text is never behind the icon
     backgroundColor:'white', 
     borderWidth:1,
     borderColor:'#ECECEC',
     height:responsiveHeight(6)
   }, 
   
 });
 
 export default withRouter(CheckStatusWeb);