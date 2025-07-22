"use client";

import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategoryTree } from "@/store/actions/categoryActions";
import { ChevronDown, ChevronRight } from "lucide-react";

// Recursive category item component
const CategoryItem = ({ category, onSelect, selectedCategorySlug }) => {
  const [isOpen, setIsOpen] = useState(false);
  const hasChildren = category.children && category.children.length > 0;
  const isSelected = selectedCategorySlug === category.slug;

  useEffect(() => {
    // Auto-expand if a child matches the selected category
    if (
      hasChildren &&
      category.children.some((child) => child.slug === selectedCategorySlug)
    ) {
      setIsOpen(true);
    }
  }, [selectedCategorySlug, category.children, hasChildren]);

  const handleClick = () => {
    if (hasChildren) {
      setIsOpen((prev) => !prev);
    } else {
      onSelect?.(category.slug); // trigger parent with selected slug
    }
  };

  return (
    <li className="mb-1">
      <div
        className={`flex items-center justify-between cursor-pointer text-sm font-medium transition-colors ${
          isSelected
            ? "text-blue-600 font-semibold"
            : "text-gray-800 hover:text-blue-600"
        }`}
        onClick={handleClick}
      >
        <span>{category?.name}</span>
        {hasChildren && (
          <span className="ml-1">
            {isOpen ? <ChevronDown size={14} /> : <ChevronRight size={14} />}
          </span>
        )}
      </div>

      {hasChildren && (
        <div
          className={`overflow-hidden transition-all duration-300 ease-in-out ${
            isOpen ? "max-h-[500px] opacity-100 mt-1" : "max-h-0 opacity-0"
          }`}
        >
          <ul className="pl-4 border-l border-gray-300">
            {category.children.map((child) => (
              <CategoryItem
                key={child._id}
                category={child}
                onSelect={onSelect}
                selectedCategorySlug={selectedCategorySlug}
              />
            ))}
          </ul>
        </div>
      )}
    </li>
  );
};

export default function CategorySidebar({
  onCategorySelect,
  selectedCategorySlug,
}) {
  const dispatch = useDispatch();
  const {
    categories = [],
    loading,
    error,
  } = useSelector((state) => state.categories || {});

  useEffect(() => {
    dispatch(fetchCategoryTree());
  }, [dispatch]);

  return (
    <aside className="w-[220px] shrink-0 border-r border-gray-300 p-4 hidden md:block">
      <h3 className="font-semibold mb-4 text-gray-800">Categories</h3>

      {loading && <p>Loading categories...</p>}
      {error && <p className="text-red-500">Error: {error}</p>}

      {!loading && !error && (
        <ul className="space-y-1">
          {categories.map((cat) => (
            <CategoryItem
              key={cat._id}
              category={cat}
              onSelect={onCategorySelect}
              selectedCategorySlug={selectedCategorySlug}
            />
          ))}
        </ul>
      )}
    </aside>
  );
}
