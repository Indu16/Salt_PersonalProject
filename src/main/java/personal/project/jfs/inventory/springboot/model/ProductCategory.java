package personal.project.jfs.inventory.springboot.model;

import javax.persistence.*;
import java.util.UUID;

@Entity
@Table(name="category_table")
public class ProductCategory {
    @Id
    @Column(name="category_id")
    private String categoryId;
    @Column(name="category")
    private String category;
    @Column(name="description")
    private String description;

    public ProductCategory() {
    }

    public ProductCategory(String category, String description) {
        this.categoryId = String.valueOf(UUID.randomUUID());
        this.category = category;
        this.description = description;
    }

    public String getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(String categoryId) {
        this.categoryId = categoryId;
    }


    public String getCategory() {
        return category;
    }

    public void setCategory(String category) {
        this.category = category;
    }


    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
