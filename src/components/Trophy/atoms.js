import styled from '@emotion/styled';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

export const TrophiesContainer = styled.div`
  position: absolute;
  right: 50px;
  bottom: 50px;
`;

export const TrophiesShorthand = styled.div`
  display: flex;
  position: relative;
  align-items: center;
`;

export const Trophy = styled(EmojiEventsIcon)`
  font-size: 100px;
  color: peachpuff;
`;