export default class Block {
  constructor({ w, h }) {
    this.w = w;
    this.h = h;
  }

  area() {
    return this.w * this.h;
  }
}
