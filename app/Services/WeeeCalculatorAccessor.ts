/**
 * This class provides an entry point to the collections total weight calculator
 * The class constructor expects to get shopify accessToken and shop host name.
 * The accessToken and hostName must be sent in the header of every request
 */
export default class WeeeCalulatorAccessor {
  protected url: string;
  protected accessToken: string;
  protected hostName: string;
  constructor(accessToken: string, hostName: string) {
    this.url = "http://localhost:3000";
    this.accessToken = accessToken;
    this.hostName = hostName;
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
          "access-token": this.accessToken,
          "host-name": this.hostName,
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
