function createRouter(app) {
  return {
    init() {
      if (typeof app?.initialize === "function") {
        return app.initialize();
      }

      return undefined;
    }
  };
}

export { createRouter };
export default createRouter;
