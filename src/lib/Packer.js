
// Original algo take from https://github.com/jakesgordon/bin-packing
// - added margin
// - sent back only the top-left coords of the block as `fit`
// - tracked blocks that are contained within the pack
export default class Packer {
  constructor(w, h, margin) {
    this.w = w;
    this.h = h;
    this.margin = margin;
    this.root = { x: 0, y: 0, w: w, h: h };
    this.blocks = [];
  }

  fit(blocks) {
    let node;
    let block;
    for (let n = 0; n < blocks.length; n++) {
      block = blocks[n];
      node = this.findNode(this.root, block.w, block.h);
      if (node) {
        block.fit = this.splitNode(node, block.w, block.h).final;
        this.blocks.push(block);
      }
    }
  }

  findNode(root, w, h) {
    if (root.used) {
      return this.findNode(root.right, w, h) || this.findNode(root.down, w, h);
    } else if ((w <= root.w) && (h <= root.h)) {
      return root;
    }
    return null;
  }

  splitNode(node, w, h) {
    node.used = true;
    node.final = {
      x: node.x,
      y: node.y,
      w: node.w,
      h: node.h - h,
    };
    node.down = {
      x: node.x,
      y: node.y + h + this.margin,
      w: node.w,
      h: node.h - h - this.margin,
    };
    node.right = {
      x: node.x + w + this.margin,
      y: node.y,
      w: node.w - w - this.margin,
      h: h,
    };
    return node;
  }
}
