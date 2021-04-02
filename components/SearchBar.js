import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { TextInput } from 'react-native';

function SearchBar({ value, onChange, onSubmit }) {
  return <TextInput value={value} onChangeText={onChange} placeholder="Search" />;
}

SearchBar.propTypes = {
  value: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
};

export default SearchBar;