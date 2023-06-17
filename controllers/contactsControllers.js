const {
  getContacts,
  addContact,
  removeContact,
} = require("../services/contactsServices");

const getContactsCtrl = async (req, res) => {
  const result = await getContacts();

  res.json(result);
};

const addContactCtrl = async (req, res) => {
  const contact = await addContact(req.body);

  res.status(201).json(contact);
};

const removeContactCtrl = async (req, res) => {
  const result = await removeContact(req.params.contactId);

  if (!result) {
    res.status(404).json({ message: "Not found" });
    return;
  }

  res.json({ message: "contact successfully deleted" });
};

module.exports = { getContactsCtrl, addContactCtrl, removeContactCtrl };
