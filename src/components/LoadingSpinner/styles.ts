import styled from 'styled-components/native';

export const LoadingContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing.xxl}px;
`;

export const SpinnerContainer = styled.View`
  position: relative;
`;

export const LoadingText = styled.Text`
  color: ${({ theme }) => theme.colors.textSecondary};
  font-size: ${({ theme }) => theme.fontSize.md}px;
  margin-top: ${({ theme }) => theme.spacing.md}px;
  text-align: center;
`;
