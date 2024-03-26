import Product from "~/Models/Product";

/**
 * This class serves as an entry point to all methods related to the Shopify Product object
 * All products are fetched from the API server
 */
class ProductsService {
  private static instance: ProductsService;
  protected serverUrl: string;
  constructor() {
    this.serverUrl = "http://localhost:3000/";
  }

  public static getInstance() {
    if (!this.instance) {
      this.instance = new ProductsService();
    }
    return this.instance;
  }

  public async getAllShopProducts(): Promise<Array<Product>> {
    try {
      const result = await fetch(`${this.serverUrl}/products/all`, {
        method: "GET",
      });
      //TODO Resolve the problem here.
      if (result.status === 200) {
        if (result !== null) {
          const productsList: Array<Product> = [];
          result.forEach((productItem) => {
            const product = new Product(
              productItem.productId,
              productItem.productTitle,
              productItem.productWeigh,
            );
            productsList.push(product);
          });

          return productsList;
        } else {
          return [];
        }
      } else {
        throw new Error(`Error getting products. Status: ${result.status}`);
      }
    } catch (e) {
      throw new Error(`Error getting all products: ${e}`);
    }
  }
}

export default ProductsService;
