import { useState } from 'react';
import { useNavigate  } from 'react-router-dom';
import axiosReq from '../components/api/axios';
import { ToastContainer, toast } from 'react-toastify';
import Resizer from 'react-image-file-resizer';
import Sidebar from '../components/Sidebar';
import { Form, Button } from 'react-bootstrap';

const NewCharity = () => {
  const navigate = useNavigate();
  const [signedIn, setSignedIn] = useState(sessionStorage.getItem('token') ? true : false);
  const [name, setName] = useState('');
  const [recipient, setRecipient] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [target, setTarget] = useState(0);
  const [status, setStatus] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [images, setImages] = useState([]);

  // Form validation
  const [errors, setErrors] = useState({});
  const validate = (name, recipient, startDate, endDate, images, target, status, shortDesc, longDesc) => {
    const errors = [];
    if (!name) {
      errors.name = 'Please provide the name of charity'
    }
    if (!recipient) {
      errors.recipient = 'Please provide the recipient of charity'
    }
    if (!startDate) {
      errors.startDate = 'Please provide the start date of charity'
    }
    if (!endDate) {
      errors.endDate = 'Please provide the end date of charity'
    }
    if (images.length < 5) {
      errors.images = 'Please provide at least 5 images'
    }
    if (!target) {
      errors.target = 'Please provide the target of charity'
    }
    if (!status) {
      errors.status = 'Please provide the status of charity'
    }
    if (!shortDesc) {
      errors.shortDesc = 'Please provide the short description of charity'
    }
    if (!longDesc) {
      errors.longDesc = 'Please provide the long description of charity'
    }
    return errors;
  }

  // console.log(images);
  // console.log(startDate);
  // console.log(endDate);

 
  // Add new charity
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    setErrors(validate(name, recipient, startDate, endDate, images, target, status, shortDesc, longDesc));

    const data = new FormData();
      data.append('name', name);
      data.append('recipient', recipient);
      data.append('startDate', startDate);
      data.append('endDate', endDate);
      data.append('target', target);
      data.append('status', status);
      data.append('longDesc', longDesc);
      data.append('shortDesc', shortDesc);
      for (let i = 0; i < images.length; i++) {
        data.append('images', images[i]);
      }

      const postCharity = async () => {
        try {
          const response = await axiosReq.post('/admin/new-charity', data);
          if (response.status === 200) {
            toast.success('New Charity Added', {
              position: "top-right",
              autoClose: 1000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: true,
              draggable: true,
              progress: undefined,
              theme: "light",
            });
            setTimeout(() => {
              navigate('/charities');
            }, 1500);
          }
        } catch (error) {
          console.log(error);
        }
      };

      if (errors.length !== 0) {
        return;
      } else {
        postCharity();
      }
  }
  console.log(errors.length);

  return (
    <div className='d-flex flex-row' style={{ width: '100%'}}>
      <div>
        <Sidebar />
      </div>
      {signedIn ?
      <div className='container'>
        <div className="m-2">
          <div className="d-flex mt-4 justify-content-between align-items-start">
            <h3>New Charity</h3>
          </div>
        </div>
        <div className="container mt-5">
          <Form className='d-flex justify-content-between row'>
            <div className='col-xl-6 col-md-5 col-sm-12'>
              <Form.Group className="mb-3">
                <div className='d-flex justify-content-between'>
                  <Form.Label>Name</Form.Label>
                  <Form.Text className='error-msg'>{errors.name}</Form.Text>
                </div>
                <Form.Control type="text" placeholder="Charity Name" name='name' 
                  onChange={(e) => setName(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <div className="d-flex justify-content-between">
                  <Form.Label>Recipient</Form.Label>
                  <Form.Text className='error-msg'>{errors.recipient}</Form.Text>
                </div>
                <Form.Control type="text" placeholder="Recipient" name='recipient' 
                  onChange={(e) => setRecipient(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <div className="d-flex justify-content-between">
                  <Form.Label>Start Date</Form.Label>
                  <Form.Text className='error-msg'>{errors.startDate}</Form.Text>
                </div>
                <Form.Control type="date" placeholder="Recipient" name='startDate' 
                  onChange={(e) => setStartDate(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <div className="d-flex justify-content-between">
                  <Form.Label>End Date</Form.Label>
                  <Form.Text className='error-msg'>{errors.endDate}</Form.Text>
                </div>
                <Form.Control type="date" placeholder="Recipient" name='endDate' 
                  onChange={(e) => setEndDate(e.target.value)}/>
              </Form.Group> 
              <Form.Group className="mb-3">
                <div className="d-flex justify-content-between">
                  <Form.Label>Select Images</Form.Label>
                  <Form.Text className='error-msg'>{errors.images}</Form.Text>
                </div>
                <Form.Control type="file" multiple name='images'
                  onChange={(e) => setImages(e.target.files)} />
              </Form.Group>
            </div>
            <div className='col-xl-6 col-md-5 col-sm-12'>
              <Form.Group className="mb-3">
                <div className="d-flex justify-content-between">
                  <Form.Label>Target</Form.Label>
                  <Form.Text className='error-msg'>{errors.target}</Form.Text>
                </div>
                <Form.Control type="number" placeholder="Target" step={1000000} name='target' 
                  onChange={(e) => setTarget(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <div className="d-flex justify-content-between">
                  <Form.Label>Status</Form.Label>
                  <Form.Text className='error-msg'>{errors.status}</Form.Text>
                </div>
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
                <div className="d-flex justify-content-between">
                  <Form.Label>Short Description</Form.Label>
                  <Form.Text className='error-msg'>{errors.shortDesc}</Form.Text>
                </div>
                <Form.Control type="text" placeholder="Short Description" name='short_desc' 
                  onChange={(e) => setShortDesc(e.target.value)}/>
              </Form.Group>
              <Form.Group className="mb-3">
                <div className="d-flex justify-content-between">
                  <Form.Label>Long Description</Form.Label>
                  <Form.Text className='error-msg'>{errors.longDesc}</Form.Text>
                </div>
                <Form.Control as="textarea" placeholder="Long Description" style={{height: '7.7rem'}} name='long_desc' 
                  onChange={(e) => setLongDesc(e.target.value)}/>
              </Form.Group>
            </div>
          </Form>
          <Button
            variant="primary"
            type="submit" 
            className='button'
            onClick={(e) => handleSubmit(e)}
          >
            Submit
          </Button>
          <ToastContainer
            position="top-right"
            autoClose={1000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="light">
          </ToastContainer> 
        </div>
      </div> : <div className='p-3'><h1>You need to sign in!</h1></div>}
    </div>
  )
}

export default NewCharity
