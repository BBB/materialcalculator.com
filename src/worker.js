import binPacker from './lib/binPacker';

function isValid(cuts, materialSize) {
  if (!materialSize.hasOwnProperty('w') || materialSize.w < 1) {
    return false;
  }
  if (!materialSize.hasOwnProperty('h') || materialSize.h < 1) {
    return false;
  }
  for (var i = 0; i < cuts.length; i++) {
    const cut = cuts[i];
    if (!cut.hasOwnProperty('w') || cut.w < 1) {
      return false;
    }
    if (!cut.hasOwnProperty('h') || cut.h < 1) {
      return false;
    }
    if (Math.min(cut.w, cut.h) > Math.min(materialSize.w, materialSize.h)) {
      return false;
    }
    if (Math.max(cut.w, cut.h) > Math.max(materialSize.w, materialSize.h)) {
      return false;
    }
  }
  return true;
}

self.addEventListener('message', function(e) {
  const { cuts, materialSize, margin } = e.data;
  let areas = [];
  if (isValid(cuts, materialSize)) {
    const finalCuts = cuts.reduce((ret, cut) => {
      for (let i = 0; i < cut.count; i++) {
        ret.push(cut);
      }
      return ret;
    }, [])
    areas = binPacker(finalCuts, materialSize, margin - 1);
  }
  self.postMessage(areas);
}, false);
