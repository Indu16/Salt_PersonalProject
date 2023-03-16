package personal.project.jfs.inventory.springboot.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record PostStockDTO(@JsonProperty String productId,@JsonProperty Integer quantity) {
}
