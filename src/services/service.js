class ProductService {
  getListProductApi() {
    return axios({
      url: "https://6385f954875ca3273d4c01fb.mockapi.io/api/product",
      method: "GET",
    });
  }

  deleteProductApi(id) {
    return axios({
      url: `https://6385f954875ca3273d4c01fb.mockapi.io/api/product/${id}`,
      method: "DELETE",
    });
  }

  addProductApi(data) {
    return axios({
      url: "https://6385f954875ca3273d4c01fb.mockapi.io/api/product",
      method: "POST",
      data: data,
    });
  }

  getProductById(id) {
    console.log("run api");

    // return axios({
    //   url: `https://6385f954875ca3273d4c01fb.mockapi.io/api/Food/${id}`,
    //   method: "GET",

    return axios({
      url: `https://6385f954875ca3273d4c01fb.mockapi.io/api/product/${id}`,
      method: "GET",
    });
  }

  updateProductApi(data, id) {
    console.log(data);
    console.log(id);
    return axios({
      url: `https://6385f954875ca3273d4c01fb.mockapi.io/api/product/${id}`,
      method: "PUT",
      data: data,
    });
  }
}

export default ProductService;
