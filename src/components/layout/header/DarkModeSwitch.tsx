import { useState } from "react"

const DarkModeSwitch = () => {
    const [isDark, setIsDark] = useState(false)

    const toggleDark = () => {
        setIsDark(!isDark)

        if (!isDark) {
            document.documentElement.classList.add("dark")
        } else {
            document.documentElement.classList.remove("dark")
        }
    }

    return (
        <div className="w-full  flex flex-row-reverse ">
            <button
                onClick={toggleDark}
                className={`
                relative w-18 h-9 rounded-full p-1
                transition-all duration-300
                flex items-center
                ${isDark ? "bg-[#1e3a8a]" : "bg-gray-300"}
            `}
            >
                {/* Circle */}
                <div
                    className={`
                    absolute top-1
                    w-7 h-7 rounded-full bg-white shadow-md
                    flex items-center justify-center
                    transition-all duration-300
                    ${isDark ? "right-1" : "right-7"}
                `}
                >

                </div>

            </button>

            {/* Text */}
            <span
                className={`
                    text-xl font-bold w-full px-2
                    ${isDark ? "text-black text-right dark:text-white" : "text-gray-700 text-right"}
                `}
            >
                {isDark ? "تاریک" : "روشن"}
            </span>
        </div>

    )
}

export default DarkModeSwitch
