const Contact = require("../db/models/contactModel");

const getContacts = async () => {
  const result = await Contact.find();

  return result;
};

const addContact = async (body) => {
  const result = await Contact.create(body);

  return result;
}

const removeContact = async(contactId) => {
  const result = await Contact.findByIdAndRemove(contactId);

  return result;
}

module.exports = { getContacts, addContact, removeContact };
