// JavaScript source code
let heading = document.querySelector(".h")
let appointments = document.querySelector(".appointments")

let data = fetch("/doctor", { method: "POST" })
console.log(data);
data.then((value1) => {
    return value1.json()
}).then((value2) => {
    console.log(value2);


    let name = value2.name;
    heading.innerHTML = '<h1  class="doctorname">Welcome ' + name + '</h1>' + heading.innerHTML
let interation = value2.appointments.length;
if (interation > 0) {
    for (let i = 0; i < interation; i++) {
     
        let appointmentdetail = '<div class="appointment"><p class="appointmentdetail">' + (i + 1) + '</p><p class="appointmentdetail">Patient Name: ' + value2.appointments[i].pname + '</p><p class="appointmentdetail">Phone Number: ' +value2.appointments[i].fnumer+'</p></div > '
        if (i == 0) {
            appointments.innerHTML = appointmentdetail
        }
        else {
            appointments.innerHTML = appointments.innerHTML + appointmentdetail
        }
    }
}
else {
    let nopdet = '<p class="nop">You dont have any patient Currently</p>'
    appointments.innerHTML = nopdet;
}
})