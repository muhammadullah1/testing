import React from 'react'

const DetailRow  = ({ label, value }) => {
  return (
    <div className="d-flex justify-content-between mt-2">
      <p className="f-14 text-silver-mauve w-50">{label}</p>
      <p className="f-14 text-primary w-50">{value}</p>
    </div>
  )
}

export default DetailRow 
