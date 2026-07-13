// components/LoadingGlass.jsx
export default function LoadingGlass() {
    return (
        <div className="w-full flex justify-center py-10">
            <div className="glass-loader w-16 h-16 rounded-2xl backdrop-blur-xl bg-white/20 border border-white/30 flex items-center justify-center shadow-xl">
                <div className="w-8 h-8 rounded-full border-4 border-white/50 border-t-transparent animate-spin"></div>
            </div>
        </div>
    );
}
