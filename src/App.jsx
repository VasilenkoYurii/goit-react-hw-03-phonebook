import { Component } from 'react';
import { nanoid } from 'nanoid';
import Notiflix from 'notiflix';
import Section from 'components/Section/Section';
import ContactsList from 'components/ContactsList/ContactsList';
import Filter from 'components/Filter/Filter';
import ContactForm from 'components/ContactForm/ContactForm';

export class App extends Component {
  state = {
    contacts: [
      { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
      { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
      { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
      { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
    ],
    filter: '',
  };

  addContact = values => {
    for (const contact of this.state.contacts) {
      if (values.name.toLowerCase() === contact.name.toLowerCase()) {
        return Notiflix.Notify.failure(`${values.name} is already in contact`);
      } else if (values.number.toLowerCase() === contact.number.toLowerCase()) {
        return Notiflix.Notify.failure(
          `${values.number} is already in contact`
        );
      }
    }

    this.setState(prevState => ({
      contacts: [...prevState.contacts, { ...values, id: nanoid() }],
    }));
    Notiflix.Notify.success(
      'Super, the contact has been added to the contact list'
    );
  };

  deleteContact = (contactId, contactName) => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== contactId),
    }));
    Notiflix.Notify.success(`Contact ${contactName} deleted successfully`);
  };

  onChangeFind = e => {
    this.setState({ filter: e.target.value });
  };

  getVisibleContacts = () => {
    const { filter, contacts } = this.state;
    const normalizedFilter = filter.toLowerCase();

    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(normalizedFilter)
    );
  };

  render() {
    const { filter } = this.state;
    const visibleContacts = this.getVisibleContacts();

    return (
      <>
        <Section title="Phonebook">
          <ContactForm onSubmit={this.addContact} />
        </Section>

        <Section title="Contacts">
          <Filter onChangeFind={this.onChangeFind} value={filter} />
          <ContactsList
            contacts={visibleContacts}
            onDeleteContact={this.deleteContact}
          />
        </Section>
      </>
    );
  }
}
