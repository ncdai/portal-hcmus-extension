class TinhDiem {
  constructor(querySelector = 'table#tbDiemThiGK > tbody > tr', danhSachMonKhongTinhDiem) {
    this.danhSachMonKhongTinhDiem = danhSachMonKhongTinhDiem || [
      'anh văn',
      'thể dục',
      'nhập môn đầu khóa'
    ]
    this.querySelector = querySelector
    this.selectorNamHocHocKy = 'td:nth-child(1)'
    this.selectorMonHoc = 'td:nth-child(2)'
    this.selectorSoTinChi = 'td:nth-child(3)'
    this.selectorDiemTB = 'td:nth-child(6)'
    this.danhSachHocKy = []
    this.soLanCanhCao = 0
    this.elements = document.querySelectorAll(this.querySelector)
    this.main()
  }

  getTrHTMLHocKy (hk, prevHk) {
    let isCanhCao = false
    let liDoCanhCao = null

    let isBuocThoiHoc = false

    if (prevHk !== null) {
      if (hk.getDiemTB() < 3.0) {
        isCanhCao = true
        liDoCanhCao = `TB(${hk.getTen()}) < 3.0`
      } else if ((prevHk.getDiemTB() + hk.getDiemTB()) / 2 < 4.0) {
        isCanhCao = true
        liDoCanhCao = `TB(${prevHk.getTen()} + ${hk.getTen()}) < 4.0`
      }
    }

    this.soLanCanhCao += isCanhCao ? 1 : -this.soLanCanhCao

    if (this.soLanCanhCao >= 3) {
      isBuocThoiHoc = true
    }

    const xuLyHocVuTd = isBuocThoiHoc
      ? `<td class="center">Buộc thôi học!</td>`
      : (
        isCanhCao
        ? `<td class="center"><span style="display: block; font-weight: bold; color: red; margin-bottom: 4px;">Cảnh cáo!</span><span style="display: block;">${liDoCanhCao}</span></td>`
        : `<td></td>`
      )

    const p = (`
      <tr>
        <td class="center">${hk.getTen()}</td>
        <td class="center">${hk.getTongMonDangKy()}</td>
        <td class="center">${hk.getTongMonQua()}</td>
        <td class="center">${hk.getTongTinChiDangKy()}</td>
        <td class="center">${hk.getTongTinChiQua()}</td>
        <td class="center">${hk.getDiemTB()}</td>
        ${xuLyHocVuTd}
      </tr>
    `)
    return p
  }

  getHocKy (index) {
    if (index < 0) return null
    if (index > this.danhSachHocKy.length - 1) return null

    const hocKy = this.danhSachHocKy[index]
    return new HocKy(hocKy.hocKy, hocKy.danhSachMonHoc)
  }

  renderKetQua () {
    const el = $('#tbDiemThiGK_wrapper')
    let tbodyHTML = ''
    for (let i = 0; i < this.danhSachHocKy.length; ++i) {
      const prevHk = this.getHocKy(i - 1)
      const hk = this.getHocKy(i)

      tbodyHTML += this.getTrHTMLHocKy(hk, prevHk)
    }
    const HTML = `
      <table class="dataTable" style="border-top: 1px solid #ccc; border-bottom: 1px solid #ccc;">
        <thead>
          <tr role="row">
            <th class="ui-state-default center">Học kì</th>
            <th class="ui-state-default center">Số môn ĐK</th>
            <th class="ui-state-default center">Số môn qua</th>
            <th class="ui-state-default center">Số tín chỉ ĐK</th>
            <th class="ui-state-default center">Số tín chỉ qua</th>
            <th class="ui-state-default center">Điểm TB</th>
            <th class="ui-state-default center" style="width: 229px;">Xử lí học vụ</th>
          </tr>
        </thead>
        <tbody>
          ${tbodyHTML}
        </tbody>
      </table>
    `
    el.append(HTML)
  }

  isMonTinhDiem (tenMon = '') {
    if (!tenMon) return false
    const monHoc = tenMon.toLowerCase()
    for (let i = 0; i < this.danhSachMonKhongTinhDiem.length; ++i) {
      if (monHoc.includes(this.danhSachMonKhongTinhDiem[i].toLowerCase())) return false
    }
    return true
  }

  getValue (element, selector) {
    const el = element.querySelector(selector)
    if (el) return el.textContent.trim()
    return ''
  }

  computedDanhSachHocKy () {
    let danhSachHocKy = {}

    for (let i = 0; i < this.elements.length; ++i) {
      const row = this.elements[i]

      const hocKy = this.getValue(row, this.selectorNamHocHocKy)
      const monHoc = this.getValue(row, this.selectorMonHoc)
      const soTinChi = parseInt(this.getValue(row, this.selectorSoTinChi))
      const diemTB = parseFloat(this.getValue(row, this.selectorDiemTB))

      if (this.isMonTinhDiem(monHoc)) {
        const danhSachMon = danhSachHocKy[hocKy] || []
        danhSachHocKy[hocKy] = [
          ...danhSachMon,
          new MonHoc(
            hocKy,
            monHoc,
            soTinChi,
            diemTB
          )
        ]
      }
    }

    const danhSachKeyHocKy = Object.keys(danhSachHocKy)
    let danhSachHocKyArr = []

    for (let i = 0; i < danhSachKeyHocKy.length; ++i) {
      const key = danhSachKeyHocKy[i]
      const danhSachMonHoc = danhSachHocKy[key]
      danhSachHocKyArr = [
        ...danhSachHocKyArr,
        {
          hocKy: key,
          danhSachMonHoc
        }
      ]
    }

    this.danhSachHocKy = danhSachHocKyArr
  }

  main () {
    this.computedDanhSachHocKy()
    this.renderKetQua()
  }
}
