package com.example.backend.Repository;

import com.example.backend.Models.UserModel;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.util.List;

@Repository
public class AdminRepository {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<UserModel> findAll() {
        String sql = "SELECT * FROM users";
        return jdbcTemplate.query(sql, userRowMapper);
    }

    private final RowMapper<UserModel> userRowMapper = new RowMapper<UserModel>() {
        @Override
        public UserModel mapRow(ResultSet rs, int rowNum) throws SQLException {
            UserModel user = new UserModel();
            user.setUserId(rs.getInt("userId"));
            user.setUsername(rs.getString("username"));
            user.setPassword(rs.getString("password"));
            user.setRole(rs.getString("role"));
            user.setJoinDate(rs.getDate("joinDate").toLocalDate());
            try {
                byte[] imgData = rs.getBytes("img");
                if (!rs.wasNull()) {
                    user.setImage(imgData);
                }
            } catch (SQLException e) {
                user.setImage(null);
            }
            return user;
        }
    };

    // Fetch user by ID
    public UserModel findById(int id) {
        String sql = "SELECT * FROM users WHERE userId = ?";
        try {
            return jdbcTemplate.queryForObject(sql, userRowMapper, id);
        } catch (Exception e) {
            return null;
        }
    }

    public boolean updateRole(int id, String newRole) {
        String sql = "UPDATE users SET role = ? WHERE userId = ?";
        int rowsAffected = jdbcTemplate.update(sql, newRole, id);
        return rowsAffected > 0;
    }

    public byte[] findImageById(int id) {
        String sql = "SELECT img FROM users WHERE userId = ?";
        try {
            byte[] imageData = jdbcTemplate.queryForObject(sql, 
                (rs, rowNum) -> {
                    byte[] img = rs.getBytes("img");
                    return rs.wasNull() ? null : img;
                }, 
                id
            );
            return imageData;
        } catch (Exception e) {
            return null;
        }
    }

    // Add method to update user image
    public boolean updateUserImage(int id, byte[] image) {
        String sql = "UPDATE users SET img = ? WHERE userId = ?";
        int rowsAffected = jdbcTemplate.update(sql, image, id);
        return rowsAffected > 0;
    }
}