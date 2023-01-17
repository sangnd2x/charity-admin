import React from 'react'
import Sidebar from '../components/Sidebar'
import { Form, Button } from 'react-bootstrap'

const NewCharity = () => {
  return (
    <div className='d-flex flex-row' style={{ width: '100%'}}>
    <div>
      <Sidebar />
    </div>
    <div className='container'>
      <div className="top-section">
        <div className="title">
          <h3>New Charity</h3>``
        </div>
      </div>
      <div className="container mt-5">
        <Form className='d-flex justify-content-around row'>
          <div className='col-xl-6 col-md-5 col-sm-12'>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Charity Name" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Recipient</Form.Label>
              <Form.Control type="text" placeholder="Recipient" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" placeholder="Recipient" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control type="date" placeholder="Recipient" />
            </Form.Group> 
            <Form.Group className="mb-3">
              <Form.Label>Images</Form.Label>
              <Form.Control type="file" placeholder="Select images" />
            </Form.Group>
            <Button variant="primary" type="submit">
            Submit
          </Button>
          </div>
          <div className='col-xl-6 col-md-5 col-sm-12'>
            <Form.Group className="mb-3">
              <Form.Label>Target</Form.Label>
              <Form.Control type="number" placeholder="Target" step={1000000}/>
            </Form.Group>
              <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select aria-label="Default select example">
                <option value="1">On-going</option>
                <option value="2">Up-coming</option>
                <option value="3">Stopped</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Short Description</Form.Label>
              <Form.Control type="text" placeholder="Short Description" />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Long Description</Form.Label>
              <Form.Control as="textarea" placeholder="Long Description" style={{height: '7.7rem'}} />
            </Form.Group>
          </div>
        </Form>
      </div>
    </div>
  </div>
  )
}

export default NewCharity
