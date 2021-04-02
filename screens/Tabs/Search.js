import React, { useState } from "react";
import { ScrollView, RefreshControl } from "react-native";
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
      searchUser(term: $term) {
        id
        avatar
        username
        isFollowing
        isSelf
      }
  }
`;

const Text = styled.Text``;

function Search({ navigation }) {
  const [keyword, setKeyword] = useState('');
  const [shouldFetch, setShouldFetch] = useState(false);
  const [refreshing, setRefreshing] = useState(false);
  const { loading, data, refetch } = useQuery(SEARCH, {
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

  const refresh = async () => {
    try {
      setRefreshing(true);
      refetch({ variables: { term: keyword }});
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ScrollView 
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={refresh} />
      } 
    >

    </ScrollView>
  );
}

export default Search;