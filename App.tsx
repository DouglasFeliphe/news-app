import { ModalProvider } from '@/contexts/modal';
import FavoritesScreen from '@/screens/FavoritesScreen';
import HomeScreen from '@/screens/HomeScreen';
import NewsDetailScreen from '@/screens/NewsDetailScreen';
import { myTheme } from '@/theme/theme';
import { toastConfig } from '@/theme/toastConfig';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import Toast from 'react-native-toast-message';
import { ThemeProvider } from 'styled-components/native';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <SafeAreaProvider>
      <StatusBar
        backgroundColor={myTheme.colors.white}
        barStyle="dark-content"
      />
      <SafeAreaView style={{ flex: 1 }} edges={['right', 'left']}>
        <NavigationContainer>
          <ThemeProvider theme={myTheme}>
            <ModalProvider>
              <Stack.Navigator
                screenOptions={{
                  headerShown: false,
                  animation: 'slide_from_right',
                }}
              >
                <Stack.Screen name="Home" component={HomeScreen} />
                <Stack.Screen name="NewsDetail" component={NewsDetailScreen} />
                <Stack.Screen name="Favorites" component={FavoritesScreen} />
              </Stack.Navigator>
            </ModalProvider>
          </ThemeProvider>
        </NavigationContainer>
        <Toast config={toastConfig} />
      </SafeAreaView>
    </SafeAreaProvider>
  );
}
