import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import Signup from "../screen/Auth/Signup";
import Confirm from "../screen/Auth/Confirm";
import Login from "../screen/Auth/Login";
import AuthHome from "../screen/Auth/AuthHome";

const AuthNavigation = createStackNavigator(
    {
        AuthHome,
        Signup,
        Login,
        Confirm
    },
    {
        headerMode: "nome"
    }
);

export default createAppContainer(AuthNavigation);