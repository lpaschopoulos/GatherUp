import axios from 'axios';

function deleteAttendance(userId, eventId) {
  return axios
    .delete(`http://localhost:3636/user/${userId}/attend/${eventId}`)
    .then(response => {
      console.log(response.data.message);  // Log the success message
      // Maybe also refresh the list or update the state to reflect the deleted attendance
    })
    .catch(err => {
      console.error("Failed to delete attendance:", err);
    });
}

export default deleteAttendance;