import { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import axiosReq from '../components/api/axios';
import Sidebar from '../components/Sidebar';
import { Form, Button } from 'react-bootstrap';

const EditCharity = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const [charityId, setCharityId] = useState(location.state.charityId);
  const [charity, setCharity] = useState({});

  // Fetch details of charity
  useEffect(() => {
    const fetchEditCharity = async () => {
      const response = await axiosReq.get(`/admin/edit-charity/${charityId}`);
      setCharity(response.data);
    }

    fetchEditCharity();
  }, []);
  
  // Form validation
  const [nameTouched, setNameTouched] = useState(false);
  const [recipientTouched, setRecipientTouched] = useState(false);
  const [startDateTouched, setStartDateTouched] = useState(false);
  const [endDateTouched, setEndDateTouched] = useState(false);
  const [targetTouched, setTargetTouched] = useState(false);
  const [statusTouched, setStatusTouched] = useState(false);
  const [imagesTouched, setImagesTouched] = useState(false);
  const [shortDescTouched, setShortDescTouched] = useState(false);
  const [longDescTouched, setLongDescTouched] = useState(false);
  const [errors, setErrors] = useState({});

  const validate = (name, recipient, startDate, endDate, images, target, status, shortDesc, longDesc) => {
    const errors = [];
    if (nameTouched && !name) {
      errors.name = 'Please provide the name of charity'
    }
    if (recipientTouched && !recipient) {
      errors.recipient = 'Please provide the recipient of charity'
    }
    if (startDateTouched && !startDate) {
      errors.startDate = 'Please provide the start date of charity'
    }
    if (endDateTouched && !endDate) {
      errors.endDate = 'Please provide the end date of charity'
    }
    if (imagesTouched && images.length < 5) {
      errors.images = 'Please provide at least 5 images'
    }
    if (targetTouched && !target) {
      errors.target = 'Please provide the target of charity'
    }
    if (statusTouched &&!status) {
      errors.status = 'Please provide the status of charity'
    }
    if (shortDescTouched && !shortDesc) {
      errors.shortDesc = 'Please provide the short description of charity'
    }
    if (longDescTouched &&!longDesc) {
      errors.longDesc = 'Please provide the long description of charity'
    }
    return errors;
  }

  // console.log(charity);

  const [name, setName] = useState('');
  const [recipient, setRecipient] = useState('');
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');
  const [target, setTarget] = useState('');
  const [status, setStatus] = useState('');
  const [longDesc, setLongDesc] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [images, setImages] = useState([]);

  const handleSubmit = (id) => {
    setErrors(validate(name, recipient, startDate, endDate, images, target, status, shortDesc, longDesc));
    // e.preventDefault();

    const data = new FormData();
    data.append('id', id);
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
    // console.log(images);
    
    const postCharity = async () => {
      try {
        const response = await axiosReq.post('/admin/edit-charity', data)
        console.log(response);
        if (response.status === 200) {
          navigate('/charities');
        }
      } catch (error) {
        console.log(error);
      }
    }

    postCharity();

    if (errors.length !== 0) {
      return;
    } else {
      postCharity();
    }
  }
  console.log(errors)
  return (
    <div className='d-flex flex-row' style={{ width: '100%'}}>
    <div>
      <Sidebar />
    </div>
    <div className='container'>
      <div className="m-2">
        <div className="d-flex mt-4 justify-content-between align-items-start">
          <h3>Edit Charity</h3>
        </div>
      </div>
      <div className="container mt-5">
        <Form className='d-flex justify-content-between row'>
          <div className='col-xl-6 col-md-5 col-sm-12'>
            <Form.Group className="mb-3">
              <div className='d-flex justify-content-between px-1'>
                <Form.Label>Name</Form.Label>
                <Form.Text className='error-msg'>{errors.name}</Form.Text>
              </div>
              <Form.Control type="text" placeholder="Charity Name" name='name'
                defaultValue={charity.name}
                onChange={(e) => setName(e.target.value)}
                onBlur={() => setNameTouched(true)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <div className="d-flex justify-content-between px-1">
                <Form.Label>Recipient</Form.Label>
                <Form.Text className='error-msg'>{errors.recipient}</Form.Text>
              </div>
              <Form.Control type="text" placeholder="Recipient" name='recipient'
                defaultValue={charity.recipient}    
                onChange={(e) => setRecipient(e.target.value)}
                onBlur={() => setRecipientTouched(true)}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <div className="d-flex justify-content-between px-1">
                <Form.Label>Start Date</Form.Label>
                <Form.Text className='error-msg'>{errors.startDate}</Form.Text>
              </div>
              <Form.Control type="date" placeholder="Recipient" name='startDate'
                defaultValue={charity.startDate? charity.startDate.split('T')[0] : charity.startDate}   
                onChange={(e) => setStartDate(e.target.value)}
                onBlur={() => setStartDateTouched(true)} />
            </Form.Group>
            <Form.Group className="mb-3">
              <div className="d-flex justify-content-between px-1">
                <Form.Label>End Date</Form.Label>
                <Form.Text className='error-msg'>{errors.endDate}</Form.Text>
              </div>
              <Form.Control type="date" placeholder="Recipient" name='endDate' 
                defaultValue={charity.endDate? charity.endDate.split('T')[0] : charity.endDate}
                onChange={(e) => setEndDate(e.target.value)}
                onBlur={() => setEndDateTouched(true)}/>
            </Form.Group> 
            <Form.Group className="mb-3">
              <div className="d-flex justify-content-between px-1">
                <Form.Label>Select Images</Form.Label>
                <Form.Text className='error-msg'>{errors.images}</Form.Text>
              </div>
              <Form.Control type="file" multiple placeholder="Select images" name='images'
                onChange={(e) => setImages(e.target.files)} 
                onBlur={() => setImagesTouched(true)}/>
            </Form.Group>
          </div>
          <div className='col-xl-6 col-md-5 col-sm-12'>
            <Form.Group className="mb-3">
              <div className="d-flex justify-content-between px-1">
                <Form.Label>Target</Form.Label>
                <Form.Text className='error-msg'>{errors.target}</Form.Text>
              </div>
              <Form.Control type="number" placeholder="Target" step={1000000} name='target'
                defaultValue={charity.target}    
                onChange={(e) => setTarget(e.target.value)}
                onBlur={() => setTargetTouched(true)}/>
            </Form.Group>
            <Form.Group className="mb-3">
                <div className="d-flex justify-content-between px-1">
                  <Form.Label>Status</Form.Label>
                  <Form.Text className='error-msg'>{errors.status}</Form.Text>
                </div>
              <Form.Select aria-label="Default select example" name='status'
                defaultValue={charity.status} 
                onChange={(e) => setStatus(e.target.value)}
                onBlur={() => setStatusTouched(true)}>
                <option value="default" disabled>Select status</option>
                <option value="ongoing">On-going</option>
                <option value="upcoming">Up-coming</option>
                <option value="stopped">Stopped</option>
              </Form.Select>
            </Form.Group>
            <Form.Group className="mb-3">
              <div className="d-flex justify-content-between px-1">
                <Form.Label>Short Description</Form.Label>
                <Form.Text className='error-msg'>{errors.shortDesc}</Form.Text>
              </div>
              <Form.Control type="text" placeholder="Short Description" name='short_desc'
                defaultValue={charity.short_desc}    
                onChange={(e) => setShortDesc(e.target.value)}
                onBlur={() => setShortDescTouched(true)}/>
            </Form.Group>
            <Form.Group className="mb-3">
              <div className="d-flex justify-content-between px-1">
                <Form.Label>Long Description</Form.Label>
                <Form.Text className='error-msg'>{errors.longDesc}</Form.Text>
              </div>
              <Form.Control as="textarea" placeholder="Long Description" style={{ height: '7.7rem' }} name='long_desc' 
                defaultValue={charity.long_desc}
                onChange={(e) => setLongDesc(e.target.value)}
                onBlur={() => setLongDescTouched(true)}/>
            </Form.Group>
          </div>
        </Form>
          <Button
            variant="primary"
            type="button"
            className='button'
            onClick={() => handleSubmit(charity._id)}
          >
            Update
          </Button>
      </div>
    </div>
  </div>
  )
}

export default EditCharity
