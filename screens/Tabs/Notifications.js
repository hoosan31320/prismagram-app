import * as React from "react";
import { gql } from "apollo-boost";
import { useState } from "react";
import { useQuery } from "react-apollo-hooks";
import { RefreshControl, SectionList, Image, TouchableOpacity } from "react-native";
import Loader from "../../components/Loader";
import constants from "../../constants";
import styled from "styled-components";

export const ME = gql`
	{
		me {
			id
			username
			updatedAt
			isSelf
			posts {
				id
				isLiked
				files {
					id
					url
				}
				likes {
					id
					user {
						id
						avatar
						username
					}
				}
			}
		}
	}
`;

const View = styled.View`

`;

const Text = styled.Text`
  align-items: center;
  margin: 0 10px;
`;

export default () => {
  const [refreshing, setRefreshing] = useState(false);
  const onRefresh = () => {
    try {
      setRefreshing(true);
      refetch();
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };
  const { data, loading, refetch } = useQuery(ME);

  const Item = ({ title }) => {
    return (
      <View>
        <Text>{title}</Text>
      </View>
    );
  };

  return (
    <View>
      {loading ? (
        <Loader />
      ) : (
        data &&
        data.me && (
          <SectionList
						key={data.me.id}
						style={{ display: "flex" }}
						contentContainerStyle={{ alignItems: "center" }}
						refreshControl={
							<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
						}
						sections={[
							{
								id: data.me.id, // Is Me user Id
								title: ["Today"], //To Do : When push Day
								data: data.me.posts.map((post) =>
									post.likes.map((like) => (
										<>
											{data.me.id !== like.user.id ? (
												<TouchableOpacity>
													<Image
														resizeMode="stretch"
														style={{
															width: constants.width / 10,
															height: constants.height / 20,
														}}
														source={{ uri: like.user.avatar }}
													/>
												</TouchableOpacity>
											) : null}
											{data.me.id !== like.user.id ? (
												<Text>{like.user.username}님이 회원님의 게시물을 좋아합니다</Text>
											) : null}
											{data.me.id !== like.user.id ? (
												<TouchableOpacity>
													<Image
														resizeMode="stretch"
														style={{
															width: constants.width / 10,
															height: constants.height / 20,
														}}
														source={{ uri: post.files[0].url }}
													/>
												</TouchableOpacity>
											) : null}
										</>
									))
								),
								// To Do : username , createdAt
							},
						]}
						keyExtractor={(item, index) => item + index}
						renderItem={({ item }) => <Item title={item} />}
						renderSectionHeader={({ section: { title } }) => <Text>{title}</Text>}
					></SectionList>
        )
      )}
    </View>
  );
};