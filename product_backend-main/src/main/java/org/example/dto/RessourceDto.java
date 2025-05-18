package org.example.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.example.entity.Ressource;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class RessourceDto {
    private Long id;
    private String type;
    private String nom;
    private byte[] fichier;

    public static RessourceDto fromEntity(Ressource ressource){
        return (ressource == null ) ? null : new RessourceDto(
                ressource.getId(),
                ressource.getType(),
                ressource.getNom(),
                ressource.getFichier()
        );
    }

    public static Ressource toEntity(RessourceDto dto){
        if (dto == null ){
            return null;
        }
        Ressource ressource = new Ressource();
        ressource.setId(dto.getId());
        ressource.setNom(dto.getNom());
        ressource.setType(dto.getType());
        ressource.setFichier(dto.getFichier());

        return ressource;
    }
}
