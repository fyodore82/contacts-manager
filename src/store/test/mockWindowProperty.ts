export const mockWindowProperty = (property: any, value: any) => {
  const { [property]: originalProperty } = window;
  delete window[property];
  beforeEach(() => {
    Object.defineProperty(window, property, {
      configurable: true,
      writable: true,
      value,
    });
  });
  afterEach(() => {
    window[property] = originalProperty;
  });
};