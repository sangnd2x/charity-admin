import { useState } from 'react';
import axiosReq from '../components/api/axios';
import Sidebar from '../components/Sidebar';
import { Form, Button } from 'react-bootstrap';

const NewCharity = () => {
  const [name, setName] = useState('');
  const [recipient, setRecipient] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [target, setTarget] = useState(0);
  const [status, setStatus] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [images, setImages] = useState([]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const data = new FormData();
    data.append('name', name);
    data.append('recipient', recipient);
    data.append('startDate', startDate);
    data.append('endDate', endDate);
    data.append('target', target);
    data.append('status', status);
    data.append('longDesc', longDesc);
    data.append('shortDesc', shortDesc);
    for (let i = 0; i < images.length; i++){
      data.append('images', images[i]);
    }
    console.log(images);
    
    const postCharity = async () => {
      try {
        const response = await axiosReq.post('/new-charity', data)
        console.log(response);
      } catch (error) {
        console.log(error);
      }
    }

    postCharity();
  }

  return (
    <div className='d-flex flex-row' style={{ width: '100%'}}>
    <div>
      <Sidebar />
    </div>
    <div className='container'>
      <div className="top-section">
        <div className="title">
          <h3>New Charity</h3>
        </div>
      </div>
      <div className="container mt-5">
        <Form className='d-flex justify-content-around row'>
          <div className='col-xl-6 col-md-5 col-sm-12'>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control type="text" placeholder="Charity Name" name='name' 
                onChange={(e) => setName(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Recipient</Form.Label>
              <Form.Control type="text" placeholder="Recipient" name='recipient' 
                onChange={(e) => setRecipient(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Start Date</Form.Label>
              <Form.Control type="date" placeholder="Recipient" name='startDate' 
                onChange={(e) => setStartDate(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>End Date</Form.Label>
              <Form.Control type="date" placeholder="Recipient" name='endDate' 
                onChange={(e) => setEndDate(e.target.value)}/>
            </Form.Group> 
            <Form.Group className="mb-3">
              <Form.Label>Images</Form.Label>
              <Form.Control type="file" multiple placeholder="Select images" name='images'
                onChange={(e) => setImages(e.target.files)} />
            </Form.Group>
          </div>
          <div className='col-xl-6 col-md-5 col-sm-12'>
            <Form.Group className="mb-3">
              <Form.Label>Target</Form.Label>
              <Form.Control type="number" placeholder="Target" step={1000000} name='target' 
                onChange={(e) => setTarget(e.target.value)}/>
            </Form.Group>
              <Form.Group className="mb-3">
              <Form.Label>Status</Form.Label>
              <Form.Select aria-label="Default select example" name='status' 
                  onChange={(e) => setStatus(e.target.value)}
                defaultValue="default">
                <option value="default" disabled>Select status</option>
                <option value="ongoing">On-going</option>
                <option value="upcoming">Up-coming</option>
                <option value="stopped">Stopped</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Short Description</Form.Label>
              <Form.Control type="text" placeholder="Short Description" name='short_desc' 
                onChange={(e) => setShortDesc(e.target.value)}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Long Description</Form.Label>
              <Form.Control as="textarea" placeholder="Long Description" style={{height: '7.7rem'}} name='long_desc' 
                onChange={(e) => setLongDesc(e.target.value)}/>
            </Form.Group>
          </div>
        </Form>
        <Button variant="primary" type="submit" onClick={handleSubmit}>Submit</Button>
      </div>
    </div>
  </div>
  )
}

export default NewCharity
