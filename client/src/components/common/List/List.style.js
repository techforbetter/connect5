import styled, { css } from 'styled-components';
import { Link } from 'react-router-dom';
import { colors, borders, shadows } from '../../../theme';

export const Wrapper = styled.div`
  background-color: ${colors.white};
  box-shadow: ${shadows.secondary};
  display: flex;
  flex-direction: column;
  padding: 1rem;
  margin-bottom: 5.5rem;
`;

export const Header = styled.div`
  display: flex;
  justify-content: space-evenly;
  margin-bottom: 0.5rem;
  background: ${colors.lightGray};
  height: 3.5rem;
  margin-left: 0.2rem;
  border-radius: 5px;
`;

const sharedHeaderStyles = css`
  font-weight: 500;
  width: 100%;
  font-size: 1rem;
  margin: 1.2rem;
  margin-left: 1.75rem;
  @media (min-width: 768px) {
    margin-left: 2rem;
  }
`;

export const DateHeader = styled.h3`
  ${sharedHeaderStyles};
`;

export const TypeHeader = styled.h3`
  ${sharedHeaderStyles};
  text-align: center;
`;

export const DetailsHeader = styled.h3`
  ${sharedHeaderStyles};
  text-align: center;
`;

export const NameHeader = styled.h3`
  ${sharedHeaderStyles};
  padding-left: 2rem;
`;

export const List = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Row = styled.div`
  display: flex;
  justify-content: space-evenly;
  align-items: center;
  padding: 0.5rem 0;
  margin-left: 0.55rem;

  &:not(:last-child) {
    border-bottom: ${borders.inputBox};
  }
  @media (min-width: 768px) {
    margin-left: 2rem;
  }
  color: black;
`;

const sharedItemStyles = css`
  width: 100%;
  font-weight: 300;
  margin: 0;
`;

export const Date = styled.p`
  ${sharedItemStyles}
`;

export const Type = styled.div`
  ${sharedItemStyles}
  display: flex;
  justify-content: center;
  margin-left: 1rem;

  p {
    background-color: ${colors.lightGray};
    min-width: 2rem;
    min-height: 1.8rem;
    padding: 0.25rem 0.5rem;
    text-align: center;
    border-radius: 4px;
    margin: 0;
    text-transform: capitalize;
  }
`;

export const Name = styled.p`
  ${sharedItemStyles}
  text-transform: capitalize;
  padding-left: 2rem;
`;

export const ArrowWrapper = styled.div`
  ${sharedItemStyles}
  width: 50%;
  text-align: center;
  color: ${colors.gray};
  transition: all ease 0.2s;
  cursor: pointer;

  :hover {
    color: ${colors.primary};
  }
`;

export const ModalStyle = css`
  background-color: ${colors.white};
  height: auto;
`;

export const ModalHeader = styled.h2`
  font-size: 1rem;
  text-transform: capitalize;
  text-align: center;
  margin-bottom: 1rem;
`;

export const ModalRow = styled.div`
  border-bottom: ${borders.inputBox};
  font-weight: 300;
  display: flex;
  justify-content: space-between;
  width: 100%;
  padding: 0.5rem 0;
  /* flex-wrap; */

  p {
    text-transform: capitalize;
  }
`;

export const Left = styled.p`
  margin-right: 0.5rem;
`;

export const Right = styled.p`
  text-align: right;
`;

export const ModalContent = styled.div`
  margin-bottom: 1.5rem;
  width: 100%;
`;

export const StyledLink = styled(Link)`
  margin-bottom: 1.5rem;
  width: 100%;
  text-align: center;
  margin-top: 1.75rem;
`;

export const BackWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 80px;
  padding-left: 5%;
  cursor: pointer;
  margin: 2rem 0;
  font-weight: 500;
  font-size: 18px;
  cursor: pointer;
`;
