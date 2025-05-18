package org.example.service;

import org.example.dto.ProductDto;
import org.example.dto.request.ProductRequest;
import org.springframework.data.domain.Page;

public interface ProductService {
    public Page<ProductDto> findAll(String search, int page, int size);
    public ProductDto save(ProductRequest request);
    public ProductDto update(Long id, ProductDto dto);
    public ProductDto findById(Long id);
    public ProductDto archiveProduct(Long id);
}
