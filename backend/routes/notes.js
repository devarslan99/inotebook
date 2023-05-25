const express = require('express');
const router = express.Router();
const Note = require('../models/Note');
const fetchuser = require('../middleware/fetchuser');
const { body, validationResult } = require('express-validator');


router.get('/fetchallnotes', fetchuser, async (req, res) => {

    try {
        const notes = await Note.find({ user: req.user.id });
        res.send(notes);

        res.json([])
    } catch (error) {
        console.log(error.message)
        ///if there is any kind of error 
        res.status(500).send("internal server error");

    }

})

// Route:2 create a note using post:/api/notes/addnote  -login required

router.post('/addnote', fetchuser, [
    body('title', 'title must contain atleast 3 characters').isLength({ min: 3 }),
    body('description', 'description must contain atleast 5 characters').isLength({ min: 5 }),

], async (req, res) => {

    try {

        const { title, description, tag } = req.body;

        ///////check error
        const errors = validationResult(req);
        //if there are errors then return bad request and errors also

        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });

        }

        const note = new Note({
            title, description, tag, user: req.user.id
        });

        const savenote = await note.save();
        res.json(savenote);
    } catch (error) {

        console.log(error.message)
        ///if there is any kind of error 
        res.status(500).send("internal server error");


    }


})


// Route:2 create a note using post:/api/notes/addnote  -login required

router.put('/updatenote/:id', fetchuser, async (req, res) => {


    const {title,description,tag}=req.body;
    // create a new note Object
    const newNote={};
    if(title){newNote.title=title};
    if(description){newNote.description=description};
    if(tag){newNote.tag=tag};
    let note=await Note.findById(req.params.id);
    if(!note){return res.status(401).send("Not found")};

    if(note.user.toString()!=req.user.id){

        return res.status(401).send("Not found");

    }
    note=await Note.findByIdAndUpdate(req.params.id,{$set:newNote},{new:true});
    res.json({note});

})

module.exports = router