import React, { useState, useEffect } from 'react';
import { getAllCategories } from '../../api/assessments.api';
import { Link } from 'react-router-dom';


function truncateString(str, num) {
  if (str.length > num) {
    return str.slice(0, num) + "...";
  } else {
    return str;
  }
}

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
    <div className="pt-8 text-center px-4 lg:px-40">
      <div className='text-xl md:text-3xl pb-4 text-start border-b-gray-300 border-b-2 mb-6'>Categories</div>
      <div className="">
        {error && <div>Error: {error.message}</div>}
        {categories.map(category => (
          <div key={category.id} className="p-4 text-stone-800">
            <div className="font-semibold text-3xl text-start pb-3">{category.name}</div>
            <div className='flex flex-wrap'>
              {category.subcategories.map(subcategory => (
                <Link
                  to={`/assessments/?subcategory=${subcategory.id}&subcategoryName=${encodeURIComponent(subcategory.name)}`}
                  key={subcategory.name}
                  className='flex p-2 items-center bg-gray-200 rounded-lg me-3 mb-3'>
                  <div className='mr-3'>
                    {subcategory.image && (
                      <img src={subcategory.image} alt={`${subcategory.name} icon`} className='w-6 h-6 rounded' />
                    )}
                  </div>
                  <div className='font-semibold truncate'>
                    {truncateString(subcategory.name, 30)}
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


