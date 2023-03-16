package personal.project.jfs.inventory.springboot.model;

import org.springframework.stereotype.Repository;

@Repository
public class StockRepository {

    private StockDBRepository stockDBRepository;

    public StockRepository(StockDBRepository stockDBRepository) {
        this.stockDBRepository = stockDBRepository;
    }

    public boolean checkProductInStock(String productId){
        return stockDBRepository.existsByProductId(productId);
    }

    public Stock getStockByProdId(String productId){
        return stockDBRepository.findStockByProductId(productId);
    }

    public Stock saveStock(Stock stock) {
        return stockDBRepository.save(stock);
    }

    public void deleteStock(Stock stock) {
        stockDBRepository.delete(stock);
    }

    public Iterable<Stock> getAllStock() {
        return stockDBRepository.findAll();
    }
}
