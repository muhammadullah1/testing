import React from 'react'

const DetailSection = ({ heading, children }) => {
    return (
      <div>
        <h3 className="f-18 text-primary">{heading}</h3>
        {children}
      </div>
    )
  }

export default DetailSection
