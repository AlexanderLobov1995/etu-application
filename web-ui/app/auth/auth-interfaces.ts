export interface Role {
  name: string,
  value: number,
}

export interface Level {
  get: number,
  update: number,
  create: number,
  authorize: number
}