import React from 'react';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';
import constants from "../constants";
import styles from "../styles";

const SearchBar = ({ value, onChange, onSubmit }) => (
  <TextInput 
    style={{
      width:constants.width - 40,
      height:35,
      backgroundColor: styles.lightGreyColor,
      padding: 10,
      borderRadius: 5,
      textAlign: "center"
    }}
    value={value} 
    onChangeText={onChange}  
    onEndEditing={onSubmit}
    returnKeyType="search"
    placeholder="Search"
    placeholderTextColor={styles.darkGreyColor}
  />
);

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;