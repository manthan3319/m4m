import React, { useState, useEffect } from 'react';
import Modal from 'react-modal';
import Saidbar from '../Saidbar/Saidbar';
import { addChatBoxQue, deleteChatboxQuestion, getChatBoxQue } from '../Api/Api'; // Import delete function
import { ToastContainer, toast } from 'react-toastify';

Modal.setAppElement('#root');

const ChatBoxQus = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [question, setQuestion] = useState('');
    const [answers, setAnswers] = useState(['']);
    const [ChatBoxList, setChatBoxList] = useState([]);

    const fetchChatBoxList = async () => {
        try {
            const response = await getChatBoxQue();
            setChatBoxList(response.data.length ? response.data : []);
        } catch (error) {
            console.error('Error fetching chat box questions:', error);
        }
    };

    useEffect(() => {
        fetchChatBoxList();
    }, []);

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setQuestion('');
        setAnswers(['']);
    };

    const handleSave = async () => {
        try {
            const response = await addChatBoxQue(question, answers);
            if (response.data.message === 'Question and answers saved successfully!') {
                toast.success('Question added successfully!');
                closeModal();
                fetchChatBoxList();
            } else {
                toast.error('Failed to add question.');
            }
        } catch (error) {
            toast.error('An error occurred while adding the question.');
            console.error('Error adding question:', error);
        }
    };

    const handleDelete = async (id) => {
        console.log("id",id)
        try {
            const response = await deleteChatboxQuestion(id);
            if (response.data.messages === "Chatbox question deleted successfully") {
              toast.success('Chatbox question deleted successfully');
              fetchChatBoxList();
            } else {
              toast.error('Failed to delete Chatbox question: ' + response.data.messages);
            }
          } catch (error) {
            console.error('Error deleting Chatbox question:', error);
            toast.error("An error occurred while deleting the Chatbox question.");
          }
    };

    const addAnswerField = () => {
        setAnswers([...answers, '']);
    };

    const handleAnswerChange = (index, value) => {
        const updatedAnswers = [...answers];
        updatedAnswers[index] = value;
        setAnswers(updatedAnswers);
    };

    const removeAnswerField = (index) => {
        const updatedAnswers = [...answers];
        updatedAnswers.splice(index, 1);
        setAnswers(updatedAnswers);
    };

    const customStyles = {
        content: {
            top: '55%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            borderRadius: '10px',
            padding: '20px',
            maxHeight: '500px',
            overflowY: 'auto',
            width: '500px',
            backgroundColor: '#fff',
            boxShadow: '0px 5px 15px rgba(0, 0, 0, 0.3)',
        },
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
        },
    };

    return (
        <div>
            <Saidbar />
            <div className='sm:ml-[250px] px-[30px] pt-[25px]'>
                <div className='mt-[31px]'>
                    <h2 className="text-2xl font-bold mb-4 font-roboto text-[32px] border-b-[2px] pb-[15px] border-black">Chat Box Question List</h2>
                </div>
                <div className="text-right mb-4">
                    <button
                        className="bg-black py-[15px] px-[25px] text-white font-roboto rounded-[25px] font-bold text-[18px]"
                        onClick={openModal}
                    >
                        Add Question
                    </button>
                </div>
                {/* Display the list of questions and answers */}
                <div className="mt-6">
                    {ChatBoxList.length > 0 ? (
                        ChatBoxList.map((item) => (
                            <div key={item._id} className="mb-4 p-4 border border-gray-300 rounded">
                                <h3 className="font-bold">Question: {item.question}</h3>
                                <div>
                                    <h4 className="font-semibold">Answers:</h4>
                                    <ul className="list-disc pl-5">
                                        {item.answers.map((answer, index) => (
                                            <li key={index}>{answer}</li>
                                        ))}
                                    </ul>
                                </div>
                                <div className="mt-2">
                                    <button
                                        onClick={() => handleDelete(item._id)} // Call delete function
                                        className="bg-red-500 text-white px-3 py-2 rounded"
                                    >
                                        Delete
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No questions available.</p>
                    )}
                </div>
            </div>

            {/* Modal for adding question */}
            <Modal
                isOpen={isModalOpen}
                onRequestClose={closeModal}
                contentLabel="Add Question Modal"
                style={customStyles}
            >
                <h2 className="text-xl font-bold mb-4">Add New Question</h2>
                <div className="mb-4">
                    <label className="block font-bold mb-2">Question:</label>
                    <input
                        type="text"
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded"
                        placeholder="Enter your question"
                    />
                </div>

                <div className="mb-4">
                    <label className="block font-bold mb-2">Answers:</label>
                    {answers.map((answer, index) => (
                        <div key={index} className="flex items-center mb-2">
                            <textarea
                                value={answer}
                                onChange={(e) => handleAnswerChange(index, e.target.value)}
                                className="w-full p-2 border border-gray-300 rounded"
                                placeholder={`Answer ${index + 1}`}
                            />
                            {index > 0 && (
                                <button
                                    type="button"
                                    className="ml-2 bg-red-500 text-white px-3 py-2 rounded"
                                    onClick={() => removeAnswerField(index)}
                                >
                                    <p>Remove</p>
                                </button>
                            )}
                        </div>
                    ))}
                    <button
                        type="button"
                        className="bg-blue-500 text-white px-4 py-2 rounded mt-2"
                        onClick={addAnswerField}
                    >
                        Add Another Answer
                    </button>
                </div>

                <div className="text-right">
                    <button
                        onClick={closeModal}
                        className="bg-gray-400 text-white py-2 px-4 rounded mr-2"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSave}
                        className="bg-black text-white py-2 px-4 rounded"
                    >
                        Save
                    </button>
                </div>
            </Modal>
            <ToastContainer />
        </div>
    );
};

export default ChatBoxQus;
