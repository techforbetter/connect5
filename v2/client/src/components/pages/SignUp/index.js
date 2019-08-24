import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Checkbox } from 'antd';
import { fetchLocalLeads } from '../../../actions/users';
import { signUpTrainer, checkUniqeEmail } from '../../../actions/authAction';

import Button from '../../common/Button';
import HumburgerMenu from '../../common/Menu';
import logo from '../../../assets/logo.png';
import {
  Wrapper,
  ContentWrapper,
  Form,
  Input,
  Password,
  Select,
  Item,
  Redirecting,
  StyledLink,
  LoginHeading,
  H4,
  Logo,
  AnotherLink,
} from './SignUp.style';

const { Option } = Select;

const regions = [
  'North East',
  'North West',
  'Yorkshire and the Humber',
  'East Midlands',
  'West Midlands',
  'East of England',
  'London',
  'South East',
  'South West',
];
class SignUp extends Component {
  state = {
    confirmDirty: false,
    checkLocalLead: false,
  };

  componentDidMount() {
    const { isAuthenticated, history } = this.props;
    if (isAuthenticated) {
      return history.push('/dashboard');
    }
    const { fetchLocalLeads: fetchLocalLeadsActionCreator } = this.props;
    return fetchLocalLeadsActionCreator();
  }

  componentDidUpdate(prevProps) {
    const { isEmailUnique, form } = this.props;
    const { isEmailUnique: oldIsEmailUnique } = prevProps;

    if (oldIsEmailUnique !== isEmailUnique) {
      form.validateFields(['email'], { force: true });
    }
  }

  handleConfirmBlur = e => {
    const { confirmDirty } = this.state;
    const { value } = e.target;
    this.setState({ confirmDirty: confirmDirty || !!value });
  };

  handleEmailBlur = e => {
    const { checkUniqeEmail: checkUniqeEmailActionCreator } = this.props;
    const { value } = e.target;
    if (value) {
      checkUniqeEmailActionCreator(value);
    }
  };

  onChangeCheckbox = e => {
    this.setState({ checkLocalLead: e.target.checked });
  };

  handleSubmit = e => {
    const { checkLocalLead } = this.state;
    let role = '';
    if (checkLocalLead) {
      role = 'localLead';
    } else {
      role = 'trainer';
    }
    const { form, signUpTrainer: signUpTrainerActionCreator } = this.props;
    e.preventDefault();
    form.validateFieldsAndScroll((err, values) => {
      if (!err) {
        signUpTrainerActionCreator({ role, ...values });
      }
    });
  };

  compareToFirstPassword = (rule, value, callback) => {
    const { form } = this.props;
    if (value && value !== form.getFieldValue('password')) {
      callback('Two passwords that you enter is inconsistent!');
    } else {
      callback();
    }
  };

  validateUniqueEmail = (rule, value, callback) => {
    const { isEmailUnique } = this.props;

    if (value && isEmailUnique === null) {
      callback();
    } else if (value && !isEmailUnique) {
      callback(true);
    } else {
      callback();
    }
  };

  validateToNextPassword = (rule, value, callback) => {
    const { confirmDirty } = this.state;
    const { form } = this.props;
    if (value && confirmDirty) {
      form.validateFields(['confirm'], { force: true });
    }
    callback();
  };

  render() {
    const { checkLocalLead } = this.state;
    const {
      form: { getFieldDecorator },
      localLeads,
      isAuthenticated,
      history,
      isDeskTop,
      loading,
    } = this.props;

    const { onChangeCheckbox } = this;

    if (isAuthenticated) {
      history.push('/dashboard');
      return null;
    }

    return (
      <>
        {isDeskTop && <HumburgerMenu dark="dark" />}
        <LoginHeading>
          <AnotherLink to="/">
            <Logo src={logo} alt="img" />
          </AnotherLink>
          <H4>Create a new account</H4>
        </LoginHeading>
        <Wrapper className="sign-up">
          <ContentWrapper>
            <Form
              onSubmit={this.handleSubmit}
              className="login-form"
              style={{ padding: '20px 0' }}
            >
              <Item hasFeedback>
                {getFieldDecorator('name', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your name!',
                    },
                    {
                      min: 3,
                      message: 'Please input valid name',
                    },
                  ],
                })(<Input placeholder="Name" size="large" />)}
              </Item>

              <Item hasFeedback>
                {getFieldDecorator('email', {
                  rules: [
                    {
                      type: 'email',
                      message: 'The input is not valid E-mail!',
                    },
                    {
                      required: true,
                      message: 'Please input your E-mail!',
                    },
                    {
                      message: 'Already taken',
                      validator: this.validateUniqueEmail,
                    },
                  ],
                })(
                  <Input
                    placeholder="Email"
                    onBlur={this.handleEmailBlur}
                    size="large"
                  />
                )}
              </Item>

              <Item hasFeedback>
                {getFieldDecorator('password', {
                  rules: [
                    {
                      required: true,
                      message: 'Please input your password!',
                    },
                    {
                      pattern: /(?=.*[a-z])/,
                      message:
                        'Password must contain at least 1 lowercase alphabetical character',
                    },
                    {
                      pattern: /(?=.*[A-Z])/,
                      message:
                        'Password must contain at least 1 uppercase alphabetical character',
                    },
                    {
                      pattern: /(?=.*[0-9])/,
                      message:
                        'Password must contain at least 1 numeric character',
                    },
                    {
                      pattern: /(?=.{8,})/,
                      message: 'Password must be eight characters or longer',
                    },
                    {
                      validator: this.validateToNextPassword,
                    },
                  ],
                  validateFirst: true,
                })(<Password placeholder="Password" size="large" />)}
              </Item>
              <Item hasFeedback>
                {getFieldDecorator('confirm', {
                  rules: [
                    {
                      required: true,
                      message: 'Please confirm your password!',
                    },
                    {
                      validator: this.compareToFirstPassword,
                    },
                  ],
                })(
                  <Password
                    placeholder="Confirm Password"
                    onBlur={this.handleConfirmBlur}
                    size="large"
                  />
                )}
              </Item>

              <Checkbox
                onChange={onChangeCheckbox}
                style={{ padding: ' 0 0 .5rem 0', margin: '.3rem ' }}
              >
                <span style={{ fontSize: '.9rem' }}>
                  {' '}
                  I{"''"}m acting as local lead and/or I manage groups of
                  trainers
                </span>
              </Checkbox>
              {!checkLocalLead && (
                <Item style={{ margin: '0 auto 20' }}>
                  {getFieldDecorator('localLead', {
                    rules: [
                      {
                        required: true,
                        message: 'Please select your local lead',
                      },
                    ],
                  })(
                    <Select placeholder="Local Lead" size="large">
                      {localLeads &&
                        localLeads.map(({ name, _id }) => (
                          <Option value={_id} key={_id}>
                            {name}
                          </Option>
                        ))}
                    </Select>
                  )}
                </Item>
              )}
              <Item style={{ margin: '0 auto 20' }}>
                {getFieldDecorator('region', {
                  rules: [
                    {
                      required: true,
                      message: 'Please select your region',
                    },
                  ],
                })(
                  <Select placeholder="Region" size="large">
                    {regions.map(region => (
                      <Option value={region} key={region}>
                        {region}
                      </Option>
                    ))}
                  </Select>
                )}
              </Item>

              <Item style={{ margin: '0 auto 20' }}>
                <Button
                  type="primary"
                  htmlType="submit"
                  label="Sign Up"
                  width="100%"
                  height="100%"
                  style={{ fontSize: '19px' }}
                  loading={loading}
                >
                  Sign Up
                </Button>
              </Item>

              <Redirecting>
                Already have an account?{' '}
                <StyledLink to="/login">LOGIN</StyledLink>
              </Redirecting>
            </Form>
          </ContentWrapper>
        </Wrapper>
      </>
    );
  }
}

const mapStateToProps = state => {
  return {
    localLeads: state.fetchedData.localLeadsList,
    isAuthenticated: state.auth.isAuthenticated,
    isEmailUnique: state.auth.isEmailUnique,
    isDeskTop: state.checkBrowserWidth.isDeskTop,
    loading: state.loading.signupLoading,
  };
};

// see http://react-component.github.io/form/examples/redux.html
// to understand the syntax
export default connect(
  mapStateToProps,
  {
    fetchLocalLeads,
    signUpTrainer,
    checkUniqeEmail,
  }
)(Form.create({ name: 'SignUp' })(SignUp));
