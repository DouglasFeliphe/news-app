// styled.d.ts
import 'styled-components/native';
import { myTheme } from './theme';

declare module 'styled-components/native' {
  type Theme = typeof myTheme;
  export interface DefaultTheme extends Theme {}
}
