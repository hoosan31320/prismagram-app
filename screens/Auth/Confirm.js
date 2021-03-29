import React, { useState } from "react";
import styled from "styled-components";
import { TouchableWithoutFeedback, Keyboard, Alert } from "react-native";
import AuthButton from "../../components/AuthButton";
import AuthInput from "../../components/AuthInput";
import useInput from "../../hooks/useInput";
import { useMutation } from "react-apollo-hooks";
import { LOG_IN, CONFIRM_SECRET } from "./AuthQueries";
import { useLogIn } from "../../AuthContext";

const View = styled.View`
    flex: 1;
    align-items: center;
    justify-content: center;
`;

export default ({route, navigation}) => {
    const { email } = route.params;
    const confirmInput = useInput("");
    const logIn = useLogIn();
    const [loading, setLoading] = useState(false);
    const confirmSecretMutation = useMutation(CONFIRM_SECRET, {
        variables: {
            secret: confirmInput.value,
            email: email
        }
    });
    const handleConfirm = async () => {
        const { value } = confirmInput;
        if (value === "" || !value.includes(" ")) {
            return Alert.alert("Invalid Secret");
        } 
        try {
            setLoading(true);
            const {
                data: { confirmSecret }
            } = await confirmSecretMutation();
            if (confirmSecret !== "" || confirmSecret !== false) {
                logIn(confirmSecret)
            } else {
                Alert.alert("Wrong Secret");
            }
        } catch (e) {
            console.log(e);
            Alert.alert("Can't Confirm Secret");
        } finally {
            setLoading(false);
        }
    };
    return (
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <View>
                <AuthInput 
                    {...confirmInput} 
                    placeholder="Secret" 
                    returnKeyType="send"
                    onSubmitEditing={handleConfirm}
                    autoCorrect={false}
                />
                <AuthButton loading={loading} onPress={handleConfirm} text="Confirm" />
            </View>
        </TouchableWithoutFeedback>
    );
};