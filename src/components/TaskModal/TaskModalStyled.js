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
  align-items: center;
  justify-content: space-between;
  margin-bottom: 20px;
`;

export const ModalTitle = styled.span`
  font-weight: 500;
  word-break: break-word;
  padding-right: 15px;
  padding-left: 3px;
  cursor: pointer;
`;

export const ModalFormContent = styled.div`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

export const ModalForm = styled.form`
  display: flex;
  flex-flow: column nowrap;
  justify-content: center;
  align-items: center;
`;

export const ModalDescription = styled.div`
  margin-bottom: 15px;
  padding-left: 3px;
`;

export const DescriptionValue = styled.div`
  word-break: break-word;
  margin-top: 5px;
  padding-left: 10px;
  cursor: pointer;
`;