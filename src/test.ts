
import axios from 'axios';

async function loginUser() {
  try {
    const response = await axios.post('https://notemy-api.dustbin.me/api/auth/login', {
      username: 'demouser',
      password: 'Demo@1234'
    }, {
      headers: {
        'Content-Type': 'application/json'
      }
    });
    console.log(response.data); // Handle the response data as needed
  } catch (error) {
    console.error('Error:', error.response.data); // Handle errors
  }
}

// Call the function to login the user
loginUser();
