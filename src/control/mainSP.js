import Product from "../models/product.js";
import ProductService from "../services/service.js";

const productService = new ProductService();

const getEle = (id) => document.getElementById(id);
/// render
const renderHTML = (data) => {
  if (data && data.length > 0) {
    const result = data.reduce((content, item) => {
      return (content += `
               
      <div  class="col-12 col-lg-6 col-md-12 mt-3">
      <div   class="d-flex m-3  ">
                    <div>
                    <img src="${
                      item.img
                    }" alt=""   class="img-fluid"   style="width: 300px"/>
                    </div>
                    <div>
                        <p>Tên Sản Phẩm
                        ${item.name}</p>
                        <p>${item.backCamera}</p>
                        <p>${item.frontCamera}</p>
                        <p>${item.screen}</p>
                        <p>${item.type === "1" ? "SamSung" : "IPhone"}</p>
                        <p>${item.price}</p>

                    </div>
                           
                </div>
            </div>
            
            `);
    }, "");
    getEle("product__content").innerHTML = result;
    return;
  }
  getEle("product__content").innerHTML = "";
};
///Get list
const getListProduct = () => {
  productService
    .getListProductApi()
    .then((rs) => {
      if (rs.statusText === "OK") {
        console.log(rs);
        renderHTML(rs.data);
      }
    })
    .catch((err) => {
      console.log(err);
    });
};

getListProduct();

getEle("filter").addEventListener("change", () => {
  const option = getEle("filter").value;
  console.log(option);
  productService
    .getListProductApi()
    .then((rs) => {
      const data = rs.data;
      console.log(data);

      const listFilter = data.filter((sp) => {
        console.log(sp.type);
        return sp.type === option;
      });
      console.log(listFilter);
    })
    .catch((err) => {
      console.log(err);
    });
});
