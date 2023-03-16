package personal.project.jfs.inventory.springboot.model;

import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class ProductCategoryRepositoy {
    private ProductCategoryDBRepository productCategoryDBRepository;

    public ProductCategoryRepositoy(ProductCategoryDBRepository productCategoryDBRepository) {
        this.productCategoryDBRepository = productCategoryDBRepository;
    }

    public List<ProductCategory> getCategories() {
        return (List<ProductCategory>) productCategoryDBRepository.findAll();
    }
}
