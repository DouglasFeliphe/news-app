import Toast from 'react-native-toast-message';

export const useToast = () => {
  const showToast = (
    type: 'success' | 'error' | 'info',
    message: string,
    description?: string
  ) => {
    Toast.show({
      type,
      text1: message,
      text2: description,
      position: 'bottom',
      visibilityTime: 3000,
    });
  };

  return { showToast };
};
