import React from 'react';

// Define the component that displays a specific product's rank
const ProductRankDisplay = ({ products, refNum }) => {
  // Helper function to parse reqDot, sort products in descending order, and find the rank
  const findProductRank = (products, refNum) => {
    // Filter products by track to operate within each track category
    const tracks = ["smallSpender", "mediumSpender", "bigSpender"];
    const productRanks = {};

    tracks.forEach(track => {
      const filteredProducts = products.filter(product => product.track === track)
        .map(product => ({
          ...product,
          reqDotNumber: parseInt(product.reqDot.replace(/,/g, ''), 10)
        }))
        // Sort in descending order of reqDotNumber
        .sort((a, b) => b.reqDotNumber - a.reqDotNumber);

      filteredProducts.forEach((product, index) => {
        if (product.refNum === refNum) {
          // Store rank based on the index within its track category
          productRanks[refNum] = index + 1;
        }
      });
    });

    // Return the rank of the product with the specific refNum, if found
    return productRanks[refNum] || 'N/A';
  };

  const rank = findProductRank(products, refNum);

  return (
    <div>
      <p className='text-lg align-middle '>Rank: <span className='text-white' > {rank}</span></p>
    </div>
  );
};

export default ProductRankDisplay;
