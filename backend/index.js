const express=require('express')
const mongoose=require('mongoose')
const cors=require('cors')
const CustModel=require('./models/customers')
const CredModel=require('./models/Credentials')

const app=express()
app.use(cors())
// cors id to use server side in the front end
app.use(express.json())
// pass data from front end to back end in json format
mongoose.connect('mongodb://127.0.0.1:27017/abc')

//to display content
app.get('/',(req,res)=>{
    CustModel.find({})
    .then(cust=>res.json(cust))
    .catch(err=>res.json(err))
})
//update record
app.get('/getCustomer/:no',(req,res)=>{
    const no=req.params.no;
    CustModel.findOne({custNumber:no})
    .then(cust=>res.json(cust))
    .catch(err=>res.json(err))
}) 

app.get('/getCustomerbyID/:id',(req,res)=>{
    const id=req.params.id;
    CustModel.findById({_id:id})
    .then(cust=>res.json(cust))
    .catch(err=>res.json(err))
}) 

//to validate unique id
app.get('/checkUniqueCustNumber/:custNumber', async (req, res) => {
    const custNumber = req.params.custNumber;
  
    try {
      // Check if custNumber is unique
      const existingCustomer = await CustModel.findOne({ custNumber });
      const isUnique = !existingCustomer;
  
      res.json({ isUnique });
    } catch (error) {
      console.error('Error checking unique custNumber:', error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  });

//insert a new record
app.post('/createCustomer',(req,res)=>{
    CustModel.create(req.body)
    .then(cust=>res.json(cust))
    .catch(err=>res.json(err))
})
//update use
app.put('/updateCustomer/:id',(req,res)=>{
    const id=req.params.id;
    CustModel.findByIdAndUpdate({_id:id},{custname:req.body.custname,custNumber:req.body.custNumber,city:req.body.city,state:req.body.state,pincode:req.body.pincode})
    .then(cust=>res.json(cust))
    .catch(err=>res.json(err))
})
app.delete('/deleteCustomer/:id',(req,res)=>{
    const id=req.params.id;
    CustModel.findByIdAndDelete({_id:id})
    .then(cust=>res.json(cust))
    .catch(err=>res.json(err))
})

//login form code endpoints
app.post('/register',(req,res)=>{
    CredModel.create(req.body)
    .then(user=>res.json(user))
    .catch(err=>res.json(err))
})
app.post('/login', (req, res) => {
    const { email, password } = req.body;
  
    CredModel.findOne({ email: email })
      .then(user => {
        if (user) {
          // Note: 
          if (user.password === password) {
            res.json('Success');
          } else {
            res.json('You have entered the wrong password');
          }
        } else {
          res.json('User not found');
        }
      })
      .catch(error => {
        console.error(error);
        res.status(500).json('Internal Server Error');
      });
  });
app.listen(3001,()=>{
    console.log('Server is running')
})