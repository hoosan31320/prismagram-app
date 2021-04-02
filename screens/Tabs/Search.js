import React, { useState } from "react";
import styled from "styled-components";
import SearchBar from "../../components/SearchBar";

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

function Search({ navigation }) {
  const [keyword, setKeyword] = useState('');

  navigation.setOptions({
    headerTitle: () => (
      <SearchBar onSubmit={(_) => _} onChange={setKeyword} value={keyword} />
    ),
  });

  return (
    <View>
      <Text>Search</Text>
    </View>
  );
}

export default Search;