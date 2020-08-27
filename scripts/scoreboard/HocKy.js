class HocKy {
  constructor(ten, danhSachMon = []) {
    this.ten = ten
    this.danhSachMon = danhSachMon
  }

  getTen () {
    return this.ten
  }

  getTongTinChiDangKy () {
    return this.danhSachMon.reduce((prev, current) => prev + current.soTinChi, 0)
  }

  getTongMonDangKy () {
    return this.danhSachMon.length
  }

  getTongDiem () {
    return this.danhSachMon.reduce((prev, current) => prev + current.getTongDiem(), 0)
  }

  getTongMonQua () {
    return this.danhSachMon.reduce((prev, current) => prev + current.isQuaMon(), 0)
  }

  getTongTinChiQua () {
    return this.danhSachMon.reduce((prev, current) => prev + current.getTongTinChiQua(), 0)
  }

  getDiemTB (decimals = 2) {
    const diemTB = this.getTongDiem() / this.getTongTinChiDangKy()
    return parseFloat(diemTB.toFixed(decimals))
  }
}
