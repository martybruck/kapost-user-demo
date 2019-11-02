import React from "react"
import {Modal, Button} from 'react-bootstrap'
import 'bootstrap/dist/css/bootstrap.min.css'


export default class ConditionalModal extends React.Component {


  render() {
  const {showModal, clickHandler} = this.props

     const modal = <Modal
             show={showModal}
             dialogClassName="modal-90w"
             aria-labelledby="example-custom-modal-styling-title">
         <Modal.Header>
           <Modal.Title>Internal Error!</Modal.Title>
         </Modal.Header>

         <Modal.Body>
           <p>There was an error retrieving user data. Press the Retry button to try again...</p>
         </Modal.Body>

         <Modal.Footer>
           <Button onClick={clickHandler} variant="primary">Retry</Button>
         </Modal.Footer>
       </Modal>

       return (showModal ? modal : null)
  }
}
