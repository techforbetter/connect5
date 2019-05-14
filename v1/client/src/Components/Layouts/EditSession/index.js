
import React, { Component } from "react";
import "react-datepicker/dist/react-datepicker.css";
import moment from "moment";
import axios from "axios";
import swal from "sweetalert";
import PropTypes from "prop-types";
import options from "./options";
import {
  Button, Form, Container, Input, SelectComponent, Date, Heading, Label
} from "./styledComponents";

class EditSession extends Component {
  static contextTypes = {
    router: PropTypes.object,
  };

  state = {
    startDate: null,
    sessionType: null,
    attendeesNumber: "",
    selectedOption: null,
    loaded: false,
  };

  componentDidMount() {
    const { sessionDetails } = this.props;
    const { date, type, attendees } = sessionDetails;

    this.setState({
      startDate: date,
      sessionType: type,
      attendeesNumber: parseInt(attendees || 0, 10),
      loaded: true,
    });
  }

  handleDate = (date) => {
    this.setState({ startDate: date.format("YYYY-MM-DD") });
  };

  handleAttendees = (e) => {
    this.setState({ attendeesNumber: e.target.value });
  };

  handleSession = ({ value }) => {
    this.setState({ sessionType: value });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { sessionDetails } = this.props;
    const { _id } = sessionDetails;
    const { startDate, attendeesNumber, sessionType } = this.state;

    axios
      .post(`/edit-session/${_id}`, {
        sessionType,
        startDate,
        attendeesNumber: parseInt(attendeesNumber, 10),
      })
      .then(swal("Done!", "The session has been edited successfully!"))
      .then(() => {
        const {
          router: { history },
        } = this.context;
        history.push("/view-sessions");
      })
      .catch(err => swal({
        icon: "error",
        title: err.response.data.message,
      }));
  };

  render() {
    if (!this.state.loaded) {
      return <h1>Loading...</h1>;
    }

    const { startDate, attendeesNumber, sessionType } = this.state;
    const {
      handleDate, handleAttendees, handleSession, handleSubmit,
    } = this;

    return (
      <Container>
        <Heading>Edit Session</Heading>

        <Form onSubmit={handleSubmit}>
          <Label>Session Date:</Label>
          <Date
            selected={moment(startDate)}
            placeholderText={startDate}
            onChange={handleDate}
            name="startDate"
            dateFormat="YYYY-MM-DD"
          />

          <Label>Attendees:</Label>
          <Input
            type="number"
            placeholder={attendeesNumber}
            onChange={handleAttendees}
            value={attendeesNumber}
            name="attendeesNumber"
          />

          <Label>Session Type:</Label>
          <SelectComponent
            placeholder={sessionType > 0 ? sessionType : "N/A"}
            onChange={handleSession}
            options={options}
          />
          <Button type="submit">Submit</Button>
        </Form>
      </Container>
    );
  }
}

export default EditSession;
