/*
 * Module name:  ws_ui_inexus
 * Copyright (C) 2025 北京普析通用仪器有限责任公司 All Rights Reserved.
 * 此源代码仅限在公司内部使用。未经公司事先书面许可，任何单位和个人不得以任何方式复制、传播本代码的任何部分。
 * Description:
 */

;(function flexible(window, document) {
  const docEl = document.documentElement
  const designWidth = 1920
  const baseFontSize = 16

  function setRemUnit() {
    // 按比例计算 rem 基准值
    let rem = docEl.clientWidth / (designWidth / baseFontSize)
    // 限制合理范围
    rem = Math.max(12, Math.min(24, rem))
    docEl.style.fontSize = rem + 'px'
    // 特殊处理 vxe-pager
    // 动态设置 vxe-ui 的字体大小 CSS 变量
    docEl.style.setProperty('--vxe-ui-font-size-default', rem * 0.775 + 'px')
    docEl.style.setProperty('--vxe-ui-input-height-default', rem * 1.5 + 'px')
    docEl.style.setProperty('--vxe-ui-table-row-height-default', rem * 2 + 'px')
  }

  setRemUnit()

  // 监听变化
  window.addEventListener('resize', setRemUnit)
  window.addEventListener('pageshow', function (e) {
    if (e.persisted) {
      setRemUnit()
    }
  })
})(window, document)
