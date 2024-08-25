import React from 'react';

interface CategorySelectorProps {
  selectedCategory: string;
  setSelectedCategory: (category: string) => void;
}

const CategorySelector: React.FC<CategorySelectorProps> = ({ selectedCategory, setSelectedCategory }) => {
  const categories = ['All', 'Important', 'Todo'];

  return (
    <select 
      value={selectedCategory} 
      onChange={(e) => setSelectedCategory(e.target.value)}
      style={{ width: '20rem', marginBottom: '10px' }}
    >
      {categories.map(category => (
        <option key={category} value={category}>{category}</option>
      ))}
    </select>
  );
};

export default CategorySelector;