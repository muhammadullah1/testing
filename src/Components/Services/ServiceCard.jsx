import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import editicon from "../../assets/images/Icons/edit-icon.svg";
import IndividualDeleteButton from '../Common/IndividualDeleteButton';

const ServiceCard = ({ name, description, img, price, editLink, viewLink, apiEndpoint, refetch }) => {
    const navigate = useNavigate();
  return (
    <div className='border-top mt-3'>
      <div className='mb-3 p-4'>
        <div className='row'>
          <div
            className='col-md-3 cursor-pointer'
            role='button'
            onClick={() => navigate(viewLink)}
          >
            <img src={img} className='img-fluid rounded' alt='imagenotfound' width={400} height={400}/>
          </div>
          <div className='col-md-6' role='button' onClick={() => navigate(viewLink)}>
            <div className='card-body'>
              <h5 className='card-title my-2'>{name}</h5>
              <p className='card-text'>{description}</p>
            </div>
          </div>
          <div className='col-md-3 border-left px-5'>
            <p className='mt-5 text-muted f-16'>Price</p>
            <p className='f-16 fw-semibold'>
              {price}
              <span className='px-2'>SAR</span>
            </p>
            <div className='my-3 d-flex align-items-center'>
              <Link to={editLink}>
                <img className='icon-13 mr-15 action-edit-icon' src={editicon} alt='Edit' />
              </Link>
              <IndividualDeleteButton name={apiEndpoint} refetch={refetch}/>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
