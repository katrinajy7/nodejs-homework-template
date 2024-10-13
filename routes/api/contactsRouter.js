import express from "express";
import {
  getAllContacts,
  getContactById,
  addContact,
  deleteContact,
  updateStatusContact,
} from "../../controllers/contactsController.js";

const router = express.Router();

// corresponds to listContacts
router.get("/", getAllContacts);

// corresponds to getContactById
router.get("/:contactId", getContactById);

// corresponds to addContact
router.post("/", addContact);

// corresponds to removeContact
router.delete("/:contactId", deleteContact);

// corresponds to updateContact
router.put("/:contactId", updateStatusContact);

export { router };





//ORIGINAL
// const express = require('express')

// const router = express.Router()

// router.get('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.get('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.post('/', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.delete('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// router.put('/:contactId', async (req, res, next) => {
//   res.json({ message: 'template message' })
// })

// module.exports = router


// //SECOND CHANGE
// import express from "express";
// import { listContacts, getContactById, addContact, removeContact, updateContact } from "../../models/contacts";

// const router = express.Router()

// router.get('/', async (req, res, next) => {
//   // res.json({ message: 'template message' })
//   try {
//     const result = await listContacts();
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

// router.get('/:contactId', async (req, res, next) => {
//   // res.json({ message: 'template message' });
  
//   try {
//     const { contactId } = req.params;
//     const result = await getContactById(contactId);

//   if (!result) {
//     res.status(404).json({ message: "Not found "});

// //create an error
//     const error = new Error("Not found");
//     error.status = 404;
//     throw error;
//   }

//     res.json(result);
//   } catch (error) {
//     next(error);
//   }
//    return result;
  
  
// });

// router.post('/', async (req, res, next) => {
//   // res.json({ message: 'template message' });

//   const { name, email, phone } = req.body;
//   try {
//     const result = await addContact(req.body);
//     res.status(201).json(result);
//   } catch (error) {
//     next(error);
//   }
  

// });

// router.delete('/:contactId', async (req, res, next) => {
//   // res.json({ message: 'template message' });
//   try {
//     const { contactId } = req.params;
//     const result = await removeContact(contactId);
    
//     if (!result) {
//       res.status(404).json({ message: "Not found" });

//       const error = new Error("Not found");
//       error.status = 404;
//       throw error;
//     }
//       res.json(result); 
//   }   catch (error) {
//       next(error);
//   }
//       return result;
// });


// router.put('/:contactId', async (req, res, next) => {
//   // res.json({ message: 'template message' });

//   try {
//     const result = await updateContact(req.params.contactId, req.body);

//     if (!result) {
//       res.status(404).json({ message: "Not found "});

//       const error = new Error("Not found");
//       error.status = 404;
//       throw error;
//     }
//     res.status(200).json(result);
//   } catch (error) {
//     next(error);
//   }
// });

  
// // module.exports = router;

// export { router };