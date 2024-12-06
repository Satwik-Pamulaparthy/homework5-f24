import { useState } from "react";
import { FixedSizeList as List } from "react-window";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

interface Problem4Props {
  initialCount?: number;
}

// Generate sample products
const generateProducts = (count: number): Product[] => {
  const categories = ["Electronics", "Books", "Clothing", "Home", "Sports"];
  return Array.from({ length: count }, (_, index) => ({
    id: index,
    name: `Product ${index}`,
    price: parseFloat((Math.random() * 100).toFixed(2)),
    category: categories[Math.floor(Math.random() * categories.length)],
  }));
};

export default function Problem4({ initialCount = 100000 }: Problem4Props) {
  const [products] = useState(generateProducts(initialCount));

  // Render a single product row
  const ProductRow = ({ index, style }: { index: number; style: React.CSSProperties }) => {
    const product = products[index];
    return (
      <div
        style={{
          ...style,
          display: "flex",
          justifyContent: "space-between",
          padding: "10px",
          borderBottom: "1px solid #ddd",
        }}
        data-testid={`product-row-${index}`} // Add data-testid for testing
      >
        <span>{product.name}</span>
        <span>${product.price.toFixed(2)}</span>
        <span>{product.category}</span>
      </div>
    );
  };

  return (
    <div style={{ padding: "20px" }}>
      <h1>Problem 4: List Virtualization</h1>
      <p>
        Rendering a list of 100,000 products without virtualization. Observe the
        performance issues.
      </p>
      <div style={{ marginTop: "20px" }}>
        <h3>Instructions:</h3>
        <ol>
          <li>Notice the lag when rendering a large list.</li>
          <li>Implement list virtualization using react-window.</li>
          <li>Observe the improved performance after optimization.</li>
        </ol>
      </div>

      <List
        height={600} // Height of the container
        itemCount={products.length} // Total number of items
        itemSize={50} // Height of each item
        width="100%" // Full width of the container
        overscanCount={5} // Number of items to render before and after the visible area
      >
        {ProductRow}
      </List>
    </div>
  );
}
