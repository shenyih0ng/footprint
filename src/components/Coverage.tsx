import { DUMMY_COVERAGE } from "../constants";

function Coverage() {
    return (
        <div className="fixed bottom-10 left-2 z-[100] p-5 bg-gray-300/75 rounded border-2 border-red-400 shadow-lg">
            {/* TODO generic way to calculate coverage */}
            <h1 className="text-5xl antialiased text-gray-800">{DUMMY_COVERAGE}% 🇸🇬</h1>
        </div>
    )
}

export default Coverage;