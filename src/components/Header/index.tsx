import { TouchableOpacity } from 'react-native';

import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import {
  FavoritesButton,
  HeaderContainer,
  HeaderContent,
  HomeButton,
  LogoContainer,
  LogoIconContainer,
  LogoText,
  NavButtonText,
  NavContainer,
  SparkleIcon,
} from './styles';
import { myTheme } from '@/theme/theme';

interface HeaderProps {
  showBackButton?: boolean;
  title?: string;
}

export default function Header({ showBackButton = false, title }: HeaderProps) {
  const navigation = useNavigation();

  return (
    <HeaderContainer>
      <HeaderContent>
        {showBackButton ? (
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ flexDirection: 'row', alignItems: 'center' }}
          >
            <Ionicons name="arrow-back" size={24} color="#10b981" />
            <LogoText style={{ marginLeft: 8 }}>{title || 'Voltar'}</LogoText>
          </TouchableOpacity>
        ) : (
          <LogoContainer>
            <LogoIconContainer>
              <Ionicons name="newspaper" size={32} color="#10b981" />
              <SparkleIcon name="flash" size={16} color="#eab308" />
            </LogoIconContainer>
            <LogoText>Portal de Notícias</LogoText>
          </LogoContainer>
        )}

        {!showBackButton && (
          <NavContainer horizontal>
            <HomeButton onPress={() => navigation.navigate('Home' as never)}>
              <Ionicons name="home" size={16} color={myTheme.colors.text} />
              <NavButtonText color="primary">Início</NavButtonText>
            </HomeButton>
            <FavoritesButton
              onPress={() => navigation.navigate('Favorites' as never)}
            >
              <Ionicons name="heart" size={16} color={myTheme.colors.error} />
              <NavButtonText color="secondary">Favoritos</NavButtonText>
            </FavoritesButton>
          </NavContainer>
        )}
      </HeaderContent>
    </HeaderContainer>
  );
}
