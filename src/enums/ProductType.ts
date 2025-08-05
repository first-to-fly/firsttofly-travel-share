/**
 * Product Type enum representing different types of travel products.
 * Replaces the former ProductType entity with a simple enum.
 */
export enum ProductType {
  /**
   * Group Inclusive Tour - Package tours for groups
   */
  GIT = "git",

  /**
   * Foreign Independent Tour - Individual/independent travel packages
   */
  FIT = "fit",
}

/**
 * Helper function to get all product types as an array of strings
 */
export function getAllProductTypes(): string[] {
  return Object.values(ProductType);
}

/**
 * Helper function to check if a string is a valid product type
 */
export function isValidProductType(type: string): type is ProductType {
  return Object.values(ProductType).includes(type as ProductType);
}
