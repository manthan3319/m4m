import React, { useState } from 'react';

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'How can I help you?' }
  ]);

  const predefinedQuestions = [
    { question: 'What are your store hours?', answer: 'Our store is open from 9 AM to 9 PM every day.' },
    { question: 'Where are you located?', answer: 'We have multiple locations across Surat. Visit our website for the nearest store.' },
    { question: 'Do you offer discounts?', answer: 'Yes, we offer discounts on select items. Please check with our staff for details.' }
 
  ];

  const handleIconClick = () => {
    setIsOpen(!isOpen);
    handleClearMessages()
  };

  const handleQuestionClick = (answer) => {
    setMessages(prevMessages => [
      ...prevMessages,
      { type: 'user', text: answer.question },
      { type: 'bot', text: answer.answer }
    ]);
  };

  const handleClearMessages = () => {
    setMessages([]);
  };

  return (
    <div className='z-[99999999999] relative'>
      <div className="chatbox-icon h-[60px] w-[60px] items-center flex justify-center" onClick={handleIconClick}>
         <i className="fa fa-comments text-[30px]" aria-hidden="true"></i>
      </div>

      {isOpen && (
        <div className="chatbox">
          <div className="chatbox-header">
            <h4>Chat with us</h4>
            <button onClick={handleIconClick}>X</button>
          </div>
          <div className="chatbox-body">
            {messages.map((msg, index) => (
              <div key={index} className={`message ${msg.type}`}>
                {msg.text}
              </div>
            ))}
          </div>
          <div className="chatbox-footer">
            <h5>Select a question:</h5>
            {predefinedQuestions.map((q, index) => (
              <button key={index} onClick={() => handleQuestionClick(q)}>
                {q.question}
              </button>
            ))}
            {/* <button className="clear-button" onClick={handleClearMessages}>
              Clear
            </button> */}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;
