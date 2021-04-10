import styled from 'styled-components';

export const LiTask = styled.li`
  display: flex;
`;

export const TaskValueItems = styled.div`
  display: flex;
  flex-flow: row nowrap; 
  justify-content: space-between; 
  align-items: center;
  box-sizing: border-box;
  padding: 5px 0 5px 5px;
  width: 189px;
  margin-bottom: 10px;
  border: 0.5px solid lightgray;
  list-style: none;
  border-radius: 3px;
  font-size: 14px;
  word-wrap: break-word;
  color: ${props => (props.isDragging ? 'white' : '#172b4d')};
  background-color: ${props => (props.isDragging ? '#ff9892' : 'white')};

  :hover {
    color: #fffffa;
    background-color: #ff9892;
    transition: 0.5s;
  }
`;

export const TaskValue = styled.span`
  width: 100%;
`;