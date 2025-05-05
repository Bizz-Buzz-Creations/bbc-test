
import React, { useState, useRef, useEffect } from 'react';

const FeedbackModal = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [feedback, setFeedback] = useState('');
    const modalRef = useRef(null);

    const openModal = () => setIsOpen(true);
    const closeModal = () => {
        setIsOpen(false);
        setFeedback('');
    };

    const handleSubmit = () => {
        console.log('Submitted feedback:', feedback);
        closeModal();
    };

    // ✅ Close modal if clicked outside the modal content
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (modalRef.current && !modalRef.current.contains(event.target)) {
                closeModal();
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        } else {
            document.removeEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <>
            <button
                onClick={openModal}
                className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-md font-medium font-mono rounded-lg border border-purple-900 bg-transparent text-purple-900 shadow-2xs hover:border-purple-300 hover:bg-purple-300 focus:outline-hidden focus:bg-purple-500 focus:border-purple-500 disabled:opacity-50"
            >
                Give Feedback
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#cac5d0b3] bg-opacity-50 m-0">
                    <div
                        ref={modalRef}
                        className="bg-white rounded-xl shadow-lg p-6 w-full max-w-md relative"
                    >
                        <button
                            onClick={closeModal}
                            className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
                        >
                            ✕
                        </button>
                        <div className="w-full h-[80vh] overflow-hidden">
                            <iframe
                                src="https://docs.google.com/forms/d/e/1FAIpQLSdJYXDUcFVXMpMogKLeHJ4C735-BjXD2Gc7ScCOQZ3boNPkFQ/viewform?embedded=true"
                                className="w-full h-full border-0"
                                allowFullScreen
                                title="Feedback Form"
                            >
                                Loading…
                            </iframe>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default FeedbackModal;
