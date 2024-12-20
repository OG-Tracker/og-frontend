import React, { useState } from 'react';
import Select from 'react-select'; // Make sure you've installed react-select
import ProductBox from '@/components/partials/ecommerce/product-box'; // Your ProductBox component

// Assuming this is your products list
const products = [
  // Add your products here
];

const FilterComponent = () => {
  const [selectedCategory, setSelectedCategory] = useState('');

  // Handler for select box change
  const handleCategoryChange = (selectedOption) => {
    setSelectedCategory(selectedOption.value);
  };

  // Filter products based on selected category
  const filteredProducts = products.filter((product) =>
    selectedCategory ? product.category === selectedCategory : true
  );

  return (
    <div>
      <Select
        options={categoryOptions}
        onChange={handleCategoryChange}
        className="my-select"
        placeholder="Select a category..."
      />
      <div className="products-list">
        {filteredProducts.map((product) => (
          <ProductBox key={product.refNum} item={product} />
        ))}
      </div>
    </div>
  );
};

export default FilterComponent;
