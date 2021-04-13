import styled from 'styled-components';

export const TaskTextarea = styled.textarea`
  width: 100%;
  box-sizing: border-box;
  resize: none;
  border: 0.5px solid lightgray;
  border-radius: 3px;
  color: #172b4d;
  font-size: 14px;
  padding: 9px 5px;
  font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Noto Sans, Ubuntu, Droid Sans, Helvetica Neue, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;

  :focus {
    outline: none;
  }
`;