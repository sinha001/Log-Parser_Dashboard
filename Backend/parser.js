const fs = require("fs");
const readline = require("readline");
const axios = require('axios');

const LOG_FILE = "logParserSample.log";

const ipCount = {}; //store Ip occurences
const traffic = {}; //store hourly traffic..

const readLogs = async () => {
  const response = await axios.get('https://support.netgables.org/apache_combined.log');
    
    // Split the file content by new lines
    const logLines = response.data.split('\n');


  for await (const line of logLines) {
    // console.log(line);  we are getting each line...

    /*
        1.  Now, we need to extract IP, HOur, Date..
            We will split each log line manually and extract
            a. IP address (First part of the log line..)
            b. TimeStamp (Fourth part, inside []),
            c. Hour (Extract from timestamp)
        */
    const parts = line.split(" ");
    if (parts.length < 4) continue; //skip deformed lines..

    const ip = parts[0]; // extracting IP address..
    // console.log(ip);

    const timestamp = parts[3].slice(1); //removing '['
    //console.log(timestamp);

    const dateParts = timestamp.split(":"); //spliting date and time...
    //console.log(dateParts);

    const date = dateParts[0];
    const hour = dateParts[1];

    //console.log(`IP: ${ip}, Date: ${date}, Hour: ${hour}`);

    /* we need to count the occurence of each ip &,
       and we need to show the hourly traffic on a given day*/ 
    
    ipCount[ip] = (ipCount[ip] || 0) + 1;
    traffic[hour] = (traffic[hour] || 0) + 1;
  }

//   console.log("IP Occurences: ", ipCount);
//   console.log("Hour Traffic: ", traffic);

};

// Get IP Addresses that contribute to 85% of the traffic on a given day

const getIPS = () => {
    const totalRequests = Object.values(ipCount).reduce((a,b)=> a + b ,0);
    let totalRunning= 0;

    //Convert object to array and sort in descending (as per count)..
    const Sorted = Object.entries(ipCount).sort((a,b)=> b[1] - a[1]);

    const topIPs = {};
    for(const [ip, count] of Sorted){
        totalRunning += count;
        topIPs[ip] = count;
        if(totalRunning >= totalRequests*0.85) break;
    }


    return topIPs;
};

// Get hours contributing to the 70% of overall traffic on a given day

const getTopHours=()=>{
    const totalRequests = Object.values(traffic).reduce((a,b)=>a+b,0);
    let totalRunning = 0;

    const Sorted = Object.entries(traffic).sort((a,b)=>b[1]-a[1]);

    const topHours = {};
    for(const [hour,count] of Sorted){
        totalRunning += count;
        topHours[hour] = count;
        if(totalRunning >= totalRequests*0.70) break;
    }
    return topHours;
}


module.exports = { readLogs, ipCount, traffic, getIPS, getTopHours};