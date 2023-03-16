package personal.project.jfs.inventory.springboot.dto;

import com.fasterxml.jackson.annotation.JsonProperty;

public record MessageDTO(@JsonProperty String errorMessage){
}
