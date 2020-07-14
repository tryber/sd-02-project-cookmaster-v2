class Checker {
  constructor(...middlewares) {
    this.middlewares = middlewares;
  }

  static async use(req, res) {
    let iterator = 0;
    if (iterator < this.middlewares.length) {
      const firstMiddleware = this.middlewares[iterator];
      const next = () => {
        iterator++;
        if (iterator < this.middlewares.length) {
          const nextMiddleware = this.middlewares[iterator];
          return nextMiddleware(req, res, next);
        }
      };
      return firstMiddleware(req, res, next);
    }
  }
}

module.exports = Checker;
