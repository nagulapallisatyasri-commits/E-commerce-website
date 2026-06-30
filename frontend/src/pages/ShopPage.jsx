// frontend/src/pages/ShopPage.jsx
import { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axios from "axios";
import ProductCard from "../components/ProductCard";
import { Search } from "lucide-react";
import { motion } from "framer-motion";
import { productsData } from "../data/products";

const CATEGORY_STRUCTURE = [
  { name: "Women's", subs: ["Skirts", "Frocks", "Jeans", "Coats", "Bodycon"] },
  {
    name: "Men's",
    subs: [
      "Shirts & T-shirts",
      "Coats & Blazers",
      "Jeans",
      "Hoddies",
      "Beach wear",
    ],
  },
  { name: "Beauty", subs: [] },
  { name: "Footwear", subs: ["Men's", "Women's"] },
  { name: "Accessories", subs: ["Men's", "Women's"] },
  { name: "Perfumes", subs: [] },
];

// Fallback products generation removed in favor of productsData

const ShopPage = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  // Get state from URL params
  const selectedCategory =
    searchParams.get("category") || CATEGORY_STRUCTURE[0].name;
  const selectedSubCategory = searchParams.get("subcategory") || "all";
  const searchTerm = searchParams.get("search") || "";

  // Preserve scroll position
  useEffect(() => {
    const savedScroll = sessionStorage.getItem("shopScrollPosition");
    if (savedScroll) {
      // Use requestAnimationFrame to ensure the page is rendered before scrolling
      requestAnimationFrame(() => {
        window.scrollTo(0, parseInt(savedScroll, 10));
      });
    }

    const saveScroll = () => {
      sessionStorage.setItem("shopScrollPosition", window.scrollY.toString());
    };

    const handleBeforeUnload = () => saveScroll();

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => {
      saveScroll();
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // Use products from data file
        setProducts(productsData);
      } catch (error) {
        console.error("Error fetching shop products:", error);
        setProducts(productsData);
      } finally {
        setLoading(false);
      }
    };
    fetchProducts();
  }, []);

  const handleCategoryChange = (cat) => {
    setSearchParams({ category: cat, subcategory: "all", search: searchTerm });
  };

  const handleSubCategoryChange = (sub) => {
    setSearchParams({
      category: selectedCategory,
      subcategory: sub,
      search: searchTerm,
    });
  };

  const handleSearchChange = (e) => {
    const newSearch = e.target.value;
    setSearchParams({
      category: selectedCategory,
      subcategory: selectedSubCategory,
      search: newSearch,
    });
  };

  const categories = CATEGORY_STRUCTURE.map((c) => c.name);

  const currentCategoryObj = CATEGORY_STRUCTURE.find(
    (c) => c.name === selectedCategory,
  );
  const subCategories =
    currentCategoryObj && currentCategoryObj.subs.length > 0
      ? ["all", ...currentCategoryObj.subs]
      : [];

  const filteredProducts = products.filter((product) => {
    const matchesCategory = product.category === selectedCategory;
    const matchesSubCategory =
      selectedSubCategory === "all" ||
      product.subCategory === selectedSubCategory;
    const matchesSearch = product.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSubCategory && matchesSearch;
  });

  if (loading) {
    return (
      <div className="wishlist-loading-container">
        <div className="wishlist-loader"></div>
        <p>Gathering the collection...</p>
      </div>
    );
  }

  return (
    <div className="shop-page-wrapper">
      <div
        className="shop-page-header container-max"
        style={{ marginBottom: "2.5rem" }}
      >
        <span className="shop-badge">✦ RUNWAY READY</span>
        <h1>The Collection</h1>
        <p>
          Explore high-end couture, tailored outerwear, and elegant designs.
        </p>
      </div>

      <div
        className="shop-controls-container container-max"
        style={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          marginBottom: "3.5rem",
        }}
      >
        {/* Search */}
        <div
          className="shop-search-bar"
          style={{ maxWidth: "600px", margin: "0 auto", width: "100%" }}
        >
          <input
            type="text"
            placeholder="Search outfits..."
            value={searchTerm}
            onChange={handleSearchChange}
            style={{
              width: "100%",
              padding: "0.8rem 1rem",
              borderRadius: "8px",
              border: "1px solid #ccc",
            }}
          />
        </div>

        {/* Main Category Filters */}
        <div
          className="shop-category-filters"
          style={{
            display: "flex",
            justifyContent: "center",
            flexWrap: "wrap",
            gap: "1rem",
          }}
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => handleCategoryChange(cat)}
              className={`filter-btn ${selectedCategory === cat ? "active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Sub Category Filters (if applicable) */}
        {subCategories.length > 0 && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="shop-subcategory-filters"
            style={{
              display: "flex",
              justifyContent: "center",
              flexWrap: "wrap",
              gap: "0.5rem",
              marginTop: "-1rem",
            }}
          >
            {subCategories.map((sub) => (
              <button
                key={sub}
                onClick={() => handleSubCategoryChange(sub)}
                className={`filter-btn sub-filter-btn ${selectedSubCategory === sub ? "active" : ""}`}
                style={{
                  fontSize: "0.85rem",
                  padding: "0.4rem 0.8rem",
                  borderRadius: "20px",
                }}
              >
                {sub}
              </button>
            ))}
          </motion.div>
        )}
      </div>

      <div className="shop-products-grid-container container-max">
        {filteredProducts.length === 0 ? (
          <div className="shop-no-results">
            <p>No outfits match your criteria. Try another search or filter.</p>
          </div>
        ) : (
          <motion.div
            className="shop-products-grid"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
          >
            {filteredProducts.map((product) => (
              <ProductCard key={product._id || product.id} product={product} />
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default ShopPage;
