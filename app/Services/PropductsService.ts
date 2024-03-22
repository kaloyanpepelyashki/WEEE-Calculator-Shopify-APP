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

  public async getAllShopProducts() {
    try {
      const result = await fetch(`${this.serverUrl}/products/all`, {
        method: "GET",
      });

      if (result.status === 200) {
        if (result !== null) {
          return result;
        } else {
          return {};
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
