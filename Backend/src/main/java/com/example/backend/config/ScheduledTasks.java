package com.example.backend.config;

import com.example.backend.service.AdminService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

@Component
public class ScheduledTasks {

    @Autowired
    private AdminService adminService;

    // Run every minute
    @Scheduled(fixedRate = 60000)
    public void updateCharacterUsageCounts() {
        adminService.updateCharacterUsageCounts();
    }
} 