import React from "react";
import styled from "styled-components";
import { useNavigation } from "@react-navigation/native";

const Container = styled.TouchableOpacity``;

const Text = styled.Text``;

function MessagesLink() {
  const navigation = useNavigation();

  return (
    <Container onPress={() => navigation.navigate('MessageNavigation')}>
      <Text>Messages</Text>
    </Container>
  );
}

export default MessagesLink;