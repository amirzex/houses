import React, { useState } from 'react';

const CloseIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
);

const SendIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
    </svg>
);

const ChatModal = ({ isOpen, onClose, sellerName = "امیر محمد خیرآبادی", houseId }) => {
    const [newMessage, setNewMessage] = useState('');
    const [isSending, setIsSending] = useState(false);

    const [chatHistory, setChatHistory] = useState([
        { id: 1, sender: 'seller', text: 'سلام، چطور می‌تونم کمکتون کنم؟', time: '10:12' },
    ]);

    if (!isOpen) return null;

    const handleSendMessage = async (e) => {
        e.preventDefault();
        if (!newMessage.trim() || isSending) return;

        const userQuestion = newMessage.trim();

        // به‌روزرسانی موقت UI (پیام کاربر)
        const tempId = Date.now();
        const tempMessage = { id: tempId, text: userQuestion, sender: 'user', time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }) };

        setChatHistory((prev) => [...prev, tempMessage]);
        setNewMessage('');
        setIsSending(true);

        try {
            const response = await fetch('/api/property-qa/question', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    houseId: Number(houseId),
                    question: userQuestion,
                }),
            });

            if (!response.ok) throw new Error('خطا در ارسال پیام');

            // فرض می‌کنیم پاسخ سرور متنی است که فروشنده جواب داده
            const { answer } = await response.json();

            if (answer) {
                const sellerReply = {
                    id: Date.now() + 1,
                    sender: 'seller',
                    text: answer,
                    time: new Date().toLocaleTimeString('fa-IR', { hour: '2-digit', minute: '2-digit' }),
                };
                setChatHistory((prev) => [...prev, sellerReply]);
            }

        } catch (error) {
            console.error("Error calling API:", error);
            setChatHistory((prev) => prev.filter(msg => msg.id !== tempId)); // حذف پیام موقت
            alert("ارسال پیام با خطا مواجه شد.");
        } finally {
            setIsSending(false);
        }
    };

    return (
        <div dir="rtl" className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm font-sans">
            <div className="w-full max-w-md bg-[#FFFFFA] dark:bg-[#272727] border rounded-3xl flex flex-col shadow-lg overflow-hidden h-[80vh] max-h-[600px]">

                {/* Header */}
                <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-[#272727]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-[#353535] flex items-center justify-center overflow-hidden">
                            <svg className="w-6 h-6 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                            </svg>
                        </div>
                        <div>
                            <h3 className="font-bold text-gray-900 dark:text-[#D9D9E0] text-sm">گفت و گو با {sellerName}</h3>
                            <span className="text-xs text-green-500 font-medium">آنلاین</span>
                        </div>
                    </div>
                    <button onClick={onClose} className="text-gray-500 hover:text-red-500 transition-colors">
                        <CloseIcon />
                    </button>
                </div>

                {/* Chat History */}
                <div className="flex-1 p-5 overflow-y-auto flex flex-col gap-4 bg-gray-50/50 dark:bg-transparent">
                    {chatHistory.map((msg) => (
                        <div key={msg.id} className={`flex flex-col w-full ${msg.sender === 'user' ? 'items-start' : 'items-end'}`}>
                            <div className={`max-w-[80%] px-4 py-2.5 rounded-2xl ${msg.sender === 'user'
                                ? 'bg-[#1e3a8a] text-white rounded-tr-none'
                                : 'bg-gray-200 dark:bg-[#353535] text-gray-800 dark:text-[#D9D9E0] rounded-tl-none'
                                }`}>
                                <p className="text-sm leading-relaxed">{msg.text}</p>
                            </div>
                            <span className="text-[10px] text-gray-400 mt-1 px-1">{msg.time}</span>
                        </div>
                    ))}
                </div>

                {/* Input Area */}
                <div className="p-4 bg-white dark:bg-[#272727] border-t border-gray-200 dark:border-gray-700">
                    <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                        <input
                            type="text"
                            value={newMessage}
                            onChange={(e) => setNewMessage(e.target.value)}
                            placeholder="پیام خود را بنویسید..."
                            className="flex-1 bg-gray-100 dark:bg-[#353535] text-gray-900 dark:text-[#D9D9E0] placeholder-gray-500 dark:placeholder-gray-400 rounded-full px-5 py-3 text-sm outline-none border border-transparent focus:border-[#1e3a8a] transition-all"
                        />
                        <button
                            type="submit"
                            disabled={!newMessage.trim() || isSending}
                            className="w-12 h-12 flex-shrink-0 bg-[#1e3a8a] text-white rounded-full flex items-center justify-center hover:bg-blue-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed rotate-180"
                        >
                            <SendIcon />
                        </button>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default ChatModal;
