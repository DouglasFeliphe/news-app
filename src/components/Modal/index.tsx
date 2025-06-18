import { useState } from 'react';
import { Modal as RNModal } from 'react-native';
import {
  ModalContainer,
  ModalContent,
  ModalHeader,
  ModalTitle,
} from './styles';
import { useModal } from '@/contexts/modal';
interface ModaProps {
  children: React.ReactNode;
}
export const Modal = ({ children }: ModaProps) => {
  const { isOpen, closeModal } = useModal();
  return (
    <>
      <RNModal
        animationType="fade"
        transparent={true}
        visible={isOpen}
        onRequestClose={() => closeModal()}
      >
        <ModalContainer>
          <ModalContent>
            <ModalHeader>
              <ModalTitle>Selecionar Categoria</ModalTitle>
            </ModalHeader>
            {children}
          </ModalContent>
        </ModalContainer>
      </RNModal>
    </>
  );
};
