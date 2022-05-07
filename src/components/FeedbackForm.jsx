import React, { useState } from 'react';
import Card from './shared/Card';
import Button from './shared/Button';
import RatingSelect from './RatingSelect';

function FeedbackForm({handleAdd}) {
  const [text, setText] = useState('');
  const [rating, setRating] = useState('');
  const [btnDisabled, setBtnDisabled] = useState(true);
  const [message, setMesage] = useState('');

  const handleTextChange = (event) => {
    if (text === '') {
      setBtnDisabled(true);
      setMesage(null);
    } else if (text !== '' && text.trim().length <= 10) {
      setBtnDisabled(true);
      setMesage('Text must be at least 10 characters');
    } else {
      setMesage(null);
      setBtnDisabled(false);
    }

    setText(event.target.value);
  };

  const handleSubmit = (event) => {
      event.preventDefault();
      if(text.trim().length > 10) {
          const newFeedback = {
              text, rating,
          }
          handleAdd(newFeedback);
          setText('');
      }
  }

  return (
    <Card>
      <form onSubmit={handleSubmit}>
        <h2>How would you rate your service with us?</h2>
        <RatingSelect select={(rating) => setRating(rating)}/>
        <div className='input-group'>
          <input
            onChange={handleTextChange}
            type='text'
            placeholder='Write a review'
            value={text}
          />
          <Button type='submit' isDisabled={btnDisabled}>
            Send
          </Button>
        </div>
        {message && <div className='message'>{message}</div>}
      </form>
    </Card>
  );
}

export default FeedbackForm;
