package personal.project.jfs.inventory.springboot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import personal.project.jfs.inventory.springboot.dto.GetProductDTO;
import personal.project.jfs.inventory.springboot.dto.PostProductDTO;
import personal.project.jfs.inventory.springboot.model.*;

import java.util.List;


@Service
public class APIService {
    @Autowired
    ProductRepository prodRepo;

    @Autowired
    ProductCategoryRepositoy catRepo;
    @Autowired
    StockRepository stockRepo;

    public Product createProduct(PostProductDTO newProduct) {
        if(prodRepo.checkProductExistsByName(newProduct.productName())) {
            Product product =prodRepo.getProductByName(newProduct.productName());
            product.setProductName(newProduct.productName());
            product.setDescription(newProduct.description());
            product.setPrice(newProduct.price());
            product.setCategoryId(newProduct.category());
            product.setMinStockLevel(newProduct.minStockLevel());
            return prodRepo.StoreProduct(product);
        }
        return prodRepo.StoreProduct(DTOtoProduct(newProduct));
    }

    private Product DTOtoProduct(PostProductDTO newProduct){
        return new Product(newProduct.productName(),newProduct.description(),newProduct.price(),newProduct.category(),newProduct.minStockLevel());
    }

    public Product getProduct(String productId) {
        return prodRepo.getProduct(productId);
    }

    public GetProductDTO ProdToDto(Product product) {
        Stock stock=stockRepo.getStockByProdId(product.getProductId());
        int quantity;
        if(stock!=null)
            quantity= (int) stock.getQuantity();
        else
            quantity=0;

        return new GetProductDTO(product.getProductName(), product.getDescription(), product.getPrice(), product.getCategoryId(), (int) product.getMinStockLevel(), quantity);
    }

    public Stock createupdateStock(String productId, Integer quantity) {
        int newQuantity;
        if(stockRepo.checkProductInStock(productId)) {
            Stock stock = stockRepo.getStockByProdId(productId);
            newQuantity = (int) (stock.getQuantity() + quantity);
            if (newQuantity < 0)
                throw new IllegalArgumentException("Not enough stock!!. Available stock:" + stock.getQuantity());
            if (newQuantity == 0){
                stockRepo.deleteStock(stock);
                stock.setQuantity(0);
                return (stock);
            }
            else
                stock.setQuantity(newQuantity);
            return stockRepo.saveStock(stock);
        }
        else{
            if(quantity>0)
                return stockRepo.saveStock(new Stock(productId,quantity));
            else
                throw new IllegalArgumentException ("No Stock available");
        }

    }

    public Iterable<Product> getAllProducts() {
        return prodRepo.getAllProducts();
    }

    public Iterable<Product> getProductsByCategory(String categoryId) {
        return prodRepo.getProductsByCategory(categoryId);

    }

    public Iterable<Stock> getStock() {
        return stockRepo.getAllStock();
    }

    public List<ProductCategory> getCategories() {
        return catRepo.getCategories();
    }
}

