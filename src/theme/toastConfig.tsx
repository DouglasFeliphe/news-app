import { JSX } from 'react';
import { View, Text } from 'react-native';
import {
  BaseToast,
  BaseToastProps,
  ErrorToast,
} from 'react-native-toast-message';
import { myTheme } from './theme';

export const toastConfig = {
  /*
      Overwrite 'success' type,
      by modifying the existing `BaseToast` component
    */
  success: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <BaseToast
      {...props}
      style={{ borderLeftColor: myTheme.colors.primary }}
      contentContainerStyle={{ paddingHorizontal: myTheme.spacing.lg }}
      text1Style={{
        fontSize: myTheme.fontSize.md,
        fontWeight: '400',
      }}
    />
  ),
  /*
      Overwrite 'error' type,
      by modifying the existing `ErrorToast` component
    */
  error: (props: JSX.IntrinsicAttributes & BaseToastProps) => (
    <ErrorToast
      {...props}
      text1Style={{
        fontSize: 17,
      }}
      text2Style={{
        fontSize: 15,
      }}
    />
  ),
  /*
      Or create a completely new type - `tomatoToast`,
      building the layout from scratch.
  
      I can consume any custom `props` I want.
      They will be passed when calling the `show` method (see below)
    */
  // tomatoToast: ({ text1, props }: { text1: string; props: any }) => (
  //   <View style={{ height: 60, width: '100%', backgroundColor: 'tomato' }}>
  //     <Text>{text1}</Text>
  //     <Text>{props.uuid}</Text>
  //   </View>
  // ),
};
