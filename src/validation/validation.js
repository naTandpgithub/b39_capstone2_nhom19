const getEle = (id) => document.getElementById(id);

export default function Validation() {
  this.kiemTraRong = (value, errId, mess) => {
    if (value === "") {
      getEle(errId).innerHTML = mess;
      getEle(errId).style.display = "block";
      return false;
    }
    getEle(errId).innerHTML = "";
    getEle(errId).style.display = "none";
    return true;
  };
  this.kiemTraChon = (value, errId, mess) => {
    if (value === "") {
      getEle(errId).innerHTML = mess;
      getEle(errId).style.display = "block";
      return false;
    }
    getEle(errId).innerHTML = "";
    getEle(errId).style.display = "none";
    return true;
  };

  this.kiemtraSo = (value, errId, mess) => {
    const letter = /^[0-9]+$/;
    if (value.match(letter)) {
      getEle(errId).innerHTML = "";
      getEle(errId).style.display = "none";
      return true;
    }
    getEle(errId).innerHTML = mess;
    getEle(errId).style.display = "block";
    return false;
  };
}
