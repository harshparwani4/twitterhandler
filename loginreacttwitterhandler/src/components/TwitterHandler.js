
import React, {useState} from 'react'

import Modal from 'react-bootstrap/Modal'

import { Link } from "react-router-dom";


export default function Twitter() {

    let [showModal, setShowModal] = useState(false);

   const onButtonClick=(e)=>{
      setShowModal(true);
    }

        return (
            <div className="container">
                <div className="jumbotron row">
                        <div className="col-md-6 mt-5 mx-auto">
                        <button type="submit" onClick={onButtonClick} style={{fontSize:'20px'}} className="btn btn-lg btn-primary btn-block">
                                <i className="fab fa-twitter" ></i>
                                <span style={{paddingLeft:"5px"}}>Sign In With Twitter</span>
                        </button>
                    </div>  
                </div>
        <Modal
          show={showModal}
          onHide={()=>{setShowModal(false);}}
          dialogClassName="modal-90w"
          aria-labelledby="example-custom-modal-styling-title"
        >
          <Modal.Header closeButton>
            <Modal.Title id="example-custom-modal-styling-title">
              Authentication Policy
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <p>
              You are about to give permission for sending post and read post from your behalf to our site.
              
            </p>
            <Link to="/messenger"><button className="btn btn-lg btn-primary btn-block" >Continue</button></Link>
          </Modal.Body>
        </Modal>
            </div>
        )
}