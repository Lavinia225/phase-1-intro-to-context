// Your code here
function createEmployeeRecord(array){
    return {
        "firstName": array[0],
        "familyName": array[1],
        "title": array[2],
        "payPerHour": array[3],
        "timeInEvents": [],
        "timeOutEvents": []
    }
}

function createEmployeeRecords(nestedArray){
    let employeeRecordArray = []

    nestedArray.forEach(item =>{
        employeeRecordArray.push(createEmployeeRecord(item))
    })
    return employeeRecordArray
}

function createTimeInEvent(employee, date){
    employee.timeInEvents.push({
        "type": "TimeIn",
        "hour": parseInt(date.substring(11)),
        "date": date.substring(0,10)
    })
    return employee
}

function createTimeOutEvent(employee, date){
    employee.timeOutEvents.push({
        "type": "TimeOut",
        "hour": parseInt(date.substring(11)),
        "date": date.substring(0,10)
    })
    return employee
}

function hoursWorkedOnDate(employee, date){
   const timeIn = employee.timeInEvents.find(item =>item.date === date).hour
   try{
   const timeOut = employee.timeOutEvents.find(item => item.date === date).hour
   return (timeOut - timeIn) / 100
   }
   catch(error){
    console.error(error + "Employee did not clock out.")
   }
}

function wagesEarnedOnDate(employee, date){
    const hours = hoursWorkedOnDate(employee, date)
    return employee.payPerHour * hours
}

function allWagesFor(employee){
    const dailyWages = []

    for (let i = 0; i < employee.timeInEvents.length; i++){
    dailyWages.push(wagesEarnedOnDate(employee, employee.timeInEvents[i].date))
    }

    return dailyWages.reduce(counter, 0)
}

function calculatePayroll(employeeRoster){
    const totalWageArray = []

    for (let i = 0; i < employeeRoster.length; i++){
        totalWageArray.push(allWagesFor(employeeRoster[i]))
    }
    return totalWageArray.reduce(counter, 0)
}

function counter(total, value){
    return total += value
}

