/* eslint-disable no-underscore-dangle */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

import { Button as AntButton } from 'antd';

// COMMON COMPONENTS
import Modal from '../modal';
import Button from '../Button';

// HELPERS
import stringCutter from '../../../helpers/stringCutter';

// STYLING
import {
  Wrapper,
  Header,
  NameHeader,
  DetailsHeader,
  List,
  Row,
  Name,
  ArrowWrapper,
  ModalStyle,
  ModalHeader,
  ModalRow,
  ModalContent,
  Left,
  Right,
} from './List.style';

// NOTE: this component expects dataList to look something like this:

// const dummyTrainerList = [
//   {
//     name: 'John Doe',
//     id: '12312312423133',
//   },
//   {
//     name: 'John Doe',
//     id: '12312312423133',
//   },
//   {
//     name: 'John Doe',
//     id: '12312312423133',
//   },
// ];

class TrainerList extends Component {
  state = {
    modalOpen: false,
    selectedTrainer: null,
  };

  toggleModal = dataItem => {
    const { modalOpen } = this.state;
    this.setState({ modalOpen: !modalOpen, selectedTrainer: dataItem });
  };

  render() {
    const { dataList, role, deleteUser, userId, isMobile } = this.props;
    const { modalOpen, selectedTrainer } = this.state;

    const modalContent = selectedTrainer && (
      <>
        <ModalHeader>{selectedTrainer.name} info</ModalHeader>
        <ModalContent>
          <ModalRow>
            <Left>Organisation: </Left>{' '}
            <Right>
              {stringCutter(selectedTrainer.organization || 'N/A', isMobile)}
            </Right>
          </ModalRow>
          <ModalRow>
            <Left>Location: </Left>{' '}
            <p>{stringCutter(selectedTrainer.region || 'N/A', isMobile)}</p>
          </ModalRow>
          {/* render local lead if trainer  */}
          {selectedTrainer.role === 'trainer' && (
            <ModalRow>
              <Left>Local lead: </Left>
              <p>
                {stringCutter(selectedTrainer.localLeadName || 'N/A', isMobile)}
              </p>
            </ModalRow>
          )}
          {/* render number of trainers if local lead */}
          {selectedTrainer.role === 'localLead' && role === 'admin' && (
            <ModalRow>
              <Left>No of trainers: </Left>
              <p>{`${selectedTrainer.trainerCount}` || 'N/A'}</p>
            </ModalRow>
          )}
          <ModalRow>
            <Left>Email: </Left>
            <a href={`mailto:${selectedTrainer.email}`}>
              {stringCutter(selectedTrainer.email || 'N/A', isMobile)}
            </a>
          </ModalRow>
        </ModalContent>
        {selectedTrainer && selectedTrainer.role === 'localLead' ? (
          <>
            <Link
              to={{
                pathname: `/group-results/${selectedTrainer._id}`,
                state: { trainer: selectedTrainer },
              }}
            >
              <Button
                style={{
                  height: 'auto',
                  fontSize: '1rem',
                  marginBottom: '1rem',
                  padding: '0.5rem 1rem',
                  width: 'auto',
                  textTransform: 'capitalize',
                }}
                label={`view ${selectedTrainer.name}'s group results`}
                type="outline"
                width="150px"
              />
            </Link>

            <Link
              to={{
                pathname: `/trainer-results/${selectedTrainer._id}`,
                state: { trainer: selectedTrainer },
              }}
            >
              <Button
                style={{
                  height: 'auto',
                  fontSize: '1rem',
                  marginBottom: '1rem',
                  padding: '0.5rem 1rem',
                  width: 'auto',
                  textTransform: 'capitalize',
                }}
                label={`view ${selectedTrainer.name}'s results`}
                type="outline"
                width="150px"
              />
            </Link>
          </>
        ) : (
          <Link
            to={{
              pathname: `/trainer-results/${selectedTrainer._id}`,
              state: { trainer: selectedTrainer },
            }}
          >
            <Button
              style={{
                height: 'auto',
                fontSize: '1rem',
                margin: '0 auto',
                display: 'block',
                marginBottom: '1rem',
                padding: '0.5rem 1rem',
                width: 'auto',
                textTransform: 'capitalize',
              }}
              label={`view ${selectedTrainer.name}'s results`}
              type="outline"
              width="150px"
            />
          </Link>
        )}
      </>
    );

    return (
      <Wrapper>
        <Header>
          <NameHeader>Name</NameHeader>
          <DetailsHeader>Action</DetailsHeader>
        </Header>
        <List>
          {dataList &&
            dataList
              .sort(({ _id }) => (_id === userId ? -1 : 1))
              .map(dataItem => (
                <Row key={dataItem._id}>
                  <Name>
                    {dataItem.name} {dataItem._id === userId && '(Me)'}
                  </Name>
                  <ArrowWrapper onClick={() => this.toggleModal(dataItem)}>
                    <AntButton
                      type="primary"
                      ghost
                      style={{ marginRight: '2px' }}
                    >
                      View
                    </AntButton>
                  </ArrowWrapper>
                  {role !== 'admin' && (
                    <ArrowWrapper>
                      <AntButton
                        type="danger"
                        ghost
                        onClick={() => deleteUser(dataItem._id)}
                        style={{ marginLeft: '2px' }}
                        disabled={dataItem._id === userId}
                      >
                        Delete
                      </AntButton>
                    </ArrowWrapper>
                  )}
                </Row>
              ))}
        </List>
        <Modal
          isOpen={modalOpen}
          onClose={this.toggleModal}
          extraModalStyle={ModalStyle}
          content={modalContent}
        />
      </Wrapper>
    );
  }
}

const mapStateToProps = state => {
  return { userId: state.auth.id, isMobile: state.checkBrowserWidth.isMobile };
};

export default connect(mapStateToProps)(TrainerList);
