class WeeeCollectionsService {
  public static instance: WeeeCollectionsService;
  private url: string;
  protected constructor() {
    this.url = "http://localhost:3000";
  }

  public static getInstance(): WeeeCollectionsService {
    if (this.instance == null) {
      this.instance = new WeeeCollectionsService();
    }

    return this.instance;
  }

  public async createColletions(collections: Array<string>) {
    try {
      const result = await fetch(`${this.url}/createCollections`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
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
        method: "post",
        headers: {
          "Content-Type": "application/json",
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
