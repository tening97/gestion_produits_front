package org.example.mapper;

import org.example.dto.ProductDto;
import org.example.dto.request.ProductRequest;
import org.example.entity.Product;
import org.mapstruct.Mapper;

@Mapper(componentModel = "spring")
public interface ProductMapper {
    ProductDto toDo(Product product);

    Product toEntity(ProductDto dto);

    Product toEntity(ProductRequest request);
}
