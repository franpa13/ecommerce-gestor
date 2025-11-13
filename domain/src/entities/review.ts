export class Review {
  constructor(
    public id: string,
    public userId: string,
    public productId: string,
    public rating: number,
    public comment: string,
    public createdAt: Date = new Date()
  ) {}
}