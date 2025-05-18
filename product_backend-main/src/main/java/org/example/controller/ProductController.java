package org.example.controller;

import org.example.controller.api.ProductApi;
import org.example.dto.ProductDto;
import org.example.dto.request.ProductRequest;
import org.example.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ProductController implements ProductApi {
    @Autowired
    private ProductService productService;

    @Override
    public Page<ProductDto> findAll(String search,int page, int size) {
        return productService.findAll(search, page,size);
    }

    @Override
    public ProductDto save(ProductRequest request) {
        return productService.save(request);
    }

    @Override
    public ProductDto update(Long id, ProductDto dto) {
        return null;
    }

    @Override
    public ProductDto findById(Long id) {
        return null;
    }

    @Override
    public ProductDto archiveProduct(Long id) {
        return null;
    }
}
