import { Component } from 'react';
import { Formik } from 'formik';
import { MainForm, Label, Input, Button } from './ContactForm.styled';

class ContactForm extends Component {
  state = {
    name: '',
    number: '',
  };

  onChange = e => {
    e.currentTarget.name === 'name'
      ? this.setState({ name: e.currentTarget.value })
      : this.setState({ number: e.currentTarget.value });
  };

  handleSubmit = (values, { resetForm }) => {
    resetForm();
    this.props.onSubmit(this.state);
    this.setState({ name: '', number: '' });
  };

  render() {
    return (
      <Formik initialValues={this.state} onSubmit={this.handleSubmit}>
        <MainForm autoComplete="off">
          <Label>
            Name
            <Input
              type="text"
              name="name"
              pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              onChange={this.onChange}
              value={this.state.name}
            />
          </Label>
          <Label>
            Number
            <Input
              type="tel"
              name="number"
              pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              onChange={this.onChange}
              value={this.state.number}
            />
          </Label>

          <Button type="submit">Add contact</Button>
        </MainForm>
      </Formik>
    );
  }
}

export default ContactForm;
