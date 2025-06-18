import styled from 'styled-components/native';

export const ModalContainer = styled.View`
  /* border: 2px solid red; */
  flex: 1;
  justify-content: center;
  align-items: center;
  background-color: ${({ theme }) => theme.colors.overlay};
`;

export const ModalContent = styled.View`
  background-color: ${({ theme }) => theme.colors.backgroundSecondary};
  border-radius: ${({ theme }) => theme.borderRadius.xl}px;
  width: 80%;
  max-height: 60%;
  ${({ theme }) => theme.shadows.large};
`;

export const ModalHeader = styled.View`
  padding: ${({ theme }) => theme.spacing.lg}px;
  border-bottom-width: 1px;
  border-bottom-color: ${({ theme }) => theme.colors.border};
`;

export const ModalTitle = styled.Text`
  color: ${({ theme }) => theme.colors.text};
  font-size: ${({ theme }) => theme.fontSize.lg}px;
  font-weight: bold;
  text-align: center;
`;
