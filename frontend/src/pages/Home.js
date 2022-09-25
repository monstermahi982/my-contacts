import React from 'react'

import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <>
    
    <div className="container text-center">
        <div className="container text-center mt-5">
            <div className="row">
                <div className="col-sm-0 col-md-2"></div>
                <div className="col-sm-12 col-md-4 bg-danger rounded-pill p-5 m-2">

                    <Link to='/contacts'><button type="button" className="btn btn-primary">Contacts</button></Link>

                </div>
                <div className="col-sm-12 col-md-4 bg-danger rounded-pill p-5 m-2">

                    <Link to='/messages'><button type="button" className="btn btn-primary">Messages</button></Link>

                </div>
                <div className="col-sm-0 col-md-2"></div>
            </div>
        </div>
    </div>
        

    </>
  )
}

export default Home