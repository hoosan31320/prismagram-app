import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import { useMutation } from "react-apollo-hooks";
import * as Facebook from "expo-facebook";
import * as Google from 'expo-google-app-auth';
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { LOG_IN, CREATE_ACCOUNT } from "./AuthQueries";


const View = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

const FBContainer = styled.View`
    margin-top: 25px
    padding-top: 25px
    border-top-width: 1px;
    border-color: ${props => props.theme.lightGreyColor};
    border-style: solid;
`;

const GoogelContainer = styled.View`
    margin-top: 20px;
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
            navigation.navigate("Login", { email });
        } finally {
            setLoading(false);
        }
    };

    const fbLogin = async () => {
        try {
            setLoading(true);
            await Facebook.initializeAsync(process.env.FACEBOOK_APP_ID);
            const { type, token } = await Facebook.logInWithReadPermissionsAsync({
                permissions: ["public_profile", "email"]
            });
            if (type === "success") {
                const response = await fetch(
                    `https://graph.facebook.com/me?access_token=${token}&fields=id,last_name,first_name,email`
                );
                const { email, first_name, last_name } = await response.json();
                updateFormData(email, first_name, last_name);
                setLoading(false);
            } else {
                // type === "cancel"
            }
        } catch ({ message }) {
            Alert.alert(`Facebook Login Error: ${message}`, "");
        }
    };
    const googleLogin = async () => {
        try{
            setLoading(true);
            const result = await Google.logInAsync({
                androidClientId: process.env.GOOGLE_CLIENT_ID,
                scopes: ["profile", "email"]
            });
            if (result.type === "success") {
                const user = await fetch("https://www.googleapis.com/userinfo/v2/me", {
                    headers: { Authorization: `Bearer ${result.accessToken}` }
                });
                const { email, family_name, given_name } = await user.json();
                updateFormData(email, given_name, family_name);
            } else {
                return { cancelled: true };
            }
        } catch (e) {
            Alert.alert(`Google Login Error: ${message}`, '');
            return { error: true };
        } finally {
            setLoading(false);
        }
    };
    const updateFormData = (email, firstName, lastName) => {
        emailInput.setValue(email);
        fNameInput.setValue(firstName);
        lNameInput.setValue(lastName);
        const [username] = email.split("@");
        usernameInput.setValue(username);
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
                <FBContainer>
                    <AuthButton 
                        bgColor={"#2D4DA7"}
                        loading={false}
                        onPress={fbLogin}
                        text="Connect Facebook"
                    />
                </FBContainer>
                <GoogelContainer>
                    <AuthButton 
                        bgColor={"#ee1922"}
                        loading={false}
                        onPress={googleLogin}
                        text="Connect Google"
                    />
                </GoogelContainer>
            </View>
        </TouchableWithoutFeedback>
    );
};