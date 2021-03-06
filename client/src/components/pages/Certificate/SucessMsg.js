import React, { Component } from 'react';
import { Icon } from 'antd';
import { Wrapper, Paragraph, Content } from './Certificate.style';
import Header from '../../common/Header';

export default class SucessMsg extends Component {
  render() {
    const { sendEmail } = this.props;
    return (
      <Wrapper>
        <Header type="home" userRole="participent" />
        <Content>
          <Paragraph>
            <Icon
              type="check-circle"
              className="check-icon"
              theme="twoTone"
              twoToneColor="#52c41a"
              style={{ fontSize: '30px' }}
              size="large"
            />
          </Paragraph>
          <Paragraph>
            Your certificate has been successfully downloaded
            {sendEmail && ' and sent to your email'}
          </Paragraph>
        </Content>
      </Wrapper>
    );
  }
}
