// JavaScript source code
const express = require("express");
const mongo = require("mongoose");

    const mongodb = mongo.connect("mongodb://localhost:27017/appoindoctor")

const doctorfield = mongo.Schema({
    name: String,
    email: String,
    password: String,
    specility: String,
    appointments: [
        {
            pname: String,
            fnumer: Number
        }
    ]
})
const pateintfield = mongo.Schema({
    name: String,
    email: String,
    password: String,
    phonenumber: Number,
    appointmenteddoctors: [{
        doctmail: String,
        DoctSpecility: String,
        docname:String
    }
    ]
})
let doctordata = mongo.model("doctor", doctorfield)
let patientdata=mongo.model("patient",pateintfield)
const app = express();

app.use(express.static(__dirname + "/public"))

app.use(express.urlencoded())
var doctoremail;
app.get("/doctor/:email", doctoremailcheck, async (req, res) => {
    doctoremail = req.params.email;
   res.sendFile(__dirname+"/doctorhome.html")
})
app.post("/doctor", async (req, res) => {
    let ourdoctor = await doctordata.findOne({ "email": doctoremail })

    console.log(ourdoctor)
    res.send(ourdoctor)
})
var pemail;
var demail;
app.get("/pateint/:email", patientemailcheck, async (req, res) => {
    pemail = req.params.email;
    res.sendFile(__dirname+"/patienthome.html")
})
app.get("/getm/:email", async (req, res) => {
    demail=req.params.email;

    console.log(demail);
    console.log(pemail);
    let apd = await doctordata.findOne({ "email": demail })
    let cp = await patientdata.findOne({ "email": pemail })
    
    cp.appointmenteddoctors.push({
        doctmail: apd.email,
        DoctSpecility: apd.specility,
        docname: apd.name
    })
    cp.save()
    apd.appointments.push({
        pname: cp.name,
        fnumer: cp.phonenumber
    })
    apd.save()
    res.redirect("/pateint/"+pemail)
})
app.post("/pateint", async (req, res) => {
    let ourpatient = await patientdata.findOne({ "email": pemail })
    res.send(ourpatient);
})
const multer = require("multer");
const upload = multer()
var rd=[];
app.post("/specility",upload.none(), async (req, res) => {
    let specility_need = req.body.spec;
    let ourpatient = await patientdata.findOne({ "email": pemail })
    let availabledoctors = await doctordata.find({ "specility": specility_need })
    let uniquedoctor = []
    for (let i = 0; i < availabledoctors.length; i++) {
        let me = false;
        for (let j = 0; j < ourpatient.appointmenteddoctors; j++) {
            if (availabledoctors[i].email == ourpatient.appointmenteddoctors[j].doctmail) {
                me = true;
            }
        }
        if (me == false) {
            uniquedoctor[i] = availabledoctors[i];
        }
    }
   
    res.send(uniquedoctor)
    
})

async function patientemailcheck(req, res, next) {
    let alldoctors = await patientdata.find();
    let emailexist = false;
    for (let i = 0; i < alldoctors.length; i++) {
        if (alldoctors[i].email == req.params.email) {
            emailexist = true;
        }
    }
    if (emailexist == true) {
        next()
    }
    else {
        res.redirect("/pateint")
    }

}
async function doctoremailcheck(req, res, next) {
    let alldoctors = await doctordata.find();
    let emailexist = false;
    for (let i = 0; i < alldoctors.length; i++) {
        if (alldoctors[i].email == req.params.email) {
            emailexist = true;
        }
    }
    if (emailexist == true) {
        next()
    }
    else {
        res.redirect("/doctor")
    }

}
let allpatients = doctordata.find()


app.get("/", (req, res) => {
    res.sendFile(__dirname+"/index.html");
})
app.get("/doctor", (req, res) => {
    
    res.sendFile(__dirname+"/doctor.html");
})
app.get("/pateint", (req, res) => {
    res.sendFile(__dirname+"/ptient.html");
})
app.get("/emailexist", (req, res) => {
    res.sendFile(__dirname + "/emailexist.html");
})
app.post("/doclogin", async (req, res) => {
    let doctors = await doctordata.find();
    let doctorexist = false;
    for (let i = 0; i < doctors.length; i++) {
        if (doctors[i].email == req.body.email) {
            doctorexist = true;
        }

    }
    if (doctorexist == true) {
        let doctor = await doctordata.findOne({ email: req.body.email })
        if (doctor.password == req.body.password) {
            res.cookie("name",req.body.email)
            res.redirect("/doctor/"+req.body.email)
        }
        else {
            res.redirect("/invalidlogin")
        }
    }
    else {
        res.redirect("/invalidlogin")
    }
  
   
})
app.get("/invalidlogin", (req, res) => {
    res.sendFile(__dirname+"/invalidlogin.html")
    
})
app.post("/docinput", async (req, res) => {
    let doctors = await doctordata.find()
    let emailexist = false;
    for (let i = 0; i < doctors.length; i++) {
        if (doctors[i].email == req.body.email) {
            emailexist = true;
        
        }
       
    }
    if (emailexist == true) {
       // res.sendFile(__dirname + "/emailexist.html");
        res.redirect("/emailexist")
        
       
    }
    else {
        console.log("hi")
        doctordata.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            specility: req.body.specility

        })
       
        let doctorsadded=await doctordata.find()
        res.cookie("name",req.body.email)
        res.redirect("/doctor/"+req.body.email);
    }
    
})
app.post("/patientinput", async (req, res) => {
    let patients = await patientdata.find()
    let emailexist = false;
    for (let i = 0; i < patients.length; i++) {
        if (patients[i].email == req.body.email) {
            emailexist = true;

        }

    }
    if (emailexist == true) {
        //res.sendFile(__dirname + "/emailexist.html");
        res.redirect("/emailexist")


    }
    else {
        console.log("hi")
        patientdata.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
            phonenumber: req.body.phone_number

        })
        res.cookie("name",req.body.email)
        res.redirect("/pateint/"+req.body.email);
    }

})
app.post("/patintlogin", async (req, res) => {
    let pateints = await patientdata.find();
    let pateintexist = false;
    for (let i = 0; i < pateints.length; i++) {
        if (pateints[i].email == req.body.email) {
            pateintexist = true;
        }

    }
    if (pateintexist == true) {
        let pateint = await patientdata.findOne({ email: req.body.email })
        if (pateint.password == req.body.password) {
            res.cookie('name', req.body.email, {secure:true})
            res.redirect("/pateint/" + req.body.email);
        }
        else {
            res.redirect("/invalidlogin")
        }
    }
    else {
        res.redirect("/invalidlogin")
    }


})
app.post("/logout", (req, res) => {
    res.redirect("/");
})
app.listen(3000, () => {
    console.log("Server is created");
})