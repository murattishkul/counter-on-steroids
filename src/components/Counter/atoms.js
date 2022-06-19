import styled from '@emotion/styled';
import { Button  } from '@mui/material';

export const CounterButton = styled(Button)`
  color: black;
  width: 200px;
  height: 200px;
  font-size: 44px;
  font-family: 'Kdam Thmor Pro', sans-serif;
  border-radius: 50%;
  box-shadow: black 0px 0px 0px 6px;
  &:active {
    height: 194px;
    width: 194px;
    color: light-blue,
 }
`;

export const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 50px;
  min-width: 200px;
  position: absolute;
  left: calc(50% - 100px);
  top: calc(40% - 100px);
`;

export const Count = styled.div`
  color: white;
  font-size: 72px;
`;
