
import React from 'react';

const SuccessModal = ({ isOpen, onClose, sessionId, onProceed }) => {
    if (!isOpen) return null; // Don't render anything if not open

    return (
        <div className="vh-100 fixed inset-0 flex bg-black bg-opacity-50 backdrop-blur-sm z-50">
            <div className='vh-100 mt-48 pt-24 flex flex-column justify-center items-center h-screen'>
                <div className='w-full  flex flex-col justify-center items-center'>
                    <div className='my-24 w-full text-center flex flex-col justify-center items-center'>
                        <img src="/assets/images/success.png" alt="Success" width={220} height={220} />
                        <h3 className='text-4xl pt-24 lg:pt-0 font-bold text-center text-slate-700'>
                            Payment Successful
                        </h3>
                        <button onClick={() => handlePaymentSuccess()}
                            className='uppercase bg-[#009C96] text-white text-xl my-16 px-2 py-2 rounded'
                        >
                            Proceed
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SuccessModal;
