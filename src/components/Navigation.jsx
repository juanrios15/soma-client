import { Link } from "react-router-dom";

export function Navigation() {
  return (
    <div className="fixed top-0 left-1/2 w-full lg:w-1/2 transform -translate-x-1/2  bg-gray-700 rounded-[15px]">
      <div className="container mx-auto p-4">
        <div className="flex justify-between ">
          <Link to="/" className="text-white text-lg">Home</Link>
          <Link to="/assessments" className="text-white text-lg">Assessments</Link>
          <div className="hidden md:flex bg-gray-500 rounded-full h-20 w-20 absolute top-0 left-1/2 transform 
          -translate-x-1/2 bottom-full items-center justify-center text-white ">
            <span className="text-center text-xl justify-center -mt-1">
                SOMA
            </span>
            </div>
          <Link to="/rankings" className="text-white text-lg">Rankings</Link>
          <Link to="/contact-us" className="text-white text-lg">Contact us</Link>
        </div>
      </div>
    </div>
  )
}