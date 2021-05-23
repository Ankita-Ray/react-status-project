// import dotenv from 'dotenv'
// dotenv.config({ public_url: reactapplication })

const dotenv = require('dotenv')
const buf = Buffer.from('SUBDOMAIN=/reactapplication') 
export  const config = dotenv.parse(buf)  
 

  