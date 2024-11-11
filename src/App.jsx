import './App.css'
import React, { useState } from 'react';

function App() {
  const [contacts, setContacts] = useState([]);
  const [currentContact, setCurrentContact] = useState({ name: '', phone: '', email: '' });
  const [searchTerm, setSearchTerm] = useState('');

  // Add or update a contact...
  const handleSaveContact = () => {
    if (currentContact.id) {
      // Update contact...
      setContacts(contacts.map(contact => 
        contact.id === currentContact.id ? currentContact : contact
      ));
    } else {
      // Add new contact...
      setContacts([...contacts, { ...currentContact, id: Date.now() }]);
    }
    setCurrentContact({ name: '', phone: '', email: '' });
  };

  // Edit contact...
  const handleEditContact = (contact) => {
    setCurrentContact(contact);
  };

  // Delete contact...
  const handleDeleteContact = (id) => {
    setContacts(contacts.filter(contact => contact.id !== id));
  };

  // Filter contacts by search term....
  const filteredContacts = contacts.filter(contact =>
    contact.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div>
      <h1 className="heading">Contact Management</h1>
      <div className="search-contact-div">
      <input
        className="search-contact"
        type="text"
        placeholder="Search contacts..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}

      />
      </div>
      
      
      
      <ContactForm
        contact={currentContact}
        onSave={handleSaveContact}
        onChange={(field, value) => setCurrentContact({ ...currentContact, [field]: value })}
      />
      
      <ContactList
        contacts={filteredContacts}
        onEdit={handleEditContact}
        onDelete={handleDeleteContact}
      />
    </div>
  );
}

function ContactForm({ contact, onSave, onChange }) {
  return (
    <div className="manage-contactForm">
      <input
        className="set-Name"
        type="text"
        placeholder="Name"
        value={contact.name}
        onChange={(e) => onChange('name', e.target.value)}
      />
      <input
       className="set-phone"
        type="text"
        placeholder="Phone"
        value={contact.phone}
        onChange={(e) => onChange('phone', e.target.value)}
      />
      <input
      className="set-email"
        type="text"
        placeholder="Email"
        value={contact.email}
        onChange={(e) => onChange('email', e.target.value)}
      />
      <button className="contact-button" onClick={onSave}>{contact.id ? 'Update' : 'Add'} Contact</button>
    </div>
  );
}

function ContactList({ contacts, onEdit, onDelete }) {
  return (
    <ul className="contact-list">
    {contacts.map(contact => (
      <li key={contact.id} className="contact-item">
        <div className="contact-info">
          <strong className="screen-name">{contact.name}</strong>
          <span className="screen-phone">{contact.phone}</span>
          <span className="screen-gmail">{contact.email}</span>
        </div>
        <div className="action-buttons">
          <button className="edit-button" onClick={() => onEdit(contact)}>Edit</button>
          <button className="delete-button" onClick={() => onDelete(contact.id)}>Delete</button>
        </div>
      </li>
    ))}
  </ul>
  );
}

export default App;
