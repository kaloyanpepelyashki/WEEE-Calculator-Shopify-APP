import Product from "~/Models/Product";

/**
 * This class serves as an entry point to all methods related to the Shopify Product object
 * All products are fetched from the API server
 */
class ProductsService {
  protected serverUrl: string;
  protected accessToken: string;
  protected hostName: string;

  constructor(accessToken: string, hostName: string) {
    this.serverUrl = "https://weee-calculator-server.onrender.com/api/v1/";
    this.accessToken = accessToken;
    this.hostName = hostName;
  }

  public async getAllShopProducts(): Promise<Array<Product>> {
    try {
      const productsList: Array<Product> = [];
      await fetch(`${this.serverUrl}/products/all`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "access-token": this.accessToken,
          "host-name": this.hostName,
        },
      })
        .then((res) => {
          if (res.status === 200) {
            return res.json();
          } else {
            return null;
          }
        })
        .then((data) => {
          console.log("data", data);
          if (data) {
            console.log("data", data);
            data.forEach((productItem: Product) => {
              const product = new Product(
                productItem.productId,
                productItem.productTitle,
                productItem.productWeight,
              );
              productsList.push(product);
            });
          } else {
            return null;
          }
        });

      return productsList;
    } catch (e) {
      throw new Error(`Error getting all products: ${e}`);
    }
  }
}

export default ProductsService;
