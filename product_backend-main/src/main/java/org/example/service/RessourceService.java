package org.example.service;

import org.example.entity.Ressource;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
public interface RessourceService {
    Ressource uploadFile(MultipartFile file) throws IOException;
}
