import styled from 'styled-components';

export const TaskTextarea = styled.textarea`
  resize: none;
  border: 0.5px solid lightgray;
  color: #172b4d;
  font-size: 14px;
  padding: 10.5px 0 5px 5px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  margin-bottom: ${props => (props.modalTextarea ? '15px' : '0')};

  :focus {
    outline: none;
  }
`;