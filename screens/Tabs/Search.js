import React, { useState } from "react";
import styled from "styled-components";
import SearchBar from "../../components/SearchBar";
import { gql } from "apollo-boost";
import { useQuery } from "react-apollo-hooks";
import Loader from "../../components/Loader";

const SEARCH = gql`
  query search($term: String!) {
      searchPost(term: $term) {
          id
          files {
              url
          }
          likeCount
          commentCount
      }
  }
`;

const View = styled.View`
  justify-content: center;
  align-items: center;
  flex: 1;
`;

const Text = styled.Text``;

function Search({ navigation }) {
  const [keyword, setKeyword] = useState('');
  const [shouldFetch, setShouldFetch] = useState(false);
  const { loading, data } = useQuery(SEARCH, {
    variables: { term: keyword },
    skip: !shouldFetch
  });
  console.log(loading, data);
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerTitle: () => (
        <SearchBar  
          value={keyword} 
          onChange={handleChange} 
          onSubmit={handleSubmit}
        />
      ),
    });
  });

  const handleChange = (value) => {
    setKeyword(value);
    setShouldFetch(false);
  }
  const handleSubmit = () => {
    setShouldFetch(true);
  }

  return (
    <View>
      <Text>Search</Text>
    </View>
  );
}

export default Search;