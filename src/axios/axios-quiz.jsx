import axios from 'axios';

export default axios.create({
  baseURL: 'https://quiz-react-8c700-default-rtdb.firebaseio.com/'
});
