import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN } from "./AuthQueries";

const View = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export default ({navigation}) => {
    const emailInput = useInput("");
    const [loading, setLoading] = useState(false);
    const requestSecretMutation = useMutation(LOG_IN, {
        variables: {
            email: emailInput.value
        }
    });
    const handleLogin = async () => {
        const { value } = emailInput;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (value === "") {
            return Alert.alert("Email can't be empty");
        } else if (!value.includes("@") || !value.includes(".")) {
            return Alert.alert("Please write an email");
        } else if (!emailRegex.test(value)) {
            return Alert.alert("That email is invalid");
        }
        try {
            setLoading(true);
            const {
                data: { requestSecret }
            } = await requestSecretMutation();
            if (requestSecret) {
                Alert.alert("Check your email");
                navigation.navigate("Confirm");
                return;
            } else {
                Alert.alert("Account not found");
                navigation.navigate("Signup");
            }
        } catch (e) {
            console.log(e);
            Alert.alert("Can't log in now");
        } finally {
            setLoading(false);
        }
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <AuthInput 
                    {...emailInput} 
                    placeholder="Email" 
                    keyboardType="email-address"
                    returnKeyType="send"
                    onSubmitEditing={handleLogin}
                    autoCorrect={false}
                />
                <AuthButton loading={loading} onPress={handleLogin} text="Log In" />
            </View>
        </TouchableWithoutFeedback>
    );
};