export const PrintPreviewPage={ 
    
     Link:'/print-preview',
     Window_Width_And_Height:'width=800, height=800'
}

export const ApiInfo={
   
   
// baseUrlForWeb:'https://status.keyss.in/app/api/web/v1',
 
    baseUrlForWeb:'https://cors-anywhere.herokuapp.com/http://status.keyss.in/app/api/web/v1', //this is for web with cors proxie . another proxie is https://thingproxy.freeboard.io/fetch/
    
    appraisalSubmitEndpoint:'/users/submitappraisal',
    submitAppraisalFromAppraiser:'/users/submitbyappraisar',//****
    submitAppraisalFromHR:'/ ',//****
    

    
    calendarEndpoint:'/users/userattendance',
    
    changePasswordEndpoint:'/users/changepassword',

    checkStatusEndpoint:'/checkstatus/checkstatus',
     
    clientDropdownEndpoint:'/status/clientlist',
    
    contactsEndpoint:'/contact/index',

    checkBoxShowApi:'/status/yesterdaystatus',

   
    deleteStatusEndpoint:'/status/remove',

    
    editStatusEndpoint:'/status/edit',
    
    employeeNameEndpoint:'/status/employeelist',//rename it to employeeDropdownEndpoint
    
    enterStatusEndpoint:'/status/create',

    enteredStatusListEndpoint:'/status/list',

    
    getAppraisalData:'/users/getappraisaldata',
 
    
    holidayEndpoint:'/holiday/index',

    
    leaveApplyEndpoint:'/leave/create',
    
    leavesDropdownEndpoint:'/leave/empleaves',//  '/leave/leavedropdown',

    leaveStatusInHomepageEndpoint:'/leave/leaveslist',// for appraiser side to show how many leaves are pending to accept or reject

    loginEndpoint:'/users/login',
   
    logoutEndpoint:'/users/logout',

    
    
    objectivesEndpoint:'/users/objectives', //objectives set in last appraisal by applicant
    
    
    pendingAtAppraiser:'/users/pendingatappraisar',//for showing appraisal status of applicant in appraiser end

    pendingAtHR:'/users/pendingathr',//for showing appraisal status of applicant in appraiser end
    
    policyEndpoint:'/policy/index',

    projDropdownEndpoint:'/users/projects',

    projDropdownForCheckStatusEndpoint:'/status/projectlist',

    
    rejectLeaveEndpoint:'/leave/changeleavestatus',

    
    setNotificationEndpoint:'/users/self_status',
    
    showAppraisalForm:'/users/showappraisalform',   //for showing appraisal status of applicant in its own end

    
    totalLeavesEndpoint:'/leave/empleaves', 
    
    
    updateProfileEndpoint:'/users/updateprofile'

}
//https://cors-anywhere.herokuapp.com/ 
   

