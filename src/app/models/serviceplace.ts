export enum ServicePlace {
  REMOTE,
  AT_CUSTOMER,
  AT_SHOP
}
// tslint:disable-next-line: no-namespace
export namespace ServicePlace {

  export function values() {
    return Object.keys(ServicePlace).filter(
      (type) => isNaN(type as any) && type !== 'values'
    );
  }
}
