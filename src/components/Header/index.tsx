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
  HeaderTitle,
  NavButtonText,
  NavContainer,
  SparkleIcon,
} from './styles';
import { myTheme } from '@/theme/theme';
import { MotiView } from 'moti';

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
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingVertical: 8,
            }}
          >
            <Ionicons
              name="arrow-back"
              size={24}
              color={myTheme.colors.primary}
            />
            <HeaderTitle style={{ marginLeft: 8 }}>
              {title || 'Voltar'}
            </HeaderTitle>
          </TouchableOpacity>
        ) : (
          <LogoContainer>
            <LogoIconContainer>
              <MotiView
                from={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1.5 }}
                transition={{
                  type: 'spring',
                  duration: 1000,
                  loop: true,
                  repeatReverse: true,
                }}
              >
                <Ionicons
                  name="newspaper"
                  size={32}
                  color={myTheme.colors.primary}
                />
                <SparkleIcon
                  name="flash"
                  size={16}
                  color={myTheme.colors.secondary}
                />
              </MotiView>
            </LogoIconContainer>
            <HeaderTitle>Portal de Notícias</HeaderTitle>
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
