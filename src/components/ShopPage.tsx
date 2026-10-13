import React, { useState, useMemo } from 'react';
import { useStore } from '../context/StoreContext';
import { ProductCard } from './ProductCard';
import { ProductCategory } from '../types';
import { Search, SlidersHorizontal, X, ArrowUpDown, Check } from 'lucide-react';
import { CATEGORIES_LIST } from '../data/initialProducts';

type SortOption = 'featured' | 'price-asc' | 'price-desc' | 'rating' | 'newest';

export const ShopPage: React.FC = () => {
  const {
    products,
    selectedCategory,
    setSelectedCategory,
    searchQuery,
    setSearchQuery
  } = useStore();

  const [sortBy, setSortBy] = useState<SortOption>('featured');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string>('All');
  const [maxPrice, setMaxPrice] = useState<number>(8000);
  const [onlyInStock, setOnlyInStock] = useState<boolean>(false);
  const [filterDrawerOpen, setFilterDrawerOpen] = useState<boolean>(false);

  // Available sub-categories for current category
  const availableSubCategories = useMemo(() => {
    if (selectedCategory === 'All') {
      return Array.from(new Set(products.map((p) => p.subCategory)));
    }
    return Array.from(
      new Set(products.filter((p) => p.category === selectedCategory).map((p) => p.subCategory))
    );
  }, [products, selectedCategory]);

  // Filtered & Sorted Products
  const filteredProducts = useMemo(() => {
    return products
      .filter((product) => {
        // Category Filter
        if (selectedCategory !== 'All' && product.category !== selectedCategory) {
          return false;
        }
        // SubCategory Filter
        if (selectedSubCategory !== 'All' && product.subCategory !== selectedSubCategory) {
          return false;
        }
        // Search Filter
        if (searchQuery.trim()) {
          const query = searchQuery.toLowerCase();
          const matchName = product.name.toLowerCase().includes(query);
          const matchCat = product.category.toLowerCase().includes(query);
          const matchSub = product.subCategory.toLowerCase().includes(query);
          const matchFabric = product.fabric.toLowerCase().includes(query);
          const matchSku = product.sku.toLowerCase().includes(query);
          if (!matchName && !matchCat && !matchSub && !matchFabric && !matchSku) {
            return false;
          }
        }
        // Price Filter
        if (product.price > maxPrice) {
          return false;
        }
        // Stock Filter
        if (onlyInStock && !product.inStock) {
          return false;
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        if (sortBy === 'newest') return (b.isNewArrival ? 1 : 0) - (a.isNewArrival ? 1 : 0);
        // featured default
        return (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0);
      });
  }, [products, selectedCategory, selectedSubCategory, searchQuery, maxPrice, onlyInStock, sortBy]);

  const handleResetFilters = () => {
    setSelectedCategory('All');
    setSelectedSubCategory('All');
    setSearchQuery('');
    setMaxPrice(8000);
    setOnlyInStock(false);
    setSortBy('featured');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
          <div>
            <span className="text-xs uppercase tracking-widest text-[#7A1C2E] font-bold">
              Varam Boutique Catalog
            </span>
            <h1 className="font-serif text-3xl sm:text-4xl font-bold text-[#2A1B22] mt-1">
              {selectedCategory === 'All' ? 'All Collections' : selectedCategory}
            </h1>
            <p className="text-xs text-stone-500 mt-1">
              Showing {filteredProducts.length} handcrafted pieces in Indian boutique inventory
            </p>
          </div>

          {/* Search bar inside shop */}
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 text-stone-400 absolute left-3 top-2.5 pointer-events-none" />
            <input
              type="text"
              placeholder="Search in collections..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-9 pr-8 py-2 bg-white border border-[#D5C2B1] rounded-xl text-xs text-[#2A1B22] focus:outline-none focus:border-[#7A1C2E]"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-2.5 top-2.5 text-stone-400 hover:text-stone-700"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>

        {/* Primary Category Filter Tabs */}
        <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mt-6 scrollbar-none border-b border-[#EAE0D4]">
          <button
            onClick={() => {
              setSelectedCategory('All');
              setSelectedSubCategory('All');
            }}
            className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
              selectedCategory === 'All'
                ? 'bg-[#7A1C2E] text-white shadow-xs'
                : 'bg-white text-stone-700 border border-stone-200 hover:border-[#7A1C2E]'
            }`}
          >
            All Pieces ({products.length})
          </button>

          {CATEGORIES_LIST.map((cat) => (
            <button
              key={cat.name}
              onClick={() => {
                setSelectedCategory(cat.name as ProductCategory);
                setSelectedSubCategory('All');
              }}
              className={`px-4 py-2 text-xs font-semibold rounded-lg transition-all whitespace-nowrap shrink-0 ${
                selectedCategory === cat.name
                  ? 'bg-[#7A1C2E] text-white shadow-xs'
                  : 'bg-white text-stone-700 border border-stone-200 hover:border-[#7A1C2E]'
              }`}
            >
              {cat.name}
            </button>
          ))}
        </div>
      </div>

      {/* Controls Bar: Sub-Categories, Sort & Filter Trigger */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-6 bg-white p-3.5 rounded-xl border border-[#EBE1D4]">
        {/* Sub-category dropdown or quick pills */}
        <div className="flex items-center gap-2 overflow-x-auto py-0.5">
          <span className="text-xs font-bold text-stone-500 uppercase tracking-wider shrink-0 hidden sm:inline">
            Sub-Category:
          </span>
          <button
            onClick={() => setSelectedSubCategory('All')}
            className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors whitespace-nowrap shrink-0 ${
              selectedSubCategory === 'All'
                ? 'bg-[#FAF7F2] text-[#7A1C2E] font-bold border border-[#7A1C2E]'
                : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            All Sub-types
          </button>
          {availableSubCategories.map((sub) => (
            <button
              key={sub}
              onClick={() => setSelectedSubCategory(sub)}
              className={`px-2.5 py-1 text-xs rounded-md font-medium transition-colors whitespace-nowrap shrink-0 ${
                selectedSubCategory === sub
                  ? 'bg-[#FAF7F2] text-[#7A1C2E] font-bold border border-[#7A1C2E]'
                  : 'text-stone-600 hover:text-stone-900'
              }`}
            >
              {sub}
            </button>
          ))}
        </div>

        {/* Right side controls: Sorting & Filters */}
        <div className="flex items-center gap-3 shrink-0 ml-auto">
          {/* In Stock Quick Toggle */}
          <label className="hidden md:flex items-center gap-1.5 text-xs text-stone-700 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={(e) => setOnlyInStock(e.target.checked)}
              className="accent-[#7A1C2E] rounded"
            />
            <span>In Stock Only</span>
          </label>

          {/* Sort Selector */}
          <div className="flex items-center gap-1 text-xs">
            <ArrowUpDown className="w-3.5 h-3.5 text-stone-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as SortOption)}
              className="bg-[#FAF7F2] border border-[#D5C2B1] rounded-lg px-2.5 py-1 text-xs font-medium text-stone-800 focus:outline-none focus:border-[#7A1C2E]"
            >
              <option value="featured">Featured First</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="newest">New Arrivals</option>
            </select>
          </div>

          {/* Mobile Filter Toggle */}
          <button
            onClick={() => setFilterDrawerOpen(!filterDrawerOpen)}
            className="md:hidden flex items-center gap-1.5 px-3 py-1 bg-[#FAF7F2] border border-[#D5C2B1] text-xs font-medium text-stone-800 rounded-lg"
          >
            <SlidersHorizontal className="w-3.5 h-3.5" />
            <span>Filters</span>
          </button>
        </div>
      </div>

      {/* Filter Drawer / Expanded Filter Row */}
      {filterDrawerOpen && (
        <div className="md:hidden bg-white p-4 rounded-xl border border-[#EBE1D4] mb-6 space-y-4 animate-fadeIn">
          <div>
            <div className="flex justify-between text-xs font-semibold mb-1">
              <span>Max Price:</span>
              <span className="text-[#7A1C2E] font-bold">₹{maxPrice.toLocaleString('en-IN')}</span>
            </div>
            <input
              type="range"
              min={1000}
              max={8000}
              step={500}
              value={maxPrice}
              onChange={(e) => setMaxPrice(Number(e.target.value))}
              className="w-full accent-[#7A1C2E]"
            />
          </div>

          <label className="flex items-center gap-2 text-xs font-medium text-stone-700 cursor-pointer">
            <input
              type="checkbox"
              checked={onlyInStock}
              onChange={(e) => setOnlyInStock(e.target.checked)}
              className="accent-[#7A1C2E] rounded"
            />
            <span>Show Only In-Stock Products</span>
          </label>

          <div className="flex justify-end pt-2 border-t border-stone-100">
            <button
              onClick={handleResetFilters}
              className="text-xs text-rose-700 font-semibold hover:underline"
            >
              Reset All Filters
            </button>
          </div>
        </div>
      )}

      {/* Active Filter Chips */}
      {(selectedCategory !== 'All' || selectedSubCategory !== 'All' || searchQuery || onlyInStock || maxPrice < 8000) && (
        <div className="flex flex-wrap items-center gap-2 mb-6">
          <span className="text-xs font-semibold text-stone-400">Active Filters:</span>
          {selectedCategory !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FAF7F2] text-[#7A1C2E] border border-[#D5C2B1] rounded-full text-xs font-medium">
              Category: {selectedCategory}
              <button onClick={() => setSelectedCategory('All')}><X className="w-3 h-3" /></button>
            </span>
          )}
          {selectedSubCategory !== 'All' && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FAF7F2] text-[#7A1C2E] border border-[#D5C2B1] rounded-full text-xs font-medium">
              Sub: {selectedSubCategory}
              <button onClick={() => setSelectedSubCategory('All')}><X className="w-3 h-3" /></button>
            </span>
          )}
          {searchQuery && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FAF7F2] text-[#7A1C2E] border border-[#D5C2B1] rounded-full text-xs font-medium">
              Keyword: "{searchQuery}"
              <button onClick={() => setSearchQuery('')}><X className="w-3 h-3" /></button>
            </span>
          )}
          {onlyInStock && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-emerald-50 text-emerald-800 border border-emerald-200 rounded-full text-xs font-medium">
              In Stock Only
              <button onClick={() => setOnlyInStock(false)}><X className="w-3 h-3" /></button>
            </span>
          )}
          {maxPrice < 8000 && (
            <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#FAF7F2] text-[#7A1C2E] border border-[#D5C2B1] rounded-full text-xs font-medium">
              Under ₹{maxPrice.toLocaleString('en-IN')}
              <button onClick={() => setMaxPrice(8000)}><X className="w-3 h-3" /></button>
            </span>
          )}
          <button
            onClick={handleResetFilters}
            className="text-xs text-rose-700 hover:underline font-semibold ml-2"
          >
            Clear All
          </button>
        </div>
      )}

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="bg-white rounded-2xl border border-[#EBE1D4] p-12 text-center max-w-xl mx-auto my-12 shadow-xs">
          <div className="w-16 h-16 bg-[#FAF7F2] text-stone-400 rounded-full flex items-center justify-center mx-auto mb-3">
            <Search className="w-8 h-8 opacity-60" />
          </div>
          <h3 className="font-serif text-xl font-bold text-stone-800 mb-2">No Products Match Your Filter</h3>
          <p className="text-xs text-stone-600 mb-5">
            We couldn't find any items matching your selected criteria. Try adjusting your search query, price limit, or category.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-5 py-2.5 bg-[#7A1C2E] text-white text-xs font-semibold rounded-xl hover:bg-[#63101E] transition-colors"
          >
            Reset All Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((prod) => (
            <ProductCard key={prod.id} product={prod} />
          ))}
        </div>
      )}
    </div>
  );
};
