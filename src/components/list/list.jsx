import { useDispatch, useSelector } from 'react-redux';
import { ListOfContacts } from './list-styled';
import { deleteContact } from '../../redux/operations';
import { getContacts, getFilterParam } from 'redux/selectors';

export const ContactList = () => {
  const contacts = useSelector(getContacts);
  const filters = useSelector(getFilterParam);
  const dispatch = useDispatch();

  const deleteElementsOfList = contact => {
    dispatch(deleteContact(contact.id));
  };

  const getFilteredList = () => {
    if (contacts.length) {
      return contacts.filter(item =>
        item.name.toLowerCase().includes(filters.toLowerCase())
      );
    } else {
      return [];
    }
  };

  const filteredList = getFilteredList();

  return (
    <ul>
      {filteredList.map(item => (
        <ListOfContacts key={item.id}>
          {item.name}: {item.phone}
          <button onClick={() => deleteElementsOfList(item)} type="button">
            Delete
          </button>
        </ListOfContacts>
      ))}
    </ul>
  );
};
