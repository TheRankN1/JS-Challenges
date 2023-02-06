export interface Person {
  id: number,
  name: string,
  hobbies: string[],
  gender?: string,
  isOnline: boolean,
  visitCounts: number,
  likeCounts: number,
}
