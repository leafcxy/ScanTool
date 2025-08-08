//index.js
//获取应用实例
const app = getApp()

import drawQrcode from '../../utils/weapp.qrcode.min.js'

Page({
  data: {
    codeText: '',
    isHidden: true,
    tempFilePath: '',
    typeList: ['二维码(QR_CODE)', 
      '一维码(AZTEC)', 
      '一维码(CODABAR)', 
      '一维码(CODE_39)', 
      '一维码(CODE_93)', 
      '一维码(CODE_128)', 
      '二维码(DATA_MATRIX)', 
      '一维码(EAN_8)', 
      '一维码(EAN_13)', 
      '一维码(ITF)', 
      '二维码(PDF_417)', 
      '一维码(RSS_14)', 
      '一维码(UPC_A)', 
      '一维码(UPC_E)', 
      '二维码(WX_CODE)'],
    selectedIndex: 0
  },
  onLoad() {

  },
  onTypeChange: function(e) {
    console.log('picker发送选择改变,携带值为', e.detail.value)
    this.setData({
      selectedIndex: e.detail.value
    });
  },
  bindInput: function (e) {
    this.setData({
      codeText: e.detail.value,
      isHidden: true,
    })
  },
  onGenerate() {
    if (this.data.codeText === '') {
      return;
    }

    this.setData({
      isHidden: false,
    })

    // drawQrcode({
    //   width: 200,
    //   height: 200,
    //   canvasId: 'qrCode',
    //   typeNumber: -1,
    //   text: this.data.codeText,
    //   callback: (e) => {
    //     console.log(e);
    //     // 绘制成功
    //     if (e.errMsg == 'drawCanvas:ok') {
    //       // 存入Storage
    //       wx.getStorage({
    //         key: 'generateLogs',
    //         complete: (res) => {
    //           let generateLogs = res.data || [];
    //           generateLogs.unshift({
    //             type: '二维码',
    //             text: this.data.codeText,
    //             date: Date.now(),
    //           });
    //           wx.setStorageSync('generateLogs', generateLogs);
    //         }
    //       })

    //       // 保存临时图片
    //       wx.canvasToTempFilePath({
    //         x: 0,
    //         y: 0,
    //         width: 200,
    //         height: 200,
    //         destWidth: 200,
    //         destHeight: 200,
    //         canvasId: 'qrCode',
    //         success: (res) => {
    //           this.setData({
    //             tempFilePath: res.tempFilePath
    //           })
    //         }
    //       })
    //     }
    //   }
    // })


  },
  onSave() {
    wx.saveImageToPhotosAlbum({
      filePath: this.data.tempFilePath,
      success: (res) => {
        wx.showToast({
          title: '已保存到相册',
        })
      },
      fail: (e) => {
        if (e.errMsg == 'saveImageToPhotosAlbum:fail auth deny') {
          wx.openSetting({
            success: (res) => {
              /*
               * res.authSetting = {
               *   "scope.userInfo": true,
               *   "scope.userLocation": true
               * }
               */
            }
          })
        }
      }
    })
  },
})
