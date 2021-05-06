
import { useState } from 'react';
import { connect } from 'react-redux';
import { contactsOperations } from '../../redux-js/contacts';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

const initialState = {
    name: '',
    number: '',
};

const ContactForm = ({ onSubmit }) => {
    const [inputValue, setInputValue] = useState(initialState);
    const { name, number } = inputValue;

    const changeInput = e => {
        const { name, value } = e.currentTarget;
        setInputValue({ ...inputValue, [name]: value });
    };

    const handleSubmit = e => {
        e.preventDefault();
        onSubmit(name, number);
        setInputValue(initialState);
    };

    return (
        <form className={styles.form} onSubmit={handleSubmit}>
            <h3>Name</h3>
            <label>
                <input
                    type="text"
                    name="name"
                    value={name}
                    pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
                    title="Имя может состоять только из букв, апострофа, тире и пробелов. Например Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan и т. п."
                    required
                    placeholder="Enter your name"
                    onChange={changeInput}
                />
                <br />
            </label>
            <h3>Number</h3>
            <label>
                <input
                    type="tel"
                    name="number"
                    value={number}
                    pattern="(\+?( |-|\.)?\d{1,2}( |-|\.)?)?(\(?\d{3}\)?|\d{3})( |-|\.)?(\d{3}( |-|\.)?\d{4})"
                    title="Номер телефона должен состоять из 11-12 цифр и может содержать цифры, пробелы, тире, пузатые скобки и может начинаться с +"
                    required
                    placeholder="Enter your number"
                    onChange={changeInput}
                />
                <br />
            </label>
            <button type="submit" className={styles.buttonForm}>
                Add contact
            </button>
        </form>
    );
};

ContactForm.propTypes = {
    onSubmit: PropTypes.func.isRequired,
};

const mapDispatchToProps = dispatch => ({
    onSubmit: (name, number) => dispatch(contactsOperations.addContact(name, number)),
});

export default connect(null, mapDispatchToProps)(ContactForm);