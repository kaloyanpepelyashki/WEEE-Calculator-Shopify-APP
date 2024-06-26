class WeeeCollectionsService {
  private url: string;
  protected accessToken: string;
  protected hostName: string;

  constructor(accessToken: string, hostName: string) {
    this.url = "https://weee-calculator-server.onrender.com/api/v1/";
    this.accessToken = accessToken;
    this.hostName = hostName;
  }

  public async createColletions(collections: Array<string>) {
    try {
      const result = await fetch(`${this.url}/createCollections`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
          "access-token": this.accessToken,
          "host-name": this.hostName,
        },
        body: JSON.stringify(collections),
      });

      console.log(result);
    } catch (e) {
      throw new Error(`Error creating collections: ${e}`);
    }
  }

  public async addProductsToCollection(
    collectionName: string,
    productIds: Array<string>,
  ) {
    try {
      const result = await fetch(`${this.url}/addProductsToCollection`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "access-token": this.accessToken,
          "host-name": this.hostName,
        },
        body: JSON.stringify({
          collectionName: collectionName,
          productIds: productIds,
        }),
      });
      if (result.status === 200) {
        return true;
      } else {
        throw new Error(
          `Error adding products to collection: ${result.status}`,
        );
      }
    } catch (e) {
      throw new Error(`Error adding products to collection: ${e}`);
    }
  }
}

export default WeeeCollectionsService;
