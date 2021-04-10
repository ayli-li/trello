import styled from 'styled-components';

export const ModalOverlay = styled.div`
  position: fixed;
  background-color: #31373d;
  opacity: .7;
  height: auto;
  inset: 0;
`;

export const ModalWindow = styled.div`
  position: absolute;
  top: 200px;
  left: 0;
  right: 0;
  margin: auto;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-around;
  max-width: 300px;
  width: 100%;
  border: 0.5px solid lightgray;
  background-color: white;
  z-index: 1;
  padding: 20px;
  border-radius: 3px;
`;

export const ModalHeader = styled.div`
  display: flex;
  margin-bottom: 10px;
`;

export const ModalTitle = styled.span`
  font-weight: 500;
  flex-grow: 2;
  text-align: center;
  word-break: break-word
`;

export const ModalContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

export const ModalDescription = styled.div`
  margin: 15px 0;
`;