import React from 'react';
import { Product } from '../types';
import { useStore } from '../context/StoreContext';
import { ShoppingBag, Eye, MessageCircle, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const {
    navigateToProduct,
    addToCart,
    setQuickViewProduct,
    getWhatsAppEnquiryUrl
  } = useStore();

  const primaryImage = product.images[0] || '/src/assets/images/hero_regal_boutique_1791904272171.jpg';

  const handleCardClick = (e: React.MouseEvent) => {
    // If user clicked inside an action button, don't navigate
    if ((e.target as HTMLElement).closest('button') || (e.target as HTMLElement).closest('a')) {
      return;
    }
    navigateToProduct(product.id);
  };

  const isLowStock = product.inStock && product.stockCount > 0 && product.stockCount <= 4;

  return (
    <div
      onClick={handleCardClick}
      className="group bg-white rounded-xl border border-[#EBE1D4] hover:border-[#D4AF37]/60 overflow-hidden transition-all duration-300 hover:shadow-md flex flex-col cursor-pointer relative"
    >
      {/* Image Container with Badges & Hover Overlay */}
      <div className="relative aspect-4/3 w-full bg-[#F5EFEB] overflow-hidden">
        <img
          src={primaryImage}
          alt={product.name}
          referrerPolicy="no-referrer"
          className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-500 ease-out"
          onError={(e) => {
            // Fallback gracefully to hero if local path fails
            const target = e.currentTarget;
            target.onerror = null;
            target.src = '/src/assets/images/hero_regal_boutique_1791904272171.jpg';
          }}
        />

        {/* Top Badges */}
        <div className="absolute top-2.5 left-2.5 flex flex-col gap-1 items-start z-10">
          {product.isBestseller && (
            <span className="bg-[#7A1C2E] text-white text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded shadow-xs">
              Bestseller
            </span>
          )}
          {product.isNewArrival && !product.isBestseller && (
            <span className="bg-[#1E5B3C] text-white text-[10px] font-bold tracking-wider uppercase px-2 py-0.5 rounded shadow-xs">
              New Arrival
            </span>
          )}
          {product.discountPercent && product.discountPercent > 0 && (
            <span className="bg-[#D4AF37] text-[#3D141C] text-[10px] font-bold tracking-wider px-1.5 py-0.5 rounded shadow-xs">
              {product.discountPercent}% OFF
            </span>
          )}
        </div>

        {/* Quick View & WhatsApp hover action strip */}
        <div className="absolute inset-x-2 bottom-2 flex items-center justify-between gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              setQuickViewProduct(product);
            }}
            className="flex-1 flex items-center justify-center gap-1 bg-white/95 hover:bg-white text-[#2A1B22] text-xs font-semibold py-1.5 px-2 rounded-lg shadow-md backdrop-blur-xs transition-colors"
            title="Quick view product"
          >
            <Eye className="w-3.5 h-3.5 text-stone-600" />
            <span>Quick View</span>
          </button>

          <a
            href={getWhatsAppEnquiryUrl(product)}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => e.stopPropagation()}
            className="p-1.5 bg-[#25D366] hover:bg-[#1EBE5D] text-white rounded-lg shadow-md transition-colors"
            title="Inquire on WhatsApp"
            aria-label="Inquire on WhatsApp"
          >
            <MessageCircle className="w-4 h-4 fill-white" />
          </a>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 flex-1 flex flex-col justify-between">
        <div>
          {/* Unboxed Metadata without pills */}
          <div className="flex items-center justify-between text-[11px] text-[#6B5A62] mb-1 font-medium tracking-wide">
            <span>{product.category} · {product.subCategory}</span>
            <div className="flex items-center gap-1 text-amber-600">
              <Star className="w-3 h-3 fill-amber-500 text-amber-500" />
              <span>{product.rating}</span>
            </div>
          </div>

          {/* Title */}
          <h3 className="font-serif text-[15px] font-bold text-[#2A1B22] group-hover:text-[#7A1C2E] transition-colors line-clamp-2 leading-snug mb-2">
            {product.name}
          </h3>

          {/* Fabric snippet */}
          <p className="text-xs text-[#7A6B73] line-clamp-1 mb-2 font-normal">
            {product.fabric}
          </p>
        </div>

        {/* Price & Action Row */}
        <div className="pt-2 border-t border-[#F2EAE0] flex items-center justify-between gap-2 mt-auto">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-base font-bold text-[#7A1C2E] tabular-nums">
                ₹{product.price.toLocaleString('en-IN')}
              </span>
              {product.originalPrice > product.price && (
                <span className="text-xs text-stone-400 line-through tabular-nums">
                  ₹{product.originalPrice.toLocaleString('en-IN')}
                </span>
              )}
            </div>

            {/* Stock indicator */}
            {isLowStock ? (
              <span className="text-[10px] text-amber-700 font-semibold block leading-tight">
                Only {product.stockCount} left in boutique!
              </span>
            ) : product.inStock ? (
              <span className="text-[10px] text-emerald-700 font-medium block leading-tight">
                In Stock · Ready to dispatch
              </span>
            ) : (
              <span className="text-[10px] text-rose-700 font-medium block leading-tight">
                Out of Stock (WhatsApp for custom order)
              </span>
            )}
          </div>

          {/* Quick Add To Bag Button */}
          {product.inStock ? (
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                addToCart(product);
              }}
              className="p-2 bg-[#FAF7F2] text-[#7A1C2E] hover:bg-[#7A1C2E] hover:text-white border border-[#E2D5C5] hover:border-[#7A1C2E] rounded-lg transition-colors shrink-0 shadow-2xs"
              title="Add to shopping bag"
              aria-label={`Add ${product.name} to bag`}
            >
              <ShoppingBag className="w-4 h-4" />
            </button>
          ) : (
            <a
              href={getWhatsAppEnquiryUrl(product)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={(e) => e.stopPropagation()}
              className="px-2.5 py-1 text-[11px] font-semibold text-[#1E5B3C] border border-[#25D366] rounded-md hover:bg-[#25D366] hover:text-white transition-colors"
            >
              Enquire
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
