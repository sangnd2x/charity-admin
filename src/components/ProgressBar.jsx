import React from 'react'

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  const containerStyles = {
    height: 15,
    width: '100%',
    backgroundColor: "RGBA(206, 149, 128, .8)",
    borderRadius: 50,
    margin: '20px 0' 
  }

  const fillerStyles = {
    height: '100%',
    width: `${completed}%`,
    backgroundColor: bgcolor,
    transition: 'width 1s ease-in-out',
    borderRadius: 'inherit',
    textAlign: 'right',
    display: 'flex',
    justifyContent: 'end',
    alignItems: 'center'
  }

  const labelStyles = {
    color: 'white',
    fontWeight: '500',
    marginRight: 10
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{`${completed}%`}</span>
      </div>
    </div>
  );
}

export default ProgressBar
