import React from 'react'
import { Link } from 'react-router-dom'

export default function PageNotFound(): React.JSX.Element {
  return (
    <>
      <div className="pageNotFoundContainer">
        <div className="wrapper">
          <div className="heading">
            page not found
          </div>
          <div className="mainText">
            <i className="fa-solid fa-4 fa-10x"></i>
            <i className="fa-solid fa-ban fa-10x"></i>
            <i className="fa-solid fa-4 fa-10x"></i>
          </div>
          <div className="subHeading">
            This is not the way.
          </div>
          <p className='errorText'>
            Looks like we can't find that page. Maybe check the address again, try <Link to="/login" className='link'>signing in</Link> first.
          </p>
        </div>
      </div>
    </>
  )
}
