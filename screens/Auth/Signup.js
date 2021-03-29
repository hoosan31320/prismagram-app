import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueries";

const View = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export default ({route, navigation}) => {
    const defaultEmail = route.params?.email || ""
    const fNameInput = useInput("");
    const lNameInput = useInput("");
    const emailInput = useInput(defaultEmail);
    const usernameInput = useInput("");
    const [loading, setLoading] = useState(false);
    const createAccountMutation = useMutation(CREATE_ACCOUNT, {
        variables: {
            firstName: fNameInput.value,
            lastName: lNameInput.value,
            email: emailInput.value,
            username: usernameInput.value
        }
    });
    const handleSignup = async () => {
        const { value: fName } = fNameInput;
        const { value: lName } = lNameInput;
        const { value: email } = emailInput;
        const { value: username } = usernameInput;
        const emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (fName === "" || lName === "") {
            return Alert.alert("I need your name")
        }
        if (!emailRegex.test(email)) {
            return Alert.alert("That email is invalid");
        }
        if (username === "") {
            return Alert.alert("Invalid username");
        }
        try {
            setLoading(true);
            const {
                data: { createAccount }
            } = await createAccountMutation();
            if (createAccount) {
                Alert.alert("Account created, Log In now!");
                navigation.navigate("Login", { email });
            } 
        } catch (e) {
            console.log(e);
            Alert.alert("Username taken, Log In instead");
        } finally {
            setLoading(false);
        }
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <AuthInput 
                    {...fNameInput} 
                    placeholder="First Name" 
                    autoCapitalize="words"
                />
                <AuthInput 
                    {...lNameInput} 
                    placeholder="First Name" 
                    autoCapitalize="words"
                />
                <AuthInput 
                    {...emailInput} 
                    placeholder="Email" 
                    keyboardType="email-address"
                    returnKeyType="send"
                    autoCorrect={false}
                />
                <AuthInput 
                    {...usernameInput} 
                    placeholder="Username" 
                    returnKeyType="send"
                    autoCorrect={false}
                />
                <AuthButton loading={loading} onPress={handleSignup} text="Sign Up" />
            </View>
        </TouchableWithoutFeedback>
    );
};