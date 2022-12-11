class ProductService {
  getListProductApi() {
    return axios({
      url: "https://6385f954875ca3273d4c01fb.mockapi.io/api/product",
      method: "GET",
    });
  }
}
export default ProductService;
