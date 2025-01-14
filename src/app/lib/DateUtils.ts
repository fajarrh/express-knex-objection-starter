export default class DateUtils {
  public current = new Date();
  public h: number;
  public i: number;
  public s: number;
  public d: number;
  public m: number;
  public y: number;
  public ld: number;
  public _tc: number;

  static tz(tz) {
    const cr = new this();
    cr.current.setUTCHours(cr.current.getUTCHours() + Number(tz));
    return cr;
  }

  static parseTo(type, val, to) {
    if (type === "DAY" && to === "HOUR") {
      return val * 24;
    }
    return val;
  }

  getDate() {
    this.d = this.current.getUTCDate();
    this.m = this.current.getUTCMonth() + 1;
    this.y = this.current.getUTCFullYear();
    return this;
  }

  getDateFormat() {
    const _d = String(this.d).padStart(2, "0");
    const _m = String(this.m).padStart(2, "0");
    return `${this.y}-${_m}-${_d}`;
  }

  getLastDate() {
    const date = new Date(
      this.current.getUTCFullYear(),
      this.current.getUTCMonth() + 1,
      0
    );

    this.ld = date.getDate();
    return `${date.getUTCFullYear()}-${date.getUTCMonth() + 1}-${String(
      date.getUTCDate()
    ).padStart(2, "0")}`;
  }

  getTime() {
    this.h = this.current.getUTCHours();
    this.i = this.current.getUTCMinutes();
    this.s = this.current.getUTCSeconds();
    return this;
  }

  getTimeFormat() {
    const _h = String(this.h).padStart(2, "0");
    const _i = String(this.i).padStart(2, "0");
    const _s = String(this.s).padStart(2, "0");
    return `${_h}:${_i}:${_s}`;
  }

  getYear() {
    return this.current.getUTCFullYear();
  }

  getMonth() {
    return this.current.getUTCMonth() + 1;
  }

  addHours(number) {
    this.current.setUTCHours(this.current.getUTCHours() + number);
    return this;
  }

  addDate(number) {
    this.current.setUTCDate(this.current.getUTCDate() + number);
    return this;
  }

  setTimeFormat(v) {
    const [a, b, c] = v.split(":");
    this.current.setUTCHours(a);
    this.current.setUTCMinutes(b);
    this.current.setUTCSeconds(c);
    return this;
  }

  date() {
    return this.current;
  }
}
