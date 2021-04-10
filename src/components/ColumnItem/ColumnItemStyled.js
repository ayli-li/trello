import styled from 'styled-components';

export const LiColumn = styled.li`
  width: 100%;
  max-width: 220px;
  box-sizing: border-box;
  height: min-content;
  margin-right: 50px;
  border: 0.5px solid lightgray;
  border-radius: 5px;
  list-style: none;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  background-color: white;
  padding: 15px;
  margin-left: 20px;
`;

export const ColumnTitleItems = styled.div`
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;  
  margin-bottom: 10px;
  box-sizing: border-box;
`;

export const ColumnTitle = styled.span`
  color: #172b4d;
  font-size: 18px;
  font-weight: 500;
  word-wrap: break-word;
  width: 175px; 
`;

export const CloseSign = styled.span`
  cursor: pointer;
  font-size: 22px;
  margin-right: 2px;
  display: ${props => (props.isDragging ? 'none' : 'flex')};
  padding-top: ${props => (props.taskCloseSign) ? '6px' : '0'};
  padding-right: ${props => (props.taskCloseSign) ? '1px' : '0'};

  :hover {
    color: rgba(0,255,255, 0.7);
    transition: 0.5s;
  }
`;

export const ColumnItems = styled.div`
  display: flex;
  flex-flow: column nowrap;
  color: #172b4d;
  font-size: 16px;
`;

export const UlTasks = styled.ul`
  margin: 10px 0 0 0;
  padding: 0;  
  background-color: ${props => (props.isDraggingOver ? 'rgba(0,255,255, 0.1)' : 'white')};

  :last-child {
    margin-bottom: 0;
  }
`;