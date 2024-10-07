import axios from 'axios';

const deleteUserProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    console.error('No token found.');
    return;
  }

  try {
    await axios.delete('http://127.0.0.1:8000/api/v1/user/delete-profile', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log('User profile deleted successfully');
    // Optionally, redirect the user or update the UI
  } catch (err) {
    console.error('Error deleting user profile:', err.response ? err.response.data : err.message);
  }
};

export default deleteUserProfile