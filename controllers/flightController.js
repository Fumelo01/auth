const Post = require("../models/flights.js");
const mongoose = require("mongoose")






// Delete Flight Schedule
exports.delFlight = async (req, res) => {
  try {
    let id = {_id : req.params.id}
    Post.findOne({_id: req.params.id}, (err, found)=> {
      if (err) throw err;
      if (!found) {
        console.error({Error: `Oops! _id: ${req.params.id} does not exist `})
        res.status(404).json({Error: `Oops! Flight scheduled with _id: ${req.params.id} does not exist `})
      }
      console.log({success: `Flight schedule has successfully been found`})
    });
    let deleted = await Post.findOneAndDelete(id)
    if (deleted) {
      console.log({success: `User with _id: ${req.params.id} has been successfully deleted`})
      res.json({success: `User with _id: ${req.params.id} has been successfully deleted`})
    }
  } catch (err) {
    console.log({Error: err})
    res.status(500).json({Error: err})
  }
}



//Get all flights
exports.allFlights = async (req, res) => {
 // fetch all flight
  // send the flight array as response to the client
  // destructure page and limit and set default values
  const { page = 1, limit = 5 } = req.query;
  try {
    // execute query with page and limit values
    const posts = await Post.find()
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    // get total documents in the Posts collection
    const count = await Post.countDocuments();
    // return response with posts, total pages, and current page
    console.log({posts})
    res.json({
      posts,
      totalPages: Math.ceil(count / limit),
      currentPage: page
    });
  } catch (err) {
    console.error(err.message);
  }
}



// Update Flight data
exports.modifySchedule = async (req, res) => {
  try {
    // Get id
    const id = {_id : req.params.id}
    // Check if Schedule exists
    Post.findOne({_id: req.params.id}, (err, found)=> {
      if (err) throw err;
      if (!found) {
        console.log({Error: `Oops! Flight scheduled with _id: ${req.params.id} does not exist `})
        console.error({Error: `Oops! _id: ${req.params.id} does not exist `})
      }
      console.log({success: `Flight schedule has successfully been found`})
    });
    // Get data to update
    let edit = await {
      date: req.body.date,
      time: req.body.time,
      price: req.body.price
    }
    let update = await Post.findOneAndUpdate(id, edit, {new: true})
    console.log({success: `Flight schedule has successfully been updated`})
    res.send({success:`Flight schedule has successfully been updated`, Update: update})
  } catch {
    console.log({Error: err})
    res.status(500).json({Error: err})
  }
}



// Get a flight schedule by id
exports.singleSchedule = async(req, res) => {
  Post.findOne({_id: req.params.id}, async (err, post)=> {
    if(err){
      console.log({msg: err})
      return res.status(500).json({Error : err})
    }
    if (!post){
      console.log({Error: `Oops! Flight scheduled with _id: ${req.params.id} does not exist `})
      res.status(400).json({Error: `Oops! _id: ${req.params.id} does not exist `})
    }
    console.log({Success: `The Flight scheduled  with id: ${req.params.id} has been found`})
    return res.status(200).json({Success: `The Flight scheduled  with id: ${req.params.id} has been found`, Task: post})
  })
}


// Creating a flight schedule
exports.scheduleFlight = async (req, res) => {
  const post = new Post({
    from: req.body.from,
    to: req.body.to,
    price: req.body.price,
    time: req.body.time,
    date: req.body.date
  });
  try {
    let savedPost = await post.save();
    res.json({message:'new flight sucessfully scheduled', schedule: savedPost});
  } catch (err) {
    res.status(404).json({error: err});
  }
};



