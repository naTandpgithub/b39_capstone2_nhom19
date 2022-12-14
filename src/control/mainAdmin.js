import Product from "../models/product.js";
import ProductService from "../services/service.js";
import Validation from "./../validation/validation.js";

const productService = new ProductService();
const validation = new Validation();
function resetForm() {
  getEle("formData").reset();
}
window.resetForm = resetForm;

const getEle = (id) => document.getElementById(id);
/// render
const renderHTML = (data) => {
  if (data && data.length > 0) {
    const result = data.reduce((content, item) => {
      return (content += `
              <tr>
                <td>${item.id}</td>
                <td>${item.name}</td>
                <td>${item.price}</td>
                <td> <img src="${
                  item.img
                }" alt=""  style="width: 50px" />   </td>
                <td>${item.type === "1" ? "SamSung" : "IPhone"}</td>
                <td>${item.desc}</td>
                 <td>
                    <button class="btn btn-danger"  onclick="deleteSP(${
                      item.id
                    })"  >
                    Xóa 
                    </button>

                    
                    <button class="btn btn-warning"  data-toggle="modal"
                    data-target="#myModal"   onclick="editSP(${item.id})"   >
                    Sửa 
                    </button>

                 
                 
                 </td>      
              
              
              </tr>
            
            
            `);
    }, "");
    getEle("tblDanhSachSP").innerHTML = result;
    return;
  }
  getEle("tblDanhSachSP").innerHTML = "";
};
///Get list
const getListProduct = () => {
  productService
    .getListProductApi()
    .then((rs) => {
      if (rs.statusText === "OK") {
        // console.log(rs);
        renderHTML(rs.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

getListProduct();

/// Delete SP
function deleteSP(id) {
  productService
    .deleteProductApi(id)
    .then(() => {
      getListProduct();
    })
    .catch((err) => {
      console.log(err);
    });
}

window.deleteSP = deleteSP;

//chỉnh sửa nút thêm sp
getEle("btnThemSP").addEventListener("click", () => {
  resetForm();
  document.getElementsByClassName("modal-title")[0].innerHTML = "Thêm Sản Phẩm";
  let buttonAdd = `
    <button class="btn btn-success" onclick="addSP()"  >
    Thêm vào
    </button>
  `;
  document.getElementsByClassName("modal-footer")[0].innerHTML = buttonAdd;
});

// Lấy thông tin Sản9 phẩm
function addSP() {
  const ten = getEle("tenSP").value;
  const gia = getEle("gia").value;
  const hinhAnh = getEle("hinhAnh").value;
  const loai = getEle("loaiSP").value;
  const mota = getEle("moTa").value;

  // Check validation
  let isValid = true;
  /////tên
  isValid &= validation.kiemTraRong(
    ten,
    "errorTen",
    "Vui lòng nhập tên Sản Phẩm"
  );
  //////giá
  isValid &=
    validation.kiemTraRong(gia, "errorGia", "Vui lòng nhập giá Sản Phẩm") &&
    validation.kiemtraSo(gia, "errorGia", "Vui lòng nhập giá Sản Phẩm bằng số");
  /////Hình ảnh
  isValid &= validation.kiemTraRong(
    hinhAnh,
    "errorHinhAnh",
    "Vui lòng nhập hình Sản Phẩm"
  );

  ///Loại
  isValid &= validation.kiemTraChon(
    loai,
    "errorLoai",
    "Vui lòng chọn hãng Sản Phẩm"
  );

  /////mô tả
  isValid &= validation.kiemTraRong(
    hinhAnh,
    "errorMota",
    "Vui lòng nhập mô tả Sản Phẩm"
  );

  if (!isValid) return;

  const product = new Product(ten, gia, "", "", "", hinhAnh, mota, loai);
  console.log(product);

  ///add product len server
  productService
    .addProductApi(product)
    .then((rs) => {
      getListProduct();
      document.getElementsByClassName("close")[0].click();
    })
    .catch((err) => {
      console.log(err);
    });
}

window.addSP = addSP;

///Edit sản phẩm
function editSP(id) {
  document.getElementsByClassName("modal-title")[0].innerHTML =
    "Chỉnh sửa Sản Phẩm";
  let button = `
    <button class="btn btn-success" onclick="updateSP(${id})" > Update </button>
  `;
  document.getElementsByClassName("modal-footer")[0].innerHTML = button;
  console.log("run here");

  productService
    .getProductById(id)
    .then((rs) => {
      console.log(rs.data);
      let product = rs.data;
      getEle("tenSP").value = product.name;
      getEle("gia").value = product.price;
      getEle("hinhAnh").value = product.img;
      getEle("loaiSP").value = product.type;
      getEle("moTa").value = product.desc;
    })
    .catch((err) => {
      console.log(err);
    });
}

window.editSP = editSP;

function updateSP(id) {
  console.log(id);
  const ten = getEle("tenSP").value;
  const gia = getEle("gia").value;
  const hinhAnh = getEle("hinhAnh").value;
  const loai = getEle("loaiSP").value;
  const moTa = getEle("moTa").value;

  const product = new Product(ten, gia, "", "", "", hinhAnh, moTa, loai);
  console.log(product);
  productService
    .updateProductApi(product, id)

    .then(() => {
      getListProduct();
      document.getElementsByClassName("close")[0].click();
    })
    .catch((err) => {
      console.log(err);
    });
}

window.updateSP = updateSP;
