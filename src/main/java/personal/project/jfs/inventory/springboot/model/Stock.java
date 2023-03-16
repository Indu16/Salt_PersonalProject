package personal.project.jfs.inventory.springboot.model;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name="stock_table")
public class Stock {
    @Id
    @Column(name="stock_id",nullable = false)
    private String stockId;
    @Column(name="product_id",nullable = false)
    private String productId;
    @Column(name="quantity")
    private long quantity;

    public Stock() {
    }

    public Stock(String productId, long quantity) {
        this.stockId = String.valueOf(UUID.randomUUID());
        this.productId = productId;
        this.quantity = quantity;
    }

    public String getStockId() {
        return stockId;
    }

    public void setStockId(String stockId) {
        this.stockId = stockId;
    }


    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }


    public long getQuantity() {
        return quantity;
    }

    public void setQuantity(long quantity) {
        this.quantity = quantity;
    }
}
