const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const mongoose =require('mongoose');
const { Db } = require("mongodb");
const { text } = require("body-parser");
const res = require("express/lib/response");
mongoose.connect("mongodb+srv://mudasir:Pass123@cluster0.tet8x.mongodb.net/RegisterDB?retryWrites=true&w=majority",{useNewUrlParser: true,useUnifiedTopology: true})
.then( () =>console.log("conected"))
.catch((err)=>console.log(err))
const app = express();

app.set('view engine', 'ejs');
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));
var APPLICATION_NUMBER;
const ApplicationNumberSchema= new mongoose.Schema({
    name:String,
    application_number:Number
})

const studentSchema= new mongoose.Schema({
    name:String,
    fatherName:String,
    motherName:String,
    dob:String,
    gender:String,
    residence:String,
    tehsil:String,
    pin:Number,
    district:String,
    category:String,
    rationCard:String,
    lastSchool:String,
    contactNumber:Number,
    adhar:Number,
    accountNumber:Number,
    ifsc:String,
    applicationNumber:Number 

})

const students = new mongoose.model('student', studentSchema);

const application= new mongoose.model('application', ApplicationNumberSchema);
function  getApp(){
  application.find(function (err,foundIt) {
    APPLICATION_NUMBER=  foundIt[0].application_number+1;
  
})}


app.get('/login',(req,res)=>{
  res.render('login')
})
 app.get("/", function  (req,res){
  getApp();
   res.render('index')
 })

 app.post('/', async (req,res)=> {
  application.find(function async (err,foundIt) {
    APPLICATION_NUMBER= foundIt[0].application_number+1;
  
  
})
   const student=new students({
        name:req.body.name.toUpperCase(),
        fatherName:req.body.fatherName.toUpperCase(),
        motherName:req.body.motherName.toUpperCase(),
        dob:req.body.dob,
        gender:req.body.gender.toUpperCase(),
        residence:req.body.residence.toUpperCase(),
        tehsil:req.body.tehsil.toUpperCase(),
        pin:req.body.pin,
        district:req.body.district.toUpperCase(),
        category:req.body.category.toUpperCase(),
        rationCard:req.body.rationCard.toUpperCase(),
        lastSchool:req.body.lastSchool.toUpperCase(),
        contactNumber:req.body.contactNumber,
        adhar:req.body.adhar,
        accountNumber:req.body.accountNumber,
        ifsc:req.body.ifsc.toUpperCase(),
        applicationNumber:APPLICATION_NUMBER,

      })
      
        
if(APPLICATION_NUMBER==null){
  res.render('fail')
}else{
  
  
    application.findOne({ name: 'application' }, function async (err, doc){
        doc.application_number = APPLICATION_NUMBER;
        doc.save();
      });
  student.save()
  res.render('success',{APPLICATION_NUMBER:APPLICATION_NUMBER})
}
 })
 
 app.get("/success", function(req,res){
  students.find({applicationNumber:APPLICATION_NUMBER},function(foundIdd){
    console.log(foundIdd[0]._id)
    
  res.render('success',{APPLICATION_NUMBER:APPLICATION_NUMBER})
  

})
})
  app.post('/login',(req,res)=>{
    students.find({applicationNumber:req.body.appId},function(err,foundSt){
      if(err){
        res.send(err)
        
         
        
      }else if(foundSt){
        res.render('downloadApp',{foundSt:foundSt})
      }else{
        console.log("not found")
      }
    })
  })
  app.post('/success',(req,res)=>{
    
    students.find({applicationNumber:APPLICATION_NUMBER},function(foundApp){
    
        res.render("downloadApp")
      

    })
  })
  app.post("/downloadApp", function(req,res){
   
    students.find({applicationNumber:req.body.appId}, function(err,foundSt){
   
     res.render('downloadApp',{foundSt:foundSt})
    });
    
   })
   app.get('/fail',()=>{
     res.render('fail')
   })
   
   
app.listen(process.env.PORT||3000, function() {
    console.log("http://localhost:3000");
  });
  
