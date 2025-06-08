// JavaScript source code
let heading = document.querySelector(".h")
let appointments = document.querySelector("#t")
let appointbutton = document.querySelector(".appb")
let home = document.querySelector(".home")
let select = document.querySelector(".re")
let specilityselecter = document.querySelector("#se")
let specilities = document.querySelector(".sre")
let sp = document.getElementById("app")
let form = document.getElementById("f")
let formdata;
appointbutton.addEventListener("click",() => {
    home.hidden = true;
    select.hidden = false;
})
specilityselecter.addEventListener("click", async () => {
    select.hidden = true;
    specilities.hidden = false;
    formdata = new FormData(form);
    event.preventDefault();
    await fetch("/specility", {
        method: "POST",
        body: formdata
    }) .then((value1) => {
        return value1.json()
    }).then((value2) => {
        let dinteration = value2.length;
        if (dinteration > 0) {

            for (let i = 0; i < dinteration; i++) {

                let doctordets = '<div  class="appointment"><p class="appointmentdetail">' + (i + 1) + '</p><p class="appointmentdetail">Doctor Name:' + value2[i].name + '</p><p class="appointmentdetail">Specility: ' + value2[i].specility +'</p><button><a href="/getm/'+value2[i].email+'">Appoint<a><button></div > '
                if (i == 0) {
                    sp.innerHTML = doctordets;
                }
                else {
                    sp.innerHTML = sp.innerHTML + doctordets
                }
            }
        }
        else {
            let nopdet = '<p class="nop">No Doctor for Your desired field is available</p>'
            sp.innerHTML = nopdet;
        }
    })
    //let ad = fetch("/specility", { method: "POST" })
   
    
 })
let savedpatient = fetch("/pateint", { method: "POST" })

savedpatient.then((value1) => {
    return value1.json()
}).then((value2) => {
    console.log(value2);






    let name = value2.name;;
    heading.innerHTML = '<h1  class="doctorname">Welcome ' + name + '</h1>' + heading.innerHTML
    let interation = value2.appointmenteddoctors.length;
if (interation > 0) {
    for (let i = 0; i < interation; i++) {
     
        let appointmentdetail = '<div class="appointment"><p class="appointmentdetail">' + (i + 1) + '</p><p class="appointmentdetail">Doctor Name: ' + value2.appointmenteddoctors[i].docname + '</p><p class="appointmentdetail">Specility: ' + value2.appointmenteddoctors[i].DoctSpecility +'</p></div > '
        if (i == 0) {
            appointments.innerHTML = appointmentdetail
        }
        else {
            appointments.innerHTML = appointments.innerHTML + appointmentdetail
        }
    }
}
else {
    let nopdet = '<p class="nop">You dont have any Appointment</p>'
    appointments.innerHTML = nopdet;
}
})
