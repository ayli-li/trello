import styled from 'styled-components';

export const ColumnCreator = styled.div`
  width: 100%;
  max-width: 220px;
  box-sizing: border-box;
  height: min-content;
  border: 0.5px solid lightgray;
  border-radius: 5px;
  list-style: none;
  display: flex;
  flex-flow: column nowrap;
  justify-content: space-between;
  background-color: white;
  padding: 15px;
`;

export const ColumnForm = styled.form`
  width: 100%;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
  align-items: ${props => (props.formTextarea ? 'flex-start' : 'center')};
  color: #172b4d;
  font-size: 16px;
  margin-bottom: 20px;
`;

export const ColumnTitleInput = styled.input.attrs(props => ({
  type: 'text',
}))`
  border: 0.5px solid lightgray; 
  border-radius: 3px;
  max-width: 160px;
  padding: 3px;
  color: #172b4d;
  font-size: 16px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  :focus {
    outline: none;
  }
`;