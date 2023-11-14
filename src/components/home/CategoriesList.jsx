import React, { useState, useEffect } from 'react';
import { getAllCategories } from '../../api/assessments.api';
import { Link } from 'react-router-dom';


export function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);

  async function loadCategories() {
    try {
      const res = await getAllCategories();
      setCategories(res.data.results);
    } catch (error) {
      setError(error);
    }
  }

  return (
    <div className="pt-8 text-center px-4 md:px-40">
      <div className='text-3xl md:text-5xl pb-4 text-start border-b-gray-300 border-b-2 mb-6'>Categories</div>
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        {error && <div>Error: {error.message}</div>}
        {categories.map(category => (
          <div key={category.id} className=" bg-gray-200 p-4 rounded text-stone-800">
            <div className="font-semibold text-3xl mb-2 border-b-2 border-white px-4 pb-2">{category.name}</div>
            <div className='grid grid-cols-2 '>
              {category.subcategories.map(subcategory => (
                <Link to={`/assessments/?subcategory=${subcategory.id}`} key={subcategory.name} className=' py-2'>
                  <div className='pb-3 font-semibold truncate'>
                  {subcategory.name}
                  </div>
                  <div className='flex justify-center'>
                  {subcategory.image && (
                    <img src={subcategory.image} alt={`${subcategory.name} icon`} className='w-24 h-24 rounded'/>
                  )}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}


