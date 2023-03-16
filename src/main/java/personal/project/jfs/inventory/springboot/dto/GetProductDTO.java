package personal.project.jfs.inventory.springboot.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record GetProductDTO(@JsonProperty String productName, @JsonProperty String description, @JsonProperty Double price, @JsonProperty String category, @JsonProperty Integer minStockLevel, @JsonProperty Integer currentStock) {
}

