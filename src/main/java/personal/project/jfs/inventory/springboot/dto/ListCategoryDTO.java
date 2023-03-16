package personal.project.jfs.inventory.springboot.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import personal.project.jfs.inventory.springboot.model.ProductCategory;

import java.util.List;

public record ListCategoryDTO(List<ProductCategory> productCategories) {
}
