import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import Header from "../components/Header/Header";
import Footer from "../components/Footer/Footer";
import ProductCard from "../components/ProductCard";
import "../styles/products.css";

// ✅ FIX: use env-based API
const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5000/api";

const Products = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [searchParams] = useSearchParams();
  const category = searchParams.get("category");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let url = `${API_BASE_URL}/products`; // ✅ FIXED

        console.log("Category from URL:", category);

        // ✅ Category mapping
        const categoryMap = {
          education: "Educational Products",
          solar: "Solar Products",
          lights: "Lights and Poles",
        };

        if (category && category !== "all") {
          const formattedCategory =
            categoryMap[category.toLowerCase()] || category;

          url += `?category=${encodeURIComponent(formattedCategory)}`;
        }

        console.log("Fetching URL:", url);

        const res = await fetch(url);

        if (!res.ok) {
          throw new Error("Server error while fetching products");
        }

        const data = await res.json();

        console.log("API Response:", data);

        setProducts(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Failed to fetch products:", error);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [category]);

  return (
    <>
      <Header />

      <section className="products-page">
        <h1>Our Products</h1>

        {loading ? (
          <p className="loading">Loading products...</p>
        ) : (
          <div className="products-grid">
            {products.length > 0 ? (
              products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))
            ) : (
              <p>
                No products found
                {category ? ` for "${category}"` : ""}.
              </p>
            )}
          </div>
        )}
      </section>

      <Footer />
    </>
  );
};

export default Products;