const  express = require('express')   
const app = express()
app.use(express.json());

const dotenv = require("dotenv");

dotenv.config();

console.log(process.env.DATA_BASE_URL);

const mongoose = require("mongoose");
mongoose
  .connect(process.env.DATA_BASE_URL)
  .then((res) => console.log("database connected"))
  .catch((err) => console.log(err));
  

 

  const personSchema = new mongoose.Schema({
    name: {
      type: String,
      require: true,
    },
    age: Number,
    favoriteFoods: [String],
  });
  const Person = mongoose.model("Person", personSchema);
  //create a person route
  app.post ("/create_person",async(req,res) => {
    try {
      const newperson = new Person(req.body);
      await newperson.save();
      res.status(200).json({message:"success",data:newperson});
      } catch (error) {
        console.log(error);
        res.status(500).json({message:error.message});
      }
  })
  //baracha 3baed 
  app.post("/create_many",async(req, res) => {
  try {
    console.log(req.body);
    const person = await Person.create(req.body);
    res.status(200).json({message:"success", data: person});
  } catch (error) {
    res.status(500).json({message:error.message});
    
  }
  
  })
  //bil isem
  app.get('/find_by_name/:name', async(req,res)=> {
    try{
      console.log(req.params);
      const found = await Person.find({name:req.params.name});
    res.status(200).json({message:"success",data:found});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
    
})
//makal
app.get("/find_by_food",async (req, res) => {
try {
  console.log(req.query);
  const person = await Person.findOne({
    favoriteFoods:{$in:[req.query.food]}
  })  
  console.log(person);
  res.status(200).json({message:"success",data:person});
}catch (error) {
  res.status(500).json({message:error.message});}
})
//id

app.get("/find_by_id",async (req, res) => {
  try {
    console.log(req.query);
    const person = await person.findById(req.query.id);
    res.status(200).json({message:"success",data:person});
  } catch (error) {
    res.status(500).json({message:error.message});
  }
})
//makla jdida
app.post("/find_by_id_and_update",async(req, res, ) => {

try {
  console.log(req.query);
  const person= await person.findById(req.query.id);
  person.favoiretefood.push(req.body.food)
  await person.save()
  res.status(200).json({message:"success",data:person});
  
  
  
} catch (error) {
  res.status(500).json({message:error.message});

}})
//daly  update

app.post("/find_by_name_and_update/name",async(req,res)=>{


  try{
    console.log(req.params);
    const update = await person.findOneAndUpdate({name:req.params.name},{age:req.body.age},{new:true})
    res.status(200).json({message:"success",data:update})
   }
   
   
   catch(err){
      res.status(500).json({message:error.message});
    
  }


}


) 
//delete

app.delete("/find_by_id_and_delete", async (req, res,)=> {
  try {
    console.log(req.query);

    const deleted = await Person.findByIdAndDelete(req.query.id)

    
  

    res.status(200).json({ message: "success", data:deleted });
  } catch (error) {
    res.status(500).json({ message: "error" });
  }

})

app.delete("/delete_many/:name", async (req, res,)=> {
  try {
    console.log(req.params);

    

    const deleted = await Person.deleteMany({name:req.params.name})

    
  

    res.status(200).json({ message: "success" ,data : deleted});
  } catch (error) {
    res.status(500).json({ message: "error" });
  }

})


app.listen(9999,() =>{
  console.log("server runin on port 9999");})




