import React, { useEffect } from 'react'
import SearchInput from './SearchInput'
import { Button } from 'antd'
import { useNavigate } from 'react-router-dom';

const Header = ({title, desc,btnText, goto,...rest}) => {
  const [width, setWidth] = React.useState(window.innerWidth);
  useEffect(() => {
    setWidth(window.innerWidth);
  }, [width]);
  const navigate = useNavigate();
  return (
    <div className="custom-card-header row gap-3">
    <div className="col">
        <p className={"text-secondary f-18 fw-500"}>{title}</p>
        <p className={"text-muted f-14 "}>{desc}</p>
    </div>
    <div className="col d-flex justify-content-end">
        <div className='mx-3' style={{height: 40,
        width: width > 768 ? 300 : 200
        }}>
            <SearchInput
            //show serch icon in placeholder
            placeholder='Search by CNIC , File Number , Phone Number'
             />
            </div>
    <Button className='primary--btn' onClick={() => navigate(goto)}>{btnText}</Button>
    </div>
</div>
  )
}

export default Header;