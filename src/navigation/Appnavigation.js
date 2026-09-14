import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { colors } from "../styles/colors";
import SplashScreen from "../screens/SplashScreen";
import LoginScreen from "../screens/LoginScreen";
import HomeScreen from "../screens/HomeScreen";

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

                {/* Tela de abertura */}
                <Stack.Screen
                    name="Splash"
                    component={SplashScreen}
                    options={{ headerShown: false }}
                />
                {/*  tela de login */}
                <Stack.Screen
                    name="Login"
                    options={{ headerShown: false }}
                >

                    {(screenProps) => (
                        <LoginScreen {...screenProps} onLogin={onLogin} />
                    )}

                </Stack.Screen>

                {/* Tela da Home */}

                <Stack.Screen
                    name="Home"
                    options={{headerShown: false}}
                >
                    {(screensProps) => (

                        <HomeScreen
                            {... screensProps}
                            userName={userName}
                            tasks={tasks}
                            onToggleTask={onToggleTask}
                        />
                    )}


                </Stack.Screen>

            </Stack.Navigator>
        </NavigationContainer>
    )
}