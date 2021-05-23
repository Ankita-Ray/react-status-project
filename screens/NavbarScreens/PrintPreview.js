import React from 'react';
import { Text, View } from 'react-native';
import { responsiveFontSize, responsiveHeight, responsiveWidth } from 'react-native-responsive-dimensions';
import ReactToPrint from "react-to-print";



//const db = SQLite.openDatabase('db.testDb1')
class ComponentToPrint extends React.Component{
   
  constructor(props) {
    super(props);
    
    this.state = {
       
      name:"",
      email:"",
      designation:"",
      joiningDate:"",
      appraisal_date:"",
      appraiser_name:"", 
      
    }; 
  }
             

componentDidMount(){
                  
  
            // db.transaction(tx => {
            //     // sending 4 arguments in executeSql
            //     tx.executeSql('SELECT * FROM statusInfo', null, // passing sql query and parameters:null
            //       // success callback which sends two things Transaction object and ResultSet Object
            //       (txObj,results ) => 
            //          {
            //             var len = results.rows.length;
            //             for (let i = 0; i < len; i++) {
            //               let row = results.rows.item(i);
            //                 this.setState({name:row.name}) 
            //                   this.setState({email:row.email_id}),
            //                    this.setState({joiningDate: row.joining_date}),
                             
            //                   this.setState({designation: row.designation}),
                              
            //                   this.setState({appraisal_date: row.next_appraisal_date}),
            //                   this.setState({appraiser_name: row.appraiser_name})
                              
            //             }
            //          } ,
            //       (txObj, error) => console.log('Error ', error)
            //       )  
            //   })
                 
         
}
render(){
  var retrievedData = localStorage.getItem("dutiesResponsibilities");
    var dutiesResponsibilities = JSON.parse(retrievedData);

  var retrievedNextAppraisalTargets=localStorage.getItem("nextAppraisalTargets");
   var nextAppraisalTargets =JSON.parse(retrievedNextAppraisalTargets);

   var retrievedCandidateData = localStorage.getItem("candidateInfo");
    var candidate_info=JSON.parse(retrievedCandidateData)
  return(

    
            <View style={{marginTop:responsiveHeight(2)}}>
              <View style={{flexDirection:'row',justifyContent:'center'  }}>
                <Text style={{marginRight:responsiveWidth(2),fontWeight:'bold'}}>Name :</Text>
                <Text  style={{fontWeight:'bold'}}>{candidate_info.name}</Text>
              </View>
              <View style={{marginTop:responsiveHeight(2) ,flexDirection:'row',justifyContent:'center'  }}>
                <Text style={{marginRight:responsiveWidth(2),fontWeight:'bold'}}>Email Id :</Text>
                <Text style={{fontWeight:'bold'}}>{candidate_info.email_id}</Text>
              </View>
              <View style={{marginTop:responsiveHeight(2) ,flexDirection:'row',justifyContent:'center'  }}>
                <Text style={{marginRight:responsiveWidth(2),fontWeight:'bold'}}>Designation :</Text>
                <Text style={{fontWeight:'bold'}}>{candidate_info.designation}</Text>
              </View>
              <View style={{marginTop:responsiveHeight(2) ,flexDirection:'row',justifyContent:'center'  }}>
                <Text style={{marginRight:responsiveWidth(2),fontWeight:'bold'}}>Joining Date :</Text>
                <Text style={{fontWeight:'bold'}}>{candidate_info.joining_date}</Text>
              </View> 
              <View style={{marginTop:responsiveHeight(2) ,flexDirection:'row',justifyContent:'center'  }}>
                <Text style={{marginRight:responsiveWidth(2),fontWeight:'bold'}}>Appraisal Date :</Text>
                <Text style={{fontWeight:'bold'}}>{candidate_info.next_appraisal_date}</Text>
              </View>
              <View style={{marginTop:responsiveHeight(2) ,flexDirection:'row',justifyContent:'center'  }}>
                <Text style={{marginRight:responsiveWidth(2),fontWeight:'bold'}}>Appraiser Name :</Text>
                <Text style={{fontWeight:'bold'}}>{candidate_info.appraiser_name}</Text>
              </View> 


              <View style={{
                             backgroundColor:"#0080ff20",width:'100%',alignItems:'center',marginVertical:responsiveHeight(5),
                             paddingVertical:responsiveHeight(2)                           
                          }}
              >
                  <Text style={{fontWeight:'bold',fontSize:responsiveFontSize(1.1)}}>
                    State your understanding of your duties and responsibilities.
                  </Text>
              </View> 
              <View >

                 <Text style={{fontWeight:'700',fontSize:responsiveFontSize(1)}}> 
                  1. Has the past year been good/bad/satisfactory or otherwise for you, and why?
                 </Text> 
                 <Text style={{ fontSize:responsiveFontSize(1),marginVertical:responsiveHeight(2)}}> 
                 {   
                    //making sure it still is an array
                     dutiesResponsibilities[0]              
                 }
                 </Text>
                
                 <Text style={{fontWeight:'700',fontSize:responsiveFontSize(1)}}> 
                 2. What do you consider to be your most important achievements of the past year?                </Text> 
                <Text style={{fontSize:responsiveFontSize(1),marginVertical:responsiveHeight(2)}}> 
                 {   
                    //making sure it still is an array
                     dutiesResponsibilities[1]              
                 }
                 </Text>
                 <Text style={{fontWeight:'700',fontSize:responsiveFontSize(1)}}> 
                 3. What do you like and dislike about working for this organization?                </Text> 
                <Text style={{fontSize:responsiveFontSize(1),marginVertical:responsiveHeight(2)}}> 
                 {   
                    //making sure it still is an array
                     dutiesResponsibilities[2]              
                 }
                 </Text>  

                 <Text style={{fontWeight:'700',fontSize:responsiveFontSize(1)}}> 
                 4. Any other issues                </Text> 
                <Text style={{fontSize:responsiveFontSize(1),marginVertical:responsiveHeight(2)}}> 
                 {   
                    //making sure it still is an array
                     dutiesResponsibilities[3]              
                 }
                 </Text> 
                   
               </View>         
              
              <View style={{backgroundColor:"#0080ff20",width:'100%',alignItems:'center',marginVertical:responsiveHeight(2),paddingVertical:responsiveHeight(2) }}>
                  <Text style={{fontWeight:'bold',textAlign:'center', fontSize:responsiveFontSize(1.1)}}>

                    List the targets you set out to achieve in your next due Appraisal.
                  </Text>
                 
              </View> 
              <View >
                   { nextAppraisalTargets.map((items,index)=>
                       items.target!=''?
                        <Text style={{fontWeight:'500',marginBottom:responsiveHeight(2) ,fontSize:responsiveFontSize(1)}}>
                          {index+1}. {items.target}
                        </Text>
                        :null
                     
                   )}
              </View>
            </View>
             
             
    )
 }
}

export default class AppraisalPrintPreview extends React.Component {
  render() {
    return (
      <View style={{alignItems:'center'}}>
        <ReactToPrint
          trigger={() => <a href="#">Print this out!</a>}
          content={() => this.componentRef} 
        />
        <ComponentToPrint  ref={el => (this.componentRef = el)} />
      </View>
    );
  }
}
