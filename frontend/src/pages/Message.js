import React from 'react'
import axios from 'axios';

const Message = () => {

    const [messages, setMessages] = React.useState([]);
    let URL = 'http://localhost:5001/api/';

    const fetchMessages = () => {

        axios.get( URL + 'messages').then((res) => {
            console.log(res.data);
            setMessages(res.data);
        })

    }

    React.useEffect(() => {
        fetchMessages();
    }, []);

  return (
    <>
        <div className="row my-3">
            <div className="col-sm-2 col-md-4"></div>
            <div className="col-sm-8 col-md-4">
                <div class="list-group">
                    { messages.map((message, index) => (

                        <a href="#" class="list-group-item list-group-item-action" key={index} aria-current="true">
                            <div class="d-flex w-100 justify-content-between">
                                <h5 class="mb-1" style={{ textTransform: 'capitalize' }}>{ message.contact.firstname }</h5>
                                <small>{ message.createdAt }</small>
                            </div>
                            <p class="mb-1">{ message.message }</p>
                            <small>{ message.contact.phone }</small>
                        </a>

                     ))}
                </div>
            </div>
            <div className="col-sm-2 col-md-4"></div>
        </div>
    </>
  )
}

export default Message