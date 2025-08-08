//index.js
//获取应用实例
const app = getApp()

// 扫描类型
const scanType = {
  'QR_CODE': '二维码(QR_CODE)',
  'AZTEC': '一维码(AZTEC)',
  'CODABAR': '一维码(CODABAR)',
  'CODE_39': '一维码(CODE_39)',
  'CODE_93': '一维码(CODE_93)',
  'CODE_128': '一维码(CODE_128)',
  'DATA_MATRIX': '二维码(DATA_MATRIX)',
  'EAN_8': '一维码(EAN_8)',
  'EAN_13': '一维码(EAN_13)',
  'ITF': '一维码(ITF)',
  // 'MAXICODE': '一维码(MAXICODE)',
  'PDF_417': '二维码(PDF_417)',
  'RSS_14': '一维码(RSS_14)',
  // 'RSS_EXPANDED': '一维码(RSS_EXPANDED)',
  'UPC_A': '一维码(UPC_A)',
  'UPC_E': '一维码(UPC_E)',
  // 'UPC_EAN_EXTENSION': '一维码(UPC_EAN_EXTENSION)',
  'WX_CODE': '二维码(WX_CODE)',
  // 'CODE_25': '一维码(CODE_25)'
}

Page({
  data: {
    scanResult: {
      isShow: false,
      type: '',
      text: '',
      msg: '',
    },
  },
  onLoad () {

  },
  onScan () {
    wx.scanCode({
      scanType: ['barCode', 'qrCode', 'wxCode', 'datamatrix', 'pdf417'],
      success: (res) => {
        console.log(res);
        let msg = '';
        if (res.scanType === 'WX_CODE' && res.result === '') {
          msg = '宝宝心里苦，但宝宝不说...'
        }
        this.setData({
          scanResult: {
            isShow: true,
            type: scanType[res.scanType],
            text: res.result,
            msg,
          },
        });

        // 存入Storage
        if (this.data.scanResult.text !== '') {
          wx.getStorage({
            key: 'scanLogs',
            complete: (res) => {
              console.log(res);
              let scanLogs = res.data || [];
              this.data.scanResult.date = Date.now();
              scanLogs.unshift(this.data.scanResult);
              wx.setStorageSync('scanLogs', scanLogs);
            }
          })
        }
      }
    })
  },
  onCopy () {
    // 复制到剪贴板
    wx.setClipboardData({
      data: this.data.scanResult.text,
      success: function(res) {
        wx.showToast({
          title: '复制成功',
        })
      }
    })
  },
})
