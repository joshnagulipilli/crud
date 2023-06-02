const express = require("express");
const User = require("../model/index");
const router = express.Router();

router.post("/createUser", async (req, res) => {
  try {
    const { UserName, age, email, password, gender, State } = req.body;
    const user = new User({
      UserName,
      age,
      email,
      password,
      gender,
      State,
    });
    user.save();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("bye");
  }
});

router.get("/readfile", async (req, res) => {
  try {
    const user = await User.find();
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("bye");
  }
});


router.get("/read/:id",async(req,res)=>
{
  try {
    const id=req.params.id;
    const user = await User.findById(id);
    res.json(user);
  } catch (err) {
    console.error(err.message);
    res.status(500).send("bye");
  }
})

router.put("/update/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const user = await User.findById(id);
    const { UserName, age, email, password, gender, State} = req.body;
    user.UserName =UserName;
    user.age=age;
    user.email =email;
    user.password =password;
    user.gender =gender;
    user.State = State;
    user.save()
    res.json(user);

  } catch (err) {
    console.error(err.message);
    res.status(500).send("bye");
  }
});

router.delete('/deleteUser/:id',async(req,res)=>
{
   try {
    const id = req.params.id ;
    const user= await User.deleteOne({_id:id});
   res.json(user);

   } catch (err) {
    console.error(err.message);
    res.status(500).send("bye");
   }
})

module.exports = router;
