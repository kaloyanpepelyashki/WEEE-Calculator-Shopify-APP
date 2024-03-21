export default class WeeeCollectionsManager {
  public static instance: WeeeCollectionsManager;
  protected constructor() {}

  public static getInstance(): WeeeCollectionsManager {
    if (this.instance == null) {
      this.instance = new WeeeCollectionsManager();
    }

    return this.instance;
  }
}
