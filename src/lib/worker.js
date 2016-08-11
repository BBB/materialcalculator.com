import binPacker from './binPacker';

const emptyAmount = (value) => !value || !value.amount || !value.unit;

function isValid(cuts, materialSize) {
  if (emptyAmount(materialSize.w) || materialSize.w.amount < 1) {
    return false;
  }
  if (emptyAmount(materialSize.h) || materialSize.h.amount < 1) {
    return false;
  }
  for (let i = 0; i < cuts.length; i++) {
    const cut = cuts[i];
    if (emptyAmount(cut.h) || cut.w.amount < 1) {
      return false;
    }
    if (emptyAmount(cut.h) || cut.h.amount < 1) {
      return false;
    }
    if (Math.min(cut.w.amount, cut.h.amount) > Math.min(materialSize.w.amount, materialSize.h.amount)) {
      return false;
    }
    if (Math.max(cut.w.amount, cut.h.amount) > Math.max(materialSize.w.amount, materialSize.h.amount)) {
      return false;
    }
  }
  return true;
}

self.addEventListener('message', (e) => {
  const { cuts, materialSize, margin } = e.data;
  let areas = [];
  if (isValid(cuts, materialSize)) {
    // remove all units from passed lengths
    // and flatten out counts
    const finalCuts = cuts.reduce((ret, cut) => {
      for (let i = 0; i < cut.count; i++) {
        ret.push({
          w: cut.w.amount,
          h: cut.h.amount,
        });
      }
      return ret;
    }, []);
    const finalMaterialSize = {
      w: materialSize.w.amount,
      h: materialSize.h.amount,
    };
    areas = binPacker(finalCuts, finalMaterialSize, margin.amount - 1);
  }
  self.postMessage(areas);
}, false);
