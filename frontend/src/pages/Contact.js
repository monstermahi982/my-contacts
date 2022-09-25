import React from 'react'
import axios from 'axios';
import { useHistory } from 'react-router-dom'

const Contact = () => {

    const [contacts, setContacts] = React.useState([]);
    const history = useHistory();
    // let URL = 'http://localhost:5001/api/';
    let URL = 'https://kisan-contacts.herokuapp.com/api/'

    const fetchContacts = async () => {
        const data = await axios.get( URL + 'contacts');
        setContacts(data.data);
    }

    const sendToView = (id) => {
        history.push('/contact/' + id);
    }

    const sendToMessage = (id) => {
        history.push('/message/' + id);
    }

    React.useEffect(() => {

        fetchContacts();

    }, [])

  return (
    <>

        <div className="container text-center my-5">
        
        
            <div className="container text-center">
                <div className="row">
                    <div className="col-sm-2 col-md-3"></div>
                    <div className="col-sm-8 col-md-6">
                    <ol className="list-group list-group-numbered">
                        {
                            contacts.map((contact, index) => (
                                <li className="list-group-item d-flex justify-content-between align-items-start" key={index}>
                                    <div className="ms-2 me-auto">
                                    <div className="fw-bold">{ contact.firstname + ' ' + contact.lastname }</div>
                                        { contact.phone }
                                    </div>
                                    <div class="btn-group btn-group-sm" role="group" aria-label="Basic mixed styles example">
                                        <button type="button" onClick={() => sendToView(contact._id)} class="btn btn-warning">View</button>
                                        <button type="button" onClick={() => sendToMessage(contact._id)} class="btn btn-success">Message</button>
                                    </div>
                                </li>
                        ))}
                    </ol>
                    </div>
                    <div className="col-sm-2 col-md-3"></div>
                </div>
            </div>

        </div>
    
    </>
  )
}

export default Contact