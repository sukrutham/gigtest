import 'reflect-metadata';

export function findBy(locatorType: string, locator: string) {
  return (target: any, propertyKey: string) => {
    const type = Reflect.getMetadata('design:type', target, propertyKey);
    Object.defineProperty(target, propertyKey, {
      configurable: true,
      enumerable: true,
      get: function () {
        const promise = (this as any).browser.findElement(locatorType, locator);
        return new type(promise, locator);
      },
    });
  };
}
