import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-flow: column nowrap;
  width: 1400px;
  margin: 0 auto;
  height: 100%;
`;

export const Columns = styled.div`
  display: flex;
  flex-flow: row nowrap;
  align-items: flex-start;
  height: 100%;
  width: 100%;
`;

export const UlColumns = styled.ul`
  display: flex;
  flex-flow: row nowrap;
  justify-content: flex-start;  
  overflow: auto;
  list-style: none;
  margin: 0;
  padding: 0; 
  height: 100%;
  max-width: 80%;
  margin-right: 20px;
`;

export const Btn = styled.button`
  background-color: ${props => (props.deleteTask || props.addTask ? '#ff9892' : '#fff')};
  min-width: ${props => (props.addColumn ? '115px' : '100%')};
  border: 0.5px solid lightgray;
  color: ${props => (props.deleteTask || props.addTask ? 'white' : '#172b4d')};
  padding: 4px;
  margin: ${props => (props.description ? '0 0 20px 0' : '0')};
  border-radius: 5px;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  :hover {
    background-color: ${props => (props.deleteTask ? '#ff736d' : 'rgba(0,255,255,1)')};
    color: ${props => (props.addTask ? 'white' : '#172b4d')};
    transition: 0.5s;
  }

  :focus {
    outline: none;
  }
`;