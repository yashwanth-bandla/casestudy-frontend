export class User {
  constructor(
    public userId: number,
    public name: string,
    public email: string,
    public password: string,
    public phone: number,
    public address: any,
    public cart: any,
    public orders: any,
    public role: string
  ) {}
}
