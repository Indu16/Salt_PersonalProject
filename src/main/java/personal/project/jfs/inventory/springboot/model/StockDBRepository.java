package personal.project.jfs.inventory.springboot.model;

import org.springframework.data.repository.CrudRepository;

public interface StockDBRepository extends CrudRepository<Stock,Long> {
    Stock findStockByProductId(String productId);

    Boolean existsByProductId(String productId);

}
