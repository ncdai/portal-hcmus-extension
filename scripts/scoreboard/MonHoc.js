class MonHoc {
  constructor(hocKy, ten, soTinChi, diemTB) {
    this.hocKy = hocKy
    this.ten = ten
    this.soTinChi = soTinChi
    this.diemTB = diemTB
  }

  getTongDiem () {
    return this.diemTB * this.soTinChi
  }

  isQuaMon () {
    return this.diemTB >= 5
  }

  getTongTinChiQua () {
    return this.isQuaMon() ? this.soTinChi : 0
  }
}
