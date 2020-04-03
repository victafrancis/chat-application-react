import React, { useState } from "react";
import {Modal,Form} from "react-bootstrap";
import axios from "axios";
import Button from '@material-ui/core/Button';

function EditRoom(props) {
  const [show, setShow] = useState(false);
  const [roomName, setRoomName] = useState(props.room.name);
  const [roomStatus, setRoomStatus] = useState(props.room.staus);
  const [roomId, setRoomId] = useState(props.room._id);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleChangeRoom = (event) => {
    setRoomName(event.target.value);
  }
  const handleChangeStatus = (event) => {
      setRoomStatus(event.target.value);
  }
  const editRoom = () => {
    //Get Current Date and Time
    var date = Date(Date.now());
    var dateStringify = date.toString();

    //send post request to create room
    axios
      .put(
        "http://chat-masters.herokuapp.com/api/update-room/" + roomId,
        {   
            name: roomName,
            lastEdit: dateStringify,
            status: roomStatus 
        },
        {
          headers: {
            "Content-Type": "application/json"
          }
        }
      )
      .then(res => {
        console.log(res);
        alert('Room was updated!');
        handleClose();
        window.location.reload();
      });
  }
 
  return (
    <>
      <Button variant="contained" color="primary" onClick={handleShow}>Edit</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={editRoom}>
            <Form.Group controlId="roomName">
              <Form.Label>Room Name</Form.Label>
              <Form.Control onChange={handleChangeRoom} type="text" value={roomName} required />
            </Form.Group>
            <Form.Group controlId="roomStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control  as="select" value={roomStatus} value={roomStatus} onChange={handleChangeStatus}>
                <option>Active</option>
                <option>Inactive</option>
              </Form.Control>
            </Form.Group>
          <Modal.Footer>
                <Button variant="contained" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" color="primary" type="submit">Save</Button>
          </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default EditRoom;
