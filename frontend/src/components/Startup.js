import React from 'react';
import { Link } from 'react-router-dom';



const Startup = () => {

        return (
          <>
          <h1>Let's go Now</h1>


          <Link to="/login">

                <button type="button" class="btn btn-success" >Log in</button>

          </Link>


          <Link to="/signup">

                 <button type="button" class="btn btn-success">Sign in</button>

          </Link>
          </>
        );


};

export default Startup;
