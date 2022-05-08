import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import Header from './components/Header';
import AboutPage from './pages/AboutPage';
import FeedbackData from './data/FeedbackData';
import FeedbackForm from './components/FeedbackForm';
import FeedbackList from './components/FeedbackList';
import FeedbackStats from './components/FeedbackStats';
import AboutIconLink from './components/AboutIconLink';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

const App = () => {
  const [feedback, setFeedback] = useState(FeedbackData);

  const deleteFeedback = (id) => {
    if (window.confirm('Are you sure you want to delete feedback?')) {
      setFeedback(feedback.filter((item) => item.id !== id));
    }
  };

  const addFeedback = (newFeedback) => {
    newFeedback.id = +uuidv4();
    setFeedback([newFeedback, ...feedback]);
  };

  return (
    <Router>
      <Header />
      <div className='container'>
        <Routes>
          <Route
            path='/'
            exact
            element={
              <>
                <FeedbackForm handleAdd={addFeedback} />
                <FeedbackStats feedback={feedback} />
                <FeedbackList
                  feedback={feedback}
                  handleDelete={deleteFeedback}
                />
              </>
            }
          ></Route>
          <Route path='/about' element={<AboutPage />} />
        </Routes>
        <AboutIconLink />
      </div>
    </Router>
  );
};

export default App;
