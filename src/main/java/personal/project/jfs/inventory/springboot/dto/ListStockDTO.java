package personal.project.jfs.inventory.springboot.dto;

import com.fasterxml.jackson.annotation.JsonProperty;
import personal.project.jfs.inventory.springboot.dto.GetProductDTO;
import personal.project.jfs.inventory.springboot.model.Product;

import java.util.List;

public record ListStockDTO (@JsonProperty List<GetProductDTO> stock){
}
