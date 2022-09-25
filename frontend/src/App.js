import logo from './logo.svg';
import React from 'react';
import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useHistory
} from "react-router-dom";
import Contact from './pages/Contact'
import Home from './pages/Home'
import Message from './pages/Message'
import Profile from './pages/Profile'
import SendMessage from './pages/SendMessage';
import axios from 'axios';

function App() {

  const [firstname, setFirstname] = React.useState('');
  const [lastname, setLastname] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [gender, setGender] = React.useState('');
  const [email, setEmail] = React.useState('');

  let URL = 'http://localhost:5001/api/';

  let history = useHistory();

  const backHome = () => {
    history.push('/');
  }

  const newContact = async () => {

    const data = {
      firstname: firstname,
      lastname: lastname,
      phone: phone,
      address,
      gender,
      email
    }

    await axios.post( URL + 'contact', data).then((res) => {
      console.log(res.data);
    });

  }

  return (
    <Router>
      <div>

      <nav class="navbar navbar-dark navbar-expand-lg bg-primary">
        <div class="container-fluid ps-5">
          <Link to={'/'}><a style={{ textDecoration: 'none' }} onClick={() => backHome()} type="button" class="navbar-brand fw-bold">My Contacts</a></Link>
          <div className='pe-3'>
            <div class="navbar-nav">
              <button class="btn btn-danger btn-sm" data-bs-toggle="modal" data-bs-target="#exampleModal" type='button'>Add New Contact</button>
            </div>
          </div>
        </div>
      </nav>


      <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog modal-dialog-centered">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title">Add New Connection</h5>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div className='container'>
                <div class="mb-3">
                  <input type="text" value={firstname} onChange={(e) => setFirstname(e.target.value)} class="form-control" placeholder="Enter your first name" />
                </div>
                <div class="mb-3">
                  <input type="text" value={lastname} onChange={(e) => setLastname(e.target.value)} class="form-control" placeholder="Enter your last name" />
                </div>
                <div class="mb-3">
                  <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} class="form-control" placeholder="Enter your email" />
                </div>
                <div class="mb-3">
                  <input type="number" value={phone} onChange={(e) => setPhone(e.target.value)} class="form-control" placeholder="Enter your phone no." />
                </div>
                <div class="mb-3">
                  <select class="form-select" aria-label="Default select example" onChange={(e) => setGender(e.target.value)}>
                    <option selected>Gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                  </select>
                </div>
                <div class="mb-3">
                  <textarea value={address} onChange={(e) => setAddress(e.target.value)} class="form-control" placeholder='Enter your address' rows="3"></textarea>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" onClick={() => newContact()} data-bs-dismiss="modal" class="btn btn-primary">Submit</button>
            </div>
          </div>
        </div>
      </div>

        <Switch>
          <Route path="/messages">
            <Message />
          </Route>
          <Route path="/contacts">
            <Contact />
          </Route>
          <Route path="/contact/:id">
            <Profile />
          </Route>
          <Route path="/message/:id">
            <SendMessage />
          </Route>
          <Route path="/">
            <Home />
          </Route>
        </Switch>
        
      </div>
    </Router>

  );
}

export default App;
