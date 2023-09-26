import React, { useState, useEffect } from 'react';
import { getAllCategories } from '../api/assessments.api';


export function CategoriesList() {
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    loadCategories();
  }, []);
  async function loadCategories() {
    try {
      const res = await getAllCategories();
      setCategories(res.data);
    } catch (error) {
      console.error('Error fetching categories:', error);
      setError(error);
    }
  }
  return (
    <div className="w-3/4 mx-auto pt-24 text-center">
      <div className='text-4xl md:text-6xl pb-4 text-start border-b-red-600 border-b-2 mb-6'>Categories</div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {error && <div>Error: {error.message}</div>}
        {categories.map(category => (
          <div key={category.id} className=" bg-gray-700 p-4 rounded shadow text-white">
            <div className="font-semibold text-3xl mb-2 border-b-2 border-white px-4 pb-2">{category.name}</div>
            <ul>
              {category.subcategories.map(subcategory => (
                <li key={subcategory.name}>
                  {subcategory.name}
                  {subcategory.image && (
                    <img src={subcategory.image} alt={`${subcategory.name} icon`} />
                  )}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  )
}


