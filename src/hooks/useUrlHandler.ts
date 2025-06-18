import { useState } from 'react';
import { Linking } from 'react-native';
import Toast from 'react-native-toast-message';

export function useUrlHandler() {
  const [isLoading, setIsLoading] = useState(false);

  const handleUrlOpen = async (url: string) => {
    try {
      setIsLoading(true);
      const supported = await Linking.canOpenURL(url);

      if (supported) {
        await Linking.openURL(url);
      } else {
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Falha ao abrir a notícia. Verifique a URL.',
        });
      }
    } catch (error) {
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'Falha ao abrir a notícia. Tente novamente mais tarde.',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleUrlOpen,
  };
}
