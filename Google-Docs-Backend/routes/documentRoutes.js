const express = require('express');
const router = express.Router();
const User = require('../models/User'); // Import your User model
const Document = require('../models/Documents'); // Import your Document model

// POST route to create a new document for a user
router.post('/:userId/documents', async (req, res) => {
  const { title, content } = req.body; // Assuming you send these fields in the request body
  const userId = req.params.userId; // Extract the userId from the request parameters

  try {
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const newDocument = new Document({
      title,
      content,
      owner: userId,
    });
    const savedDocument = await newDocument.save();

    user.documents.push(savedDocument._id);
    await user.save();

    res.status(201).json({message:"document created succesfully",id:savedDocument._id}); // Respond with the created document
  } catch (error) {
    console.error('Error creating document:', error);
    res.status(500).json({ message: 'Unable to create document' });
  }
});

router.get('/:userId/documents', async (req, res) => {
    const userId = req.params.userId; // Extract the userId from the request parameters
    try {
      // Find the user by userId
      const user = await User.findById(userId);
      if (!user) {
        return res.status(404).json({ error: 'User not found' });
      }
      const d = [];
      for(let i=0;i<user.documents.length;i++){
         const docObject = await Document.findById(user.documents[i]);
         d.push(docObject);
      }
      res.status(200).json(d);
    } catch (error) {
        console.error('Error retrieving documents:', error);
        res.status(500).json({ error: 'Unable to retrieve documents' });
      }
    });

router.get('/:documentId' , async (req,res)=>{
    const documentId = req.params.documentId;
    try{
        const document = await Document.findById(documentId);
        console.log("document sent succesfully");
        res.status(200).json(document);
    } catch(error){
        console.log('error retrieving document', error);
        res.status(500).json({error:'Unable to retrieve document'})
    }
})

router.post('/share', async(req,res)=>{
    const username = req.body.username;
    const documentId = req.body.documentId;
    console.log('sending document',documentId,' to ',username)
    try{
        const user = await User.findOne({username});
        if(user.documents.indexOf(documentId)!== -1)  return res.json({message:'User already has the document'})
        user.documents.push(documentId);
        await user.save();
        res.status(200).json({message:'doc shared to the user succesfully'});
    } catch(error){
        console.log('error finding user', error);
        res.status(500).json({message:'Unable to find user'})
    }
})

module.exports = router;
