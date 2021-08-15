const fs = require("fs").promises;
const path = require("path");
const { v4 } = require("uuid");

const contactsPath = path.join(__dirname, "db/contacts.json");

async function listContacts() {
    try {
        const data = await fs.readFile(contactsPath);
        const contacts = JSON.parse(data)
        console.table(contacts);
        return contacts
    }
    catch (error) {
        console.log("ERROR", error.message)
    }
}

async function getContactById(contactId) {
    try {
        const contacts = await listContacts();
        const selectContact = contacts.find(item => item.id === +contactId)
        if (!selectContact) {
            throw new Error(`Contact with id=${contactId} not found`)
        }
        console.log(selectContact);
        return selectContact
    }
    catch (error) {
        console.log("ERROR", error.message)
    }
}

async function removeContact(contactId) {
    try {
        const contacts = await listContacts();
        const idx = contacts.findIndex(item => item.id === +contactId);
        if (idx === -1) {
            throw new Error(`Contact with id=${contactId} not found`);
        }
        const newContacts = contacts.filter(item => item.id !== +contactId);
        const contactsString = JSON.stringify(newContacts);
        await fs.writeFile(contactsPath, contactsString);
        console.log(contacts[idx]);
        return contacts[idx];

    }
    catch (error) {
        console.log("ERROR", error.message)
    }
}

async function addContact(name, email, phone) {
    try {
        const newContact = {
            id: v4(),
            name,
            email,
            phone
        }
        const contacts = await listContacts();
        contacts.push(newContact);
        const contactsString = JSON.stringify(contacts);
        await fs.writeFile(contactsPath, contactsString);
        console.log(newContact);
        return newContact;
    }
    catch (error) {
        console.log("ERROR", error.message)
    }
}

module.exports = {
    listContacts,
    getContactById,
    removeContact,
    addContact
}