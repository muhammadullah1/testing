import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import LogoModal from "../ManageContent/LogoModal";
import SocialMediaLinks from "../ManageContent/SocialMediaLinks";
import PagesName from "../ManageContent/PagesName";
import Color from "../ManageContent/Color";
const CardWithHeader = ({ logoText, icon, children }) => {
    const [isModalVisible, setIsModalVisible] = useState(false);
    const onCreate = (values) => {
        console.log('Received values of form: ', values);
    };

    const toggleModal = () => setIsModalVisible(!isModalVisible);
    
    return (
        <div className="manage-content">
            <div className='d-flex justify-content-between p-2 m-2 border-bottom'>
                <p className='text-muted'>{logoText}</p>
                <div className="d-flex justify-content-end gap-3 align-items-center ">
                    {isModalVisible && <LogoModal isModalVisible={isModalVisible} handleCancel={toggleModal} />}
                </div>
                <Link
                    onClick={toggleModal}
                >
                    <img
                        className="icon-13 action-edit-icon"
                        src={icon}
                        alt="Edit"
                    />
                </Link>
            </div>
            {children}
        </div>
    )
}

export default CardWithHeader