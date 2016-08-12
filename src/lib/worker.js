import binPacker from './binPacker';
import { convertAmount } from 'lib/measurements';

const emptyAmount = (value) => !value || !value.amount || !value.unit || value.amount <= 0;

function isValid(cuts, materialSize) {
  if (emptyAmount(materialSize.w)) {
    return false;
  }
  if (emptyAmount(materialSize.h)) {
    return false;
  }
  for (let i = 0; i < cuts.length; i++) {
    const cut = cuts[i];
    if (emptyAmount(cut.h)) {
      return false;
    }
    if (emptyAmount(cut.h)) {
      return false;
    }
    if (Math.min(convertAmount(cut.w, 'Millimeter').amount, convertAmount(cut.h, 'Millimeter').amount) > Math.min(convertAmount(materialSize.w, 'Millimeter').amount, convertAmount(materialSize.h, 'Millimeter').amount)) {
      return false;
    }
    if (Math.max(convertAmount(cut.w, 'Millimeter').amount, convertAmount(cut.h, 'Millimeter').amount) > Math.max(convertAmount(materialSize.w, 'Millimeter').amount, convertAmount(materialSize.h, 'Millimeter').amount)) {
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
      const convertedCut = {
        w: convertAmount(cut.w, 'Millimeter').amount,
        h: convertAmount(cut.h, 'Millimeter').amount,
      };
      for (let i = 0; i < cut.count; i++) {
        ret.push(convertedCut);
      }
      return ret;
    }, []);
    const finalMaterialSize = {
      w: convertAmount(materialSize.w, 'Millimeter').amount,
      h: convertAmount(materialSize.h, 'Millimeter').amount,
    };
    areas = binPacker(finalCuts, finalMaterialSize, convertAmount(margin, 'Millimeter').amount - 1);
  }
  self.postMessage(areas);
}, false);
