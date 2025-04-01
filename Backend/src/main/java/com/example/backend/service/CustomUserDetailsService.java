package com.example.backend.service;

import com.example.backend.models.User;
import com.example.backend.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.*;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
public class CustomUserDetailsService implements UserDetailsService {

    @Autowired
    private UserRepository userRepository;

    // Override the method to load user by username
    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        // Retrieve user from the database using the repository
        Optional<User> optionalUser = userRepository.findByUsername(username);

        // If the user is not found, throw an exception
        if (!optionalUser.isPresent()) {
            throw new UsernameNotFoundException("User Not Found with username: " + username);
        }

        // Get the user from the Optional object
        User user = optionalUser.get();

        // Map the roles (String) to SimpleGrantedAuthority and return the UserDetails object
        List<SimpleGrantedAuthority> authorities = user.getRoles().stream()
                .map(SimpleGrantedAuthority::new)  // Directly pass the role string as the authority
                .collect(Collectors.toList());

        // Return a Spring Security User object with username, password, and authorities
        return new org.springframework.security.core.userdetails.User(
                user.getUsername(),
                user.getPassword(),
                authorities  // Assign the roles as authorities
        );
    }
}
