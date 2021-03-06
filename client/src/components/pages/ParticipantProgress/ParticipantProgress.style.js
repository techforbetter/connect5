import styled from 'styled-components';
import { colors } from '../../../theme';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 90%;
  margin: 0 auto;
  padding-top: 5rem;

  max-width: 650px;
`;

export const Span = styled.p`
  text-align: left;
  border-bottom: 1px solid ${colors.lightGray};
`;
