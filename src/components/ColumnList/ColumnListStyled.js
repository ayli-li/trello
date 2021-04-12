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
  background-color: ${props => (props.deleteTask ? '#ff9892' : '#fff')};
  min-width: ${props => (props.deleteTask ? '70px' : '115px')};
  border: 0.5px solid lightgray;
  color: ${props => (props.deleteTask ? 'white' : '#172b4d')};
  padding: 4px;
  margin: ${props => (props.deleteTask ? '12px 0 0 225px' : '0')};
  border-radius: 5px;
  cursor: pointer;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  :hover {
    background-color: ${props => (props.deleteTask ? '#ff736d' : 'rgba(0,255,255,1)')};
    transition: 0.5s;
  }

  :focus {
    outline: none;
  }
`;