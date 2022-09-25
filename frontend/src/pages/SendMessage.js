import React from 'react'
import { Link, useParams, useHistory } from 'react-router-dom';
import axios from 'axios';


const SendMessage = () => {

    const [message, setMessage] = React.useState('');
    let { id } = useParams();
    let history = useHistory();
    // let URL = 'http://localhost:5001/api/';
    let URL = 'https://kisan-contacts.herokuapp.com/api/'

    const fetchData = async () => {

        axios.get( URL + 'contact/' + id).then((res) => {
            setMessage(`Hii ${res.data.firstname} your one time otp is  ${Math.floor(100000 + Math.random() * 900000) }.`)
        })

    }

    const sendMessage = async () => {

        await axios.post( URL + 'message', { message: message, contact: id }).then((res) => {
            history.push('/messages');
        })



    }

    React.useEffect(() => {
        fetchData();
    }, []);


  return (
    <>

        <div className='container'>

            <div className="row my-3">
                <div className="col-sm-2 col-md-4"></div>
                <div className="col-sm-8 col-md-4">
                
                    <div class="card">
                        <div class="card-body">
                            <h5 class="card-title">Enter Message</h5>
                            <div class="mb-3">
                                <textarea value={message} onChange={(e) => setMessage(e.target.value)} class="form-control" id="exampleFormControlTextarea1" rows="3"></textarea>
                            </div>
                            <Link to={'/contacts'}><a href="#" class="btn btn-secondary">Back</a></Link>
                            <button type='button' onClick={() => sendMessage()} class="btn btn-success ms-2">Send</button>
                        </div>
                    </div>

                </div>
                <div className="col-sm-2 col-md-4"></div>
            </div>
        </div>
    
    </>
  )
}

export default SendMessage