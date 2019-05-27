import styled from 'styled-components';
import { Link } from 'react-router-dom';
// import { colors } from '../../../../theme';

export const SessionActionsWrapper = styled.div`
  display: flex;
  width: 100%;
  margin: 0 auto;
  padding: 1.5rem;
  margin: 0.5rem 0;
`;

export const SessionAction = styled.div`
  width: 50%;
  margin: 0 auto;
  margin-left: 0.5rem;
`;

export const SessionEdit = styled(Link)`
  text-decoration: none;
`;

export const SessionDelete = styled.button`
  border: none;
  background: none;
`;

export const IconName = styled.span`
  color: #000;
  display: inline-block;
  padding-left: 0.35rem;
`;
