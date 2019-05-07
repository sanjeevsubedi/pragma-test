class EnvService {
  constructor() {}
  getEnv() {
    // Read environment variables from browser window
    const browserWindow = window || {};
    const browserWindowEnv = browserWindow["__env"] || {};
    return {
      socketUrl: browserWindowEnv.socketUrl
    };
  }
}
