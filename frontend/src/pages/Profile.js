import React from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios';

const Profile = () => {

    let { id } = useParams();
    console.log(id);
    let history = useHistory();

    const [data, setData] = React.useState({});
    // let URL = 'http://localhost:5001/api/';
    let URL = 'https://kisan-contacts.herokuapp.com/'

    const fetchData = async () => {

        axios.get( URL + 'contact/' + id).then((res) => {
            console.log(res.data);
            setData(res.data);
        
        })

    }

    const sendToMessage = (id) => {
        console.log("callein mess")
        history.push('/message/' + id);
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
                <div class="card text-center">
                    <div class="card-header">
                        { data.phone }
                    </div>
                    <div class="card-body">
                        <h5 class="card-title">{ data.firstname + " " + data.lastname }</h5>
                        <p class="card-text">{ data.address }</p>
                        <a onClick={() => sendToMessage(data._id)} class="btn btn-success">Message</a>
                    </div>
                    <div class="card-footer text-muted">
                        { data.createdAt }
                    </div>
                </div>

                </div>
                <div className="col-sm-2 col-md-4"></div>
            </div>
        </div>
    
    </>
  )
}

export default Profile