import React,{useState, useEffect} from 'react';
import homeImage from "../assets/images/home.jpg";
import { useNavigate } from 'react-router-dom';


const Home = ({imageHeight,searchedQuery}) => {
  const [searchQuery, setSearchQuery] = useState(searchedQuery || "");
  const navigate = useNavigate();

  const handleSubmit = (e)=>{
      e.preventDefault();
      navigate(`/allFurniture?search=${searchQuery}`)
  }

  // useEffect(() => {
  //   setSearchQuery(searchedQuery || "");
  // }, [searchedQuery]);
  return (
    <>
    <div className="relative">
      {/* Adjusting the height of the image */}
      <img src={homeImage} alt="" className={`object-cover w-full ${imageHeight}`}  />
      
      {/* Positioning the div above the image */}
      <div className='absolute bottom-3 left-1/3 right-0  w-fit rounded bg-white'>
        <form className="p-4" onSubmit={handleSubmit}>
          <input type="text" className='border border-black rounded p-2 w-80 mr-3' placeholder="Search Your Dream Destination..." value={searchQuery} onChange={ (e)=> setSearchQuery(e.target.value)}/>
          <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded">Search</button>
        </form>
      </div>
    </div>
    
    </>

  );
};

export default Home;

