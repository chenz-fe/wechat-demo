import {config} from '../config.js';

const errTips = {
  1: '未知错误',
  1005: 'appkey无效',
  3000: '数据不存在',
};

class HTTP {
  request({url, data = {}, method = 'GET'}) {
    return new Promise((resolve, reject) => {
      this._request(url, resolve, reject, data, method);
    });
  }

  _request(url, resolve, reject, data = {}, method = 'GET') {
    wx.request({
      url: config.api_base_url + url,
      data: data,
      method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json',
        appkey: config.appkey,
      },
      success: res => {
        const code = res.statusCode.toString();
        if (code.startsWith('2')) {
          resolve(res.data);
        } else {
          reject();
          this._showError(res.data.error_code);
        }
      },
      fail: err => {
        reject();
        this._showError(1);
      },
    });
  }
  _showError(errCode) {
    errCode = errCode || 1;
    const tip = errTips[errCode];
    wx.showToast({
      title: tip ? tip : errTips[1],
      icon: 'none',
      duration: 2000,
    });
  }
}

export {HTTP};
