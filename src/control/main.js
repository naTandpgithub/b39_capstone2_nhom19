import Product from "../models/product.js";
import ProductService from "../services/service.js";

const productService = new ProductService();

const getEle = (id) => document.getElementById(id);

const renderHTML = (data) => {
  if (data && data.length > 0) {
    const result = data.reduce((content, item) => {
      return (content += `
                <div   class="d-flex m-3  ">
                    <div>
                    <img src="${item.img}" alt=""   class="img-fluid"   style="width: 300px"/>
                    </div>
                    <div>
                        <p>${item.name}</p>
                        <p>${item.backCamera}</p>
                        <p>${item.frontCamera}</p>
                        <p>${item.screen}</p>
                        <p>${item.type}</p>
                        <p>${item.price}</p>

                    </div>
                           
                </div>
            
            
            `);
    }, "");
    getEle("product").innerHTML = result;
    return;
  }
  getEle("product").innerHTML = "";
};

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
