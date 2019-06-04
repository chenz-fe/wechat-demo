import {HTTP} from '../utils/http.js';

class ClassicModel extends HTTP {
  getLatest() {
    return this.request({
      url: 'classic/latest',
    });
  }

  getClassic(index, nextOrPrevious) {
    return this.request({
      url: `classic/${index}/${nextOrPrevious}`,
    });
  }

  getMyFavor() {
    return this.request({
      url: 'classic/favor',
    });
  }

  getById(cid, type) {
    return this.request({
      url: `classic/${type}/${cid}`,
    });
  }

  isFirst(index) {
    return index === 1 ? true : false;
  }

  isLatest(index) {
    const latestIndex = this._getLatestIndex();
    return latestIndex === index ? true : false;
  }

  _setLatestIndex(index) {
    return wx.getStorageSync('latest');
  }

  _getKey(index) {
    return 'classic-' + index;
  }
}

export { ClassicModel };

