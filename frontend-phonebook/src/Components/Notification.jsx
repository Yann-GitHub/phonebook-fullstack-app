const Notification = ({ message }) => {
  //   const notificationStyle = {
  //     backgroundColor: 'white',
  //     color: 'green',
  //     borderColor: 'green',
  //     borderWidth: 3,
  //     borderStyle: 'solid',
  //     borderRadius: 4,
  //     padding: 10,
  //   }

  if (message === null) {
    return null
  }

  const notificationStyle = {
    backgroundColor: message.type === 'success' ? 'white' : 'white',
    color: message.type === 'success' ? 'green' : 'red',
    borderColor: message.type === 'success' ? 'green' : 'red',
    borderWidth: message.type === 'success' ? 3 : 3,
    borderStyle: message.type === 'success' ? 'solid' : 'solid',
    borderRadius: message.type === 'success' ? 4 : 4,
    padding: message.type === 'success' ? 10 : 10,
  }

  return (
    <div style={notificationStyle}>
      <p>Notification: {message.message}</p>
    </div>
  )
}

export default Notification
