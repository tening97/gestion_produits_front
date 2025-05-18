package org.example.service.impl;

import org.example.dto.ProductDto;
import org.example.dto.request.ProductRequest;
import org.example.entity.Product;
import org.example.mapper.ProductMapper;
import org.example.repository.ProductRepository;
import org.example.service.ProductService;
import org.example.service.RessourceService;
import org.example.utils.EntityInvalidException;
import org.example.validator.ProductValidator;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {
    @Autowired
    private ProductRepository productRepository;

    @Autowired
    private RessourceService ressourceService;

    private final ProductMapper productMapper;

    public ProductServiceImpl(ProductMapper productMapper) {
        this.productMapper = productMapper;
    }

    @Override
    public Page<ProductDto> findAll(String search, int page, int size) {
        Pageable pageable = PageRequest.of(page, size);
        Page<Product> p = productRepository.findAllBySearch(search == null ? "" : search.toLowerCase().trim(), pageable);
        return p.map(product -> {
            ProductDto dto = productMapper.toDo(product);
            return dto;
        });
    }

    @Override
    public ProductDto save(ProductRequest request) {
        List<String> errors = ProductValidator.validate(request);
        if(!errors.isEmpty()){
            throw new EntityInvalidException("Ce produit n'est pas valide", errors);
        }
        Product product = productMapper.toEntity(request);
        if(request.getPicture() != null){
            try{
                product.setPicture(ressourceService.uploadFile(request.getPicture()));
            }catch (IOException err){
                throw new RuntimeException(err);
            }
        }
        Product saved = productRepository.save(product);
        return productMapper.toDo(saved);
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
