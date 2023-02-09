import React from 'react'

const ProgressBar = (props) => {
  const { bgcolor, completed } = props;

  // Check if there's more than 100% completed
  let percentage = 0;
  if (completed > 100) {
    percentage = 100;
  } else {
    percentage = completed;
  }

  const containerStyles = {
    height: 15,
    width: '100%',
    backgroundColor: "rgba(196, 65, 69, 0.7)",
    borderRadius: 50,
    margin: '20px 0' 
  }

  const fillerStyles = {
    height: '100%',
    width: `${percentage}`,
    backgroundColor: 'rgba(196, 65, 69, 1)',
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
    marginRight: 10,
    fontSize: '13px',
    display: 'flex',
    alignItems: 'center'
  }

  return (
    <div style={containerStyles}>
      <div style={fillerStyles}>
        <span style={labelStyles}>{completed > 0 ? `${completed}%` : ''}</span>
      </div>
    </div>
  );
}

export default ProgressBar
