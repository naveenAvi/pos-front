import React from 'react'
import { Spinner } from 'react-bootstrap'

export default function EmptyContent(list) {
  if (list !== null) {
    if (list.length !== 0) {
      return (<div></div>)
    } else {
      return (
        <div className='d-flex flex-column align-items-center'>
          <img src='/empty.png' />
          <h3>Add some </h3>
        </div>
      )
    }
  } else {
    return (
      <Spinner animation="border" role="status" className='m-4'>
        <span className="visually-hidden">Loading...</span>
      </Spinner>
    )
  }

}
