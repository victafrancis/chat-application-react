import React, { useState } from "react";
import {Modal,Form} from "react-bootstrap";
import axios from "axios";
import Button from '@material-ui/core/Button';

function DeleteRoom(props) {
  const [show, setShow] = useState(false);
  const [roomName, setRoomName] = useState(props.room.name);
  const [roomStatus, setRoomStatus] = useState(props.room.status);
  const [roomId, setRoomId] = useState(props.room._id);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const deleteRoom = () => {

    //send post request to create room
    axios
      .delete(
        "http://chat-masters.herokuapp.com/api/delete-room/" + roomId,
      )
      .then(res => {
        console.log(res);
        alert('Room was deleted!');
        handleClose();
        window.location.reload()
      });
  }
 
  return (
    <>
      <Button variant="contained" onClick={handleShow}>Delete</Button>
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Delete Room</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={deleteRoom}>
            <Form.Group controlId="roomName">
              <Form.Label>Room Name</Form.Label>
              <Form.Control type="text" value={roomName} readOnly/>
            </Form.Group>
            <Form.Group controlId="roomStatus">
              <Form.Label>Status</Form.Label>
              <Form.Control type="text" value={roomStatus} readOnly/>
            </Form.Group>
          <Modal.Footer>
                <Button variant="contained" onClick={handleClose}>Cancel</Button>
                <Button variant="contained" color="secondary" type="submit">Delete</Button>
          </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </>
  );
}

export default DeleteRoom;