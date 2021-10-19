class MyStore {
  accessToken = '';

  getAccessToken() {
    return this.accessToken;
  }

  setAccessToken(accessToken: string) {
    this.accessToken = accessToken;
  }
}

export default new MyStore();
