import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { colors } from '../../../theme';

export const LoginHeading = styled.div`
  margin: 0 auto;
  width: 80%;
  padding: 1.5rem;
  text-align: center;
`;

export const H3 = styled.h3`
  text-align: center;
`;

export const LoginForm = styled.form``;

export const InputDiv = styled.div`
  width: 80%;
  margin: 0 auto;
  margin-bottom: 2rem;

  @media (min-width: 768px) {
    width: 30%;
    background: ${colors.ligthGray};
  }
`;

export const LoginFail = styled.div`
  width: 80%;
  color: red;
  margin-left: 3rem;
  font-size: 1rem;

  @media (min-width: 768px) {
    width: 30%;
    margin-left: 1rem;
  }
`;

export const NoAccount = styled(InputDiv)`
  color: ${colors.black};
  margin-bottom: 0;
  margin-right: 0.3rem;
  &:not(:last-child) {
    margin-top: 6rem;
  }

  @media (min-width: 768px) {
    width: 30%;
    text-align: center;
    margin: 0 auto;
  }
`;

export const AnotherLink = styled(Link)`
  font-size: 1rem;
  font-weight: bold;
  color: ${colors.black};
`;

export const Paragraph = styled.p`
  font-size: 0.9rem;
  font-weight: 500;
`;

export const ForgetPasswordLink = styled(Link)`
  display: block;
  font-size: 0.9rem;
  text-align: right;
  margin-top: 0.6rem;
`;
export const Content = styled.p`
  text-align: center;
  margin: 0 auto;

  @media (min-width: 768px) {
    width: 50%;
    text-align: center;
    margin: 2rem auto;
  }
`;
