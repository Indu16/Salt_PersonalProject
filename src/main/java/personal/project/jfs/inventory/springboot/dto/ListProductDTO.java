package personal.project.jfs.inventory.springboot.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import personal.project.jfs.inventory.springboot.model.Product;

public record ListProductDTO(@JsonProperty Iterable<Product> products) {
}
