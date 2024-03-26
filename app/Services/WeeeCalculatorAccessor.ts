/**
 * This class provides an entry point to the collections total weight calculator
 */
export default class WeeeCalulatorAccessor {
  protected url: string;
  constructor() {
    this.url = "http://localhost:3000";
  }

  /**
   * This method sends a request to the server, requesting to get the collections' sold products weight
   * @param {Array<number>} targetCollectionsTitles - Array of all collections' titles to be evaluated
   * @returns an object with collection's names and the value of the total sold weight
   */
  public async fetchData(targetCollectionsTitles: Array<string>): Promise<{}> {
    try {
      let dataList: {} = {};
      await fetch(`${this.url}/initCalculation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(targetCollectionsTitles),
      })
        .then((response) => response.json())
        .then((data: Map<string, number>) => {
          console.log(data);
          dataList = data;
        });
      return dataList;
    } catch (e: any) {
      throw new Error(`Error fetching data: ${e.message}`);
    }
  }
}
