import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider } from 'styled-components/native';
import HomeScreen from '@/screens/HomeScreen';
import NewsDetailScreen from '@/screens/NewsDetailScreen';
import FavoritesScreen from '@/screens/FavoritesScreen';
import { myTheme } from '@/theme/theme';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <ThemeProvider theme={myTheme}>
        <SafeAreaProvider>
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
        </SafeAreaProvider>
      </ThemeProvider>
    </NavigationContainer>
  );
}
