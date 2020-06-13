const express =require('express');
const placeSchema = require('../models/place_schema');
var router = express.Router();

// Get or Retrieve All the Places in the database
router.get('/', async(req, res) => {
    try{
        const allPlaces = await placeSchema.find();
        res.status(200).json(allPlaces);
    }catch(err){
        res.status(500).send(err);
    }
});

// Add a new place to the Database
router.post('/', async(req, res) => {
    const { place_name, place_location, description, todo_activities } = req.body;

    const place = new placeSchema({
        place_name : place_name,
        place_location : place_location,
        description : description,
        todo_activities : todo_activities
    });

    await place.save().then( data => {
        res.status(200).json(data);
    }).catch(err =>{
        res.status(500).send(err);
    });
});

//Delete the Place from the Database
router.delete('/:placeId', async( req, res) => {
    const placeId = req.params.placeId;
    try{
        const deletePlace = await placeSchema.findByIdAndDelete(placeId);
        res.status(200).json(deletePlace);
    }catch(err){
        res.status(500).send(err);
    }

});

//Update the Place info in the Database
router.put('/:placeId', async(req, res) => {
    const placeId = req.params.placeId;
    const { place_name, place_location, description, todo_activities, imgSrc, editDetails} = req.body;

    await placeSchema.findByIdAndUpdate(placeId, { $set : {
            place_name : place_name,
            place_location : place_location,
            description : description,
            todo_activities : todo_activities,
            imgSrc : imgSrc,
            editDetails : editDetails
        }},
        { new: true},
        function( err, updatedPlace){
                    if(err){
                        res.status(500).send(err);
                    }
                    res.status(200).send(updatedPlace);
                }
        );
});


module.exports = router;