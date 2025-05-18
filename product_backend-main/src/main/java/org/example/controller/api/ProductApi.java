package org.example.controller.api;

import org.example.dto.ProductDto;
import org.example.dto.request.ProductRequest;
import org.springframework.data.domain.Page;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;

import static org.example.utils.Constants.APP_ROOT;

@RequestMapping(APP_ROOT + "/products")
public interface ProductApi {
    @GetMapping
    Page<ProductDto> findAll(@RequestParam(defaultValue="") String search, @RequestParam(defaultValue = "0") int page, @RequestParam(defaultValue = "10") int size);

    @PostMapping(value = "create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE)
    ProductDto save(@ModelAttribute ProductRequest request);

    @PutMapping("/{id}")
    ProductDto update(
            @PathVariable Long id,
            @RequestBody ProductDto dto
    );

    @GetMapping("/{id}")
    ProductDto findById(@PathVariable Long id);

    @PutMapping("archived/{id}")
    ProductDto  archiveProduct(@PathVariable Long id);
}
