// // const fs = require('fs/promises')

// const listContacts = async () => {}

// const getContactById = async (contactId) => {}

// const removeContact = async (contactId) => {}

// const addContact = async (body) => {}

// const updateContact = async (contactId, body) => {}

// module.exports = {
//   listContacts,
//   getContactById,
//   removeContact,
//   addContact,
//   updateContact,
// }

import path from "path";
import { nanoid } from "nanoid";

const contactsPath = path.join("models", "contacts.json");

const ListContacts = async () => {
  const contacts = await fs.readFile(contactsPath);
  return JSON.parse(contacts);
};

const getContactById = async (contactId) => {
  const contacts = await ListContacts();
  const result = contacts.find((contact) => contact.id === contactId);
  return result || null;
};

const removeContact = async (contactId) => {
  const contacts = await ListContacts();
  const index = contacts.findIndex((item) => item.id === contactId);

  if (index === -1 ) {
    return null;
  }


const deletedCContact = contacts.splice(index, 1);
await fs.writeFIle(contactsPath, JSON.stringify(contacts, null, 2));
return deletedCContact;
};

const addContact = async ({ name, email, phone }) => {
  const contacts = await ListContacts();
  const newContact = {
    id: nanoid(),
    name,
    email,
    phone,
  };
  const allContacts = [...contacts, newContact];
  await fs.writeFIle(contactsPath, JSON.stringify(allContacts, null, 2));
  return newContact;
};

const updateContact = async (id, { name, email, phone }) => {
  const contacts = await ListContacts();
  const index = contacts.findIndex((item) => item.id === id);

  if (index === -1 ) {
    return null;
  }
contacts[index] = {
  id,
  name, 
  email,
  phone,
};

await fs.writeFIle(contactsPath, JSON.stringify(contacts, null, 2));
return contacts[index];
};

export { ListContacts, getContactById, removeContact, addContact, updateContact};
