const express = require("express");

const router = express.Router();

const {
  getContactsCtrl,
  addContactCtrl,
  removeContactCtrl,
} = require("../../controllers/contactsControllers");

const validateContact = require("../../middlewares/validation/contactValidation");

router.get("/", getContactsCtrl);

router.post("/", validateContact, addContactCtrl);

//TODO: дописати мідлвару на валідність id;

router.delete("/:contactId", removeContactCtrl);

router.put("/:contactId");

module.exports = router;
