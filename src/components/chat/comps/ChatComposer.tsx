import { Paperclip, Send, Smile } from "lucide-react";

export const ChatComposer = ({
    messageText,
    setMessageText,
    fileInputRef,
    handleSend,
    handleFileChange,
    isSending,
    isUploading,
}: {
    messageText: string;
    setMessageText: React.Dispatch<React.SetStateAction<string>>;
    fileInputRef: React.RefObject<HTMLInputElement>;
    handleSend: (e: React.FormEvent) => void;
    handleFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    isSending: boolean;
    isUploading: boolean;
}) => {
    return (
        <div className=" p-4 absolute bottom-0 w-full md:bg-transparent z-20">
            <form
                onSubmit={handleSend}
                className="mx-auto flex items-end gap-2 bg-white rounded-2xl shadow-lg p-2 border border-gray-100"
            >
                <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="p-3 text-gray-400 hover:text-[#2481cc] transition-colors"
                >
                    <Paperclip size={22} className={isUploading ? "animate-bounce" : ""} />
                </button>

                <input
                    type="file"
                    hidden
                    ref={fileInputRef}
                    onChange={handleFileChange}
                />

                <textarea
                    rows={1}
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyDown={(e) => {
                        if (e.key === "Enter" && !e.shiftKey) {
                            e.preventDefault();
                            handleSend(); 
                        }
                    }}
                    placeholder="پیام خود را اینجا بنویسید..."
                    className="flex-1 max-h-32 bg-transparent border-none focus:ring-0 text-sm py-3 resize-none custom-scrollbar outline-none"
                />

                <button
                    type="button"
                    className="p-3 text-gray-400 hover:text-yellow-500 transition-colors"
                >
                    <Smile size={22} />
                </button>

                <button
                    type="submit"
                    disabled={isSending || (!messageText.trim() && !isUploading)}
                    className={`p-3 rounded-xl transition-all ${messageText.trim()
                        ? "bg-[#2481cc] text-white shadow-md active:scale-95"
                        : "text-gray-300"
                        }`}
                >
                    <Send size={22} />
                </button>
            </form>

            <p className="text-center text-[10px] text-gray-400 mt-2">
                Powered by Chat System
            </p>
        </div>
    );
};