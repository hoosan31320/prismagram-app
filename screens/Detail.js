import React from "react";
import { ScrollView } from 'react-native';
import styled from "styled-components";
import { useQuery } from "react-apollo-hooks";
import { gql } from "apollo-boost";
import { POST_FRAGMENT } from "../fragment";
import Loader from "../components/Loader";
import Post from "../components/Post";

const POST_DETAIL = gql`
    query seeFullPost($id: String!) {
        seeFullPost(id: $id) {
            ...PostParts
        }
    }
    ${POST_FRAGMENT}
`;

export default ({ route }) => {
    const { loading, data } = useQuery(POST_DETAIL, {
        variables: { id: route.params.id }
    });
    return (
        <ScrollView styled={{ flex: 1 }}>
            {loading ? (
                <Loader />
            ) : (
                data &&
                data.seeFullPost &&
                <Post {...data.seeFullPost} />
            )}
        </ScrollView>
    )
};