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
  const handleSubmit = () =>{

  };
  React.useLayoutEffect(() =>{
    navigation.setOptions({
      headerTitle: () => (
        <SearchBar onSubmit={handleSubmit} onChange={setKeyword} value={keyword} />
      ),
    });
  }, [navigation, setKeyword]);

  return (
    <View>
      <Text>Search</Text>
    </View>
  );
}

export default Search;