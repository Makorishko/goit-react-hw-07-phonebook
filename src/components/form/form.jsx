import { nanoid } from 'nanoid';
import { Form } from './form-styled';
import { FormContainer } from './form-styled';
import { useSelector, useDispatch } from 'react-redux';
import { getContacts } from 'redux/selectors';
import { addContact } from '../../redux/operations';

export const ContactForm = () => {
  const contacts = useSelector(getContacts);
  const dispatch = useDispatch();

  const handleSubmit = evt => {
    evt.preventDefault();
    const form = evt.currentTarget;
    const name = form.elements.name.value;
    const number = form.elements.number.value;

    const isSame = contacts.find(
      contact => contact.name.toLowerCase() === name.toLowerCase()
    );

    if (isSame) {
      return alert('This name already exist');
    }

    dispatch(addContact({ name, phone: number, id: nanoid() }));
    form.reset();
  };

  return (
    <FormContainer>
      <Form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input type="text" name="name" id="name" required />
        <label htmlFor="number">Number</label>
        <input type="tel" name="number" id="number" required />
        <button type="submit">Add contact</button>
      </Form>
    </FormContainer>
  );
};
