class sessionStoreCleaner {
  static checkAndRemoveSessionStorage() {
    const currentURL = window.location.pathname;
    if (currentURL !== '/chat') {
      sessionStorage.clear();
    }
  }
}

export default sessionStoreCleaner;
