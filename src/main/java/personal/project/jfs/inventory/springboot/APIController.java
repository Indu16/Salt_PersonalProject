package personal.project.jfs.inventory.springboot;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import personal.project.jfs.inventory.springboot.dto.*;
import personal.project.jfs.inventory.springboot.dto.GetProductDTO;
import personal.project.jfs.inventory.springboot.model.Product;
import personal.project.jfs.inventory.springboot.model.ProductCategory;
import personal.project.jfs.inventory.springboot.model.Stock;

import javax.servlet.http.HttpServletRequest;
import java.net.URI;
import java.util.ArrayList;
import java.util.List;

@RestController
@CrossOrigin
@RequestMapping("/products")
public class APIController {
    @Autowired
    APIService service;

    @PostMapping
    ResponseEntity <Object> createProduct(@RequestBody PostProductDTO newProduct, HttpServletRequest req){
        try {
            Product product = service.createProduct(newProduct);
            URI location = URI.create(req.getServletPath() + "/" + product.getProductId());
            return ResponseEntity.created(location).body(product);
        }catch (IllegalArgumentException e){
            MessageDTO message=new MessageDTO(e.getMessage());
            return ResponseEntity.badRequest().header(HttpHeaders.ACCESS_CONTROL_ALLOW_ORIGIN,"*" ).body(message);
        }

    }

    @PostMapping("/addstock")
    ResponseEntity<Object> addUpdateStock(@RequestBody PostStockDTO newStock){
        try {
            Stock stock = service.createupdateStock(newStock.productId(), newStock.quantity());
            Product product = service.getProduct(stock.getProductId());
            return ResponseEntity.ok().body(service.ProdToDto(product));
        }catch (IllegalArgumentException e){
            MessageDTO message=new MessageDTO(e.getMessage());
            return ResponseEntity.badRequest().body(message);
        }
    }

    @PostMapping("/pickstock")
    ResponseEntity<Object>pickStock(@RequestBody PostStockDTO newStock){
        try {
            Stock stock = service.createupdateStock(newStock.productId(), -newStock.quantity());
            Product product = service.getProduct(stock.getProductId());
            return ResponseEntity.ok().body(service.ProdToDto(product));
        }catch (IllegalArgumentException e)
        {
            MessageDTO message=new MessageDTO(e.getMessage());
            return ResponseEntity.badRequest().body(message);
        }

    }

    @GetMapping
    ResponseEntity<ListProductDTO> listAllProducts(){
        Iterable<Product> products=service.getAllProducts();
        return ResponseEntity.ok().body(new ListProductDTO(products));
    }

    @GetMapping("/category/{categoryId}")
    ResponseEntity<ListProductDTO>listProductsByCategoryId(@PathVariable String categoryId){
        Iterable<Product> products=service.getProductsByCategory(categoryId);
        return ResponseEntity.ok().body(new ListProductDTO(products));
    }

    @GetMapping("/{productId}")
    ResponseEntity <Object> getProduct(@PathVariable String productId){
        return ResponseEntity.ok().body(service.getProduct(productId));
    }

    @GetMapping("/stock")
    ResponseEntity <ListStockDTO> getStock(){
        List<GetProductDTO> products = new ArrayList<>();
        Iterable<Stock> stock=service.getStock();
        stock.forEach((item)->{products.add(service.ProdToDto(service.getProduct(item.getProductId())));});
        return ResponseEntity.ok().body(new ListStockDTO(products));
    }

    @GetMapping("/stock/{categoryId}")
    ResponseEntity<ListStockDTO>getStockByCategory(@PathVariable String categoryId){
        List<GetProductDTO> products = new ArrayList<>();
        service.getStock().forEach((item)->{
            if(service.getProduct(item.getProductId()).getCategoryId().equals(categoryId))
                products.add(service.ProdToDto(service.getProduct(item.getProductId())));
        });
        return ResponseEntity.ok().body(new ListStockDTO(products));
    }

    @GetMapping("/category")
    ResponseEntity<ListCategoryDTO> getCategoryList(){
        List<ProductCategory> categories=new ArrayList<>();
        return ResponseEntity.ok().body(new ListCategoryDTO(service.getCategories()));
    }
}
