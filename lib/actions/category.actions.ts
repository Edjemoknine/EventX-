"use server";

import { CreateCategoryParams } from "@/types";
import { connectToDatabase } from "../database";
import Category from "../database/schema/category.model";

export const createCategory = async ({
  categoryName,
}: CreateCategoryParams) => {
  try {
    await connectToDatabase();

    const newCategory = await Category.create({ name: categoryName });
    return JSON.parse(JSON.stringify(newCategory));
  } catch (error) {
    console.log(error);
  }
};

export const getAllCategories = async () => {
  try {
    await connectToDatabase();

    const Categories = await Category.find();
    return JSON.parse(JSON.stringify(Categories));
  } catch (error) {
    console.log(error);
  }
};
