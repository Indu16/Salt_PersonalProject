package personal.project.jfs.inventory.springboot.model;

import org.springframework.stereotype.Repository;

@Repository
public class ProductRepository {
    private ProductDBRepository productDBRepository;

    public ProductRepository(ProductDBRepository productDBRepository) {
        this.productDBRepository = productDBRepository;
    }

    public Product StoreProduct(Product newProduct) {
        return (Product) productDBRepository.save(newProduct);
    }

    public Product getProduct(String productId) {
        return productDBRepository.findProductByProductId(productId);
    }

    public boolean checkProductExistsByName(String productName) {
       return productDBRepository.existsProductByProductName(productName);
    }

    public Product getProductByName(String productName) {
        return productDBRepository.findProductByProductName(productName);
    }

    public Iterable<Product> getAllProducts() {
        return productDBRepository.findAll();
    }

    public Iterable<Product> getProductsByCategory(String categoryId) {
        return productDBRepository.findAllByCategoryId(categoryId);
    }
}
