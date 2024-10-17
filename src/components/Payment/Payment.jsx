import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios';

const cardOptions = [
    { title: 'One Question' },
    { title: 'Two Questions'  },
    { title: 'Three Questions' },
    { title: 'Five Questions' },
];

export const Payment = () => {
    const { ref, inView } = useInView({
        threshold: 0.1,
        triggerOnce: true,
    });

    const [selectedCard, setSelectedCard] = useState(null);
    const [showQR, setShowQR] = useState(false);
    const [otp, setOtp] = useState('');
    const [mobile, setMobile] = useState('');
    const [uuid, setUuid] = useState('');
    const [csrfToken, setCsrfToken] = useState('');
    const [cookies, setCookies] = useState('');
    const [paymentSuccess, setPaymentSuccess] = useState(false);

    // Step 1: Handle card selection
    const handleCardClick = (card) => {
        setSelectedCard(card);
        setShowQR(false); // Hide QR code initially
    };

    // Step 2: Request OTP
    const handleRequestOTP = async () => {
        try {
            const getResponse = await axios.get('https://enterprise.bharatpe.in/');
            const cookies = getResponse.headers['set-cookie'];
            setCookies(cookies);

            console.log("cookies", cookies);
            const csrfTokenMatch = getResponse.data.match(/<meta name="csrf-token" content="(.+?)">/);
            if (csrfTokenMatch) {
                setCsrfToken(csrfTokenMatch[1]);
            } else {
                console.error('CSRF token not found in response');
                return;
            }

            const otpResponse = await axios.post('https://enterprise.bharatpe.in/v1/api/user/requestotp', {
                mobile,
                _token: csrfToken,
            }, { headers: { Cookie: cookies } });

            setUuid(otpResponse.data.data.uuid);
            setShowQR(true); // Show QR code after OTP request
        } catch (error) {
            console.error('Error during API calls:', error);
        }
    };

    // Step 3: Verify OTP
    const handleVerifyOTP = async () => {
        try {
            const verifyResponse = await axios.post('https://enterprise.bharatpe.in/v1/api/user/verifyotp', {
                otp,
                uuid,
                mobile,
                _token: csrfToken,
            }, { headers: { Cookie: cookies } });

            if (verifyResponse.data.success) {
                setPaymentSuccess(true);
                alert('Payment successful!');
            }
        } catch (error) {
            console.error('Error verifying OTP:', error);
        }
    };

    return (
        <div>
            <motion.div ref={ref} className="your-class" style={{ padding: '20px', backgroundColor: '#f9f9f9' }}>
                <h1 className="text-center text-2xl font-bold">M4M Clothing Payment</h1>
                
                {/* Display card options */}
                <div className="grid grid-cols-2 gap-4 mt-4">
                    {cardOptions.map((card) => (
                        <div
                            key={card.title}
                            className="border p-4 rounded cursor-pointer hover:bg-gray-200"
                            onClick={() => handleCardClick(card)}
                        >
                            <h2 className="text-center">{card.title}</h2>
                        </div>
                    ))}
                </div>

                {/* Step 1: Mobile Number Input */}
                {selectedCard && !showQR && (
                    <div className="mt-4 text-center">
                        <input 
                            type="text" 
                            placeholder="Enter Mobile Number" 
                            value={mobile} 
                            onChange={(e) => setMobile(e.target.value)} 
                            className="border p-2 rounded" 
                        />
                        <button 
                            className="bg-blue-500 text-white py-2 px-4 rounded" 
                            onClick={handleRequestOTP}
                        >
                            Request OTP
                        </button>
                    </div>
                )}

                {/* Step 2: Display QR Code */}
                {showQR && (
                    <div className="text-center mt-10">
                        <h2>Scan to Pay Rs. 2 for M4M Clothing</h2>
                        <QRCodeSVG value="upi://pay?pa=M4M@example.com&pn=M4M%20Clothing&am=2" size={200} />
                        <div className="mt-4">
                            <input 
                                type="text" 
                                placeholder="Enter OTP" 
                                value={otp} 
                                onChange={(e) => setOtp(e.target.value)} 
                                className="border p-2 rounded" 
                            />
                            <button 
                                className="bg-green-500 text-white py-2 px-4 rounded" 
                                onClick={handleVerifyOTP}
                            >
                                Verify OTP
                            </button>
                        </div>
                    </div>
                )}

                {/* Payment Success Message */}
                {paymentSuccess && (
                    <div className="text-center mt-4 text-green-500">
                        <h2>Payment Successful!</h2>
                    </div>
                )}
            </motion.div>
        </div>
    );
};
