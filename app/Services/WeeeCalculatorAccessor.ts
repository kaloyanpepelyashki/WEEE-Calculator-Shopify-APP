export default class WeeeCalulatorAccessor {
  protected url: string;
  constructor() {
    this.url = "http://localhost:3000/";
  }

  public async fetchData(): Promise<Array<number>> {
    try {
      let dataList: Array<number> = [];
      await fetch(this.url, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data: Array<number>) => {
          dataList = data;
        });
      return dataList;
    } catch (e: any) {
      throw new Error(`Error fetching data: ${e.message}`);
    }
  }
}
