"use client";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/schema/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
const Category = () => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const searchParams = useSearchParams();
  const router = useRouter();
  // Fetch All Categories
  useEffect(() => {
    const getCategories = async () => {
      const categoriesList = await getAllCategories();
      categoriesList && setCategories(categoriesList);
    };
    getCategories();
  }, []);

  const onSelectCategory = (category: string) => {
    let newURl = "";
    if (category && category !== "All") {
      newURl = formUrlQuery({
        params: searchParams.toString(),
        value: category,
        key: "category",
      });
    } else {
      newURl = removeKeysFromQuery({
        params: searchParams.toString(),
        keysToRemove: ["category"],
      });
    }
    router.push(newURl, { scroll: false });
  };
  return (
    <Select onValueChange={(value: string) => onSelectCategory(value)}>
      <SelectTrigger className="select-field">
        <SelectValue placeholder="Category" />
      </SelectTrigger>
      <SelectContent>
        <SelectItem className="select-item p-regular-14" value="All">
          All
        </SelectItem>
        {categories.map((category) => (
          <SelectItem
            key={category._id}
            className="select-item p-regular-14"
            value={category.name}
          >
            {category.name}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default Category;
