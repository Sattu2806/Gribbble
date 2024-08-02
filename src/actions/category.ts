"use server"
import prisma from "@/app/prismadb"  // Adjust the import path if necessary

const options = [
  { value: 'discover', label: 'Discover' },
  { value: 'animation', label: 'Animations' },
  { value: 'branding', label: 'Branding' },
  { value: 'illustration', label: 'Illustration' },
  { value: 'mobile', label: 'Mobile' },
  { value: 'print', label: 'Print' },
  { value: 'productdesign', label: 'Product Design' },
  { value: 'typography', label: 'Typography' },
  { value: 'webdesign', label: 'Web Design' },
];

export const addCategories = async () => {
  try {
    // Convert each option to a plain object
    const categoryCreations = options.map(option => ({
      name: option.label
    }));

    console.log("hello", categoryCreations)
    
    await prisma.category.createMany({
        data:categoryCreations
    })
    console.log("Categories added successfully.");
  } catch (error) {
    console.error("Error adding categories:", error);
  }
}


export const getAllCategories = async () => {
    try {
      // Fetch all categories from the database
      const categories = await prisma.category.findMany();
  
      // Transform the data into the desired format
      const categoryOptions = categories.map(category => ({
        value: category.id,
        label: category.name
      }));
  
      return categoryOptions;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  }