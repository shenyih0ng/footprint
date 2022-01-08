import { Link } from "react-router-dom";
import { DESCRIPTION, TITLE } from "../constants";

function LandingPage() {
    return (
        <div className="flex flex-col h-screen bg-gradient-to-r from-sky-500 to-indigo-500">
            <div className="flex flex-col justify-center m-auto">
                <h1 className="m-auto text-5xl antialiased font-semibold">{TITLE}</h1>
                <h2 className="mt-2 text-xl antialiased font-light">
                    <pre>{DESCRIPTION}</pre>
                </h2>
                <button className="py-1 px-3 m-auto mt-5 font-medium bg-green-400 hover:bg-green-200 rounded-full">
                    <Link to="/map">let's get started</Link>
                </button>
            </div>
        </div>
    );
}

export default LandingPage;