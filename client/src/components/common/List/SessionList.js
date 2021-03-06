import React from 'react';
import moment from 'moment';
import { Icon } from 'antd';
import Spin from '../Spin';

import { readableSessionNamePairs } from '../../../constants';

import {
  Wrapper,
  Header,
  DateHeader,
  TypeHeader,
  DetailsHeader,
  List,
  Row,
  Date,
  Type,
  StyledLink,
} from './List.style';

// NOTE: this component expects dataList to look something like this:

const SessionList = ({ dataList }) => {
  if (!dataList || !Array.isArray(dataList)) {
    return <Spin />;
  }
  return (
    <Wrapper>
      <Header>
        <DateHeader>Date</DateHeader>
        <TypeHeader>Type</TypeHeader>
        <DetailsHeader>Details</DetailsHeader>
      </Header>
      <List>
        {dataList &&
          dataList.map(dataItem => (
            <Row
              key={dataItem.id}
              href={dataItem.link || undefined}
              to={dataItem.link || `/session-details/${dataItem._id}`}
              target={dataItem.blank ? '_blank' : '_self'}
            >
              <Date>{moment(dataItem.date).format('DD/MM/YYYY')}</Date>
              <Type type={dataItem.type}>
                <p>
                  {dataItem.type
                    ? readableSessionNamePairs[dataItem.type]
                    : 'N/A'}
                </p>
              </Type>
              <StyledLink
                as={dataItem.asLink ? 'a' : undefined}
                href={dataItem.link || undefined}
                to={dataItem.link || `/session-details/${dataItem._id}`}
                target={dataItem.blank ? '_blank' : '_self'}
              >
                {dataItem.linkText || <Icon type="right" />}
              </StyledLink>
            </Row>
          ))}
      </List>
    </Wrapper>
  );
};

export default SessionList;
