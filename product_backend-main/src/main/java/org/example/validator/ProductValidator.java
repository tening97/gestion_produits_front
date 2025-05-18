package org.example.validator;

import org.example.dto.ProductDto;
import org.example.dto.request.ProductRequest;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;

public class ProductValidator {
    public static List<String> validate(ProductDto dto){
        List<String> errors = new ArrayList<>();
        if(!StringUtils.hasLength(dto.getName())){
            errors.add("Le nom est obligatoire");
        }
        if(dto.getPrice() == null){
            errors.add("Le prix est obligatoire");
        }
        if(dto.getQuantity() == null){
            errors.add("La quantité est obligatoire");
        }
        return errors;
    }

    public static List<String> validate(ProductRequest request){
        List<String> errors = new ArrayList<>();
        if(!StringUtils.hasLength(request.getName())){
            errors.add("Le nom est obligatoire");
        }
        if(request.getPrice() == null){
            errors.add("Le prix est obligatoire");
        }
        if(request.getQuantity() == null){
            errors.add("La quantité est obligatoire");
        }
        return errors;
    }
}