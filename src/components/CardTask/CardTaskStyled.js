import styled from 'styled-components';

export const LiTask = styled.li`
  display: flex;
  margin-bottom: 15px;
`;

export const TaskValue = styled.div`
  vertical-align: center;
  box-sizing: border-box;
  padding: 9px 5px;
  width: 189px;
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