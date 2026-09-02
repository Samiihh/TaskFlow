import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../styles/colors";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";

const Stack = createNativeStackNavigator();

export default function AppNavigation({
    userName,
    tasks,
    onLogin,
    onAddTask,
    onToggleTask
}) {
    return (
        <NavigationContainer>

            <Stack.Navigator
                initialRouteName="Splash"
                screenOptions={{
                    headerStyle: {
                        backgroundColor: colors.surface,
                    },
                    headerTintColor: colors.text,
                    headerTitleStyle: {
                        fontWeight: '700'
                    },
                    contentStyle: {
                        backgroundColor: colors.background,
                    },
                }}
            >
                <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                    options={{ headerShown: false }}
                />
                <Stack.Screen
                    name="Login"
                    options={{headerShown: false}}
                >

                    {(screenProps) => (
                        <LoginScreen {...screenProps} onLogin={onLogin}/>
                    )}

                </Stack.Screen>

            </Stack.Navigator>
        </NavigationContainer>
    )
}