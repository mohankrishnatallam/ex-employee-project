package com.example.exemployee.repository;

import com.example.exemployee.entity.UserEntity;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends MongoRepository<UserEntity, String> {
    Optional<UserEntity> findByEmail(String email);
    List<UserEntity> findAllByEmail(String email);
    Optional<UserEntity> findByEmpIdArgano(String empIdArgano);
}
