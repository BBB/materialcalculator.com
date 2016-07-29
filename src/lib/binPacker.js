import Block from './Block';
import Packer from './Packer';

export default function binPacker(blocks, area, margin=0) {

  blocks = blocks.map((p) => new Block(p)).sort((a, b) => b.area() - a.area())

  const areas = [];

  while(!blocks.every(b => !!b.fit)) {
    const nextBlocks = blocks.filter(b => !b.fit);
    areas.push(new Packer(area.w, area.h, margin));
    areas[areas.length-1].fit(nextBlocks);
  }

  return areas;
}
