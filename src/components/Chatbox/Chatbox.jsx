import React, { useState, useEffect, useRef } from 'react';
import { getChatBoxQue } from '../../Admin/Components/Api/Api';

const Chatbox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [ChatBoxList, setChatBoxList] = useState([]);
  const [messages, setMessages] = useState([
    { type: 'bot', text: 'How can I help you?' }
  ]);

  const messagesEndRef = useRef(null);

  const fetchChatBoxList = async () => {
    try {
      const response = await getChatBoxQue();
      setChatBoxList(response.data.length ? response.data : []);
      console.log("ChatBoxList", response.data);
    } catch (error) {
      console.error('Error fetching chat box questions:', error);
    }
  };

  useEffect(() => {
    fetchChatBoxList();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsOpen(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  // Scroll to the bottom of the chat when messages are updated
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  const handleIconClick = () => {
    setIsOpen(!isOpen);
    if (!isOpen) {
      setMessages([{ type: 'bot', text: 'How can I help you?' }]);
    } else {
      handleClearMessages();
    }
  };

  const handleQuestionClick = (question) => {
    const answers = question.answers;

    const answerText = answers.length > 0 ? answers.map(answer => `• ${answer}`).join('\n\n') : 'No answers available.';

    setMessages(prevMessages => [
      ...prevMessages,
      { type: 'user', text: question.question },
      { type: 'bot', text: answerText }
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
                {msg.text.split('\n').map((line, i) => (
                  <div key={i} className="mb-2">{line}</div> // Add margin-bottom for spacing
                ))}
              </div>
            ))}
            {/* This is the div that we scroll to */}
            <div ref={messagesEndRef}></div>
          </div>
          <div className="chatbox-footer">
            <h5>Select a question:</h5>
            {ChatBoxList.map((item) => (
              <button key={item._id} onClick={() => handleQuestionClick(item)}>
                {item.question}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Chatbox;
