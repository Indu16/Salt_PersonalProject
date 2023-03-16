package personal.project.jfs.inventory.springboot.model;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name="product_table")
public class Product {
    @Id
    @Column(name="product_id",nullable = false)
    private String productId;
    @Column(name="product_name",nullable = false)
    private String productName;

    public Product(String productId, String productName, String description, double price, String categoryId, long minStockLevel) {
        this.productId = productId;
        this.productName = productName;
        this.description = description;
        this.price = price;
        this.categoryId = categoryId;
        this.minStockLevel = minStockLevel;
    }

    @Column(name="description",nullable = true)
    private String description;
    @Column(name="price",nullable = false)
    private double price;
    @Column(name="category_id",nullable = false)
    private String categoryId;
    @Column(name="min_stock_level",nullable = false)
    private long minStockLevel;


    public Product(String productName, String description, double price, String categoryId, long minStockLevel) {
        this.productId = String.valueOf(UUID.randomUUID());
        this.productName = productName;
        this.description = description;
        this.price = price;
        this.categoryId = categoryId;
        this.minStockLevel = minStockLevel;
    }

    public Product() {
    }


    public String getProductId() {
        return productId;
    }

    public void setProductId(String productId) {
        this.productId = productId;
    }


    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }


    public double getPrice() {
        return price;
    }

    public void setPrice(double price) {
        this.price = price;
    }


    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }


    public long getMinStockLevel() {
        return minStockLevel;
    }

    public void setMinStockLevel(long minStockLevel) {
        this.minStockLevel = minStockLevel;
    }

}
