package personal.project.jfs.inventory.springboot.model;

import org.springframework.data.repository.CrudRepository;

public interface ProductDBRepository extends CrudRepository<Product,Long> {
    Product findProductByProductId(String productId);

    Boolean existsProductByProductName(String productName);

    Product findProductByProductName(String productName);

    Iterable<Product> findAllByCategoryId(String categoryId);

}
