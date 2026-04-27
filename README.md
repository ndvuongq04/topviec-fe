package com.topviec.topviec_be.controller;

import com.topviec.topviec_be.dto.request.ReqAdjustViolationScoreDTO;
import com.topviec.topviec_be.dto.request.ReqResetViolationScoreDTO;
import com.topviec.topviec_be.dto.response.ResAppealDTO;
import com.topviec.topviec_be.dto.response.ResViolationScoreDTO;
import com.topviec.topviec_be.enums.adminUsers.AdminRoleConstants;
import com.topviec.topviec_be.service.AppealService;
import com.topviec.topviec_be.service.ViolationScoreService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PatchMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

/**
 * Admin quản lý điểm vi phạm của NTD.
 * Base URL: /admin/employers/{employerId}/violation-score
 */
@RestController
@RequestMapping("/admin/employers")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminViolationScoreController {

    private final ViolationScoreService violationScoreService;
    private final AppealService appealService;

    /**
     * GET /admin/employers/{employerId}/violation-score
     * Xem tổng điểm vi phạm hiện tại và lịch sử vi phạm của NTD.
     */
    @GetMapping("/{employerId}/violation-score")
    @PreAuthorize("@adminSecurity.hasAnyRole(authentication, '"
            + AdminRoleConstants.SUPER_ADMIN + "', '"
            + AdminRoleConstants.CONTENT_MODERATOR + "', '"
            + AdminRoleConstants.SUPPORT_ADMIN + "')")
    public ResponseEntity<ResViolationScoreDTO> getScore(@PathVariable Long employerId) {
        return ResponseEntity.ok(violationScoreService.getScore(employerId));
    }

    /**
     * POST /admin/employers/{employerId}/violation-score/reset
     * Reset điểm về 0.
     * Điều kiện: NTD không tái phạm nhóm B trong vòng 6 tháng gần nhất.
     */
    @PostMapping("/{employerId}/violation-score/reset")
    @PreAuthorize("@adminSecurity.hasAnyRole(authentication, '"
            + AdminRoleConstants.SUPER_ADMIN + "', '"
            + AdminRoleConstants.CONTENT_MODERATOR + "')")
    public ResponseEntity<ResViolationScoreDTO> resetScore(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long employerId,
            @Valid @RequestBody ReqResetViolationScoreDTO request) {

        return ResponseEntity.ok(violationScoreService.resetScore(extractUserId(jwt), employerId, request));
    }

    /**
     * PATCH /admin/employers/{employerId}/violation-score/adjust
     * Giảm điểm vi phạm thủ công khi NTD chủ động khắc phục hậu quả.
     */
    @PatchMapping("/{employerId}/violation-score/adjust")
    @PreAuthorize("@adminSecurity.hasAnyRole(authentication, '"
            + AdminRoleConstants.SUPER_ADMIN + "', '"
            + AdminRoleConstants.CONTENT_MODERATOR + "')")
    public ResponseEntity<ResViolationScoreDTO> adjustScore(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long employerId,
            @Valid @RequestBody ReqAdjustViolationScoreDTO request) {

        return ResponseEntity.ok(violationScoreService.adjustScore(extractUserId(jwt), employerId, request));
    }

    /**
     * GET /admin/employers/{employerId}/appeals
     * Xem toàn bộ danh sách kháng cáo của một NTD.
     */
    @GetMapping("/{employerId}/appeals")
    @PreAuthorize("@adminSecurity.hasAnyRole(authentication, '"
            + AdminRoleConstants.SUPER_ADMIN + "', '"
            + AdminRoleConstants.CONTENT_MODERATOR + "', '"
            + AdminRoleConstants.SUPPORT_ADMIN + "')")
    public ResponseEntity<List<ResAppealDTO>> getAppeals(@PathVariable Long employerId) {
        return ResponseEntity.ok(appealService.getByEmployer(employerId));
    }

    private Long extractUserId(Jwt jwt) {
        return Long.parseLong(jwt.getSubject());
    }
}
package com.topviec.topviec_be.controller;

import com.topviec.topviec_be.dto.request.ReqCreateAppealDTO;
import com.topviec.topviec_be.dto.response.ResAppealDTO;
import com.topviec.topviec_be.service.AppealService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

/**
 * NTD nộp kháng cáo sau khi bị xử lý vi phạm nhóm B.
 * Base URL: /employer/appeals
 */
@RestController
@RequestMapping("/employer/appeals")
@RequiredArgsConstructor
@PreAuthorize("hasRole('EMPLOYER')")
public class EmployerAppealController {

    private final AppealService appealService;

    /**
     * POST /employer/appeals
     * NTD nộp kháng cáo cho một báo cáo nhóm B đã bị xử lý (resolved).
     * Chỉ được kháng cáo 1 lần mỗi báo cáo.
     */
    @PostMapping
    public ResponseEntity<ResAppealDTO> create(
            @AuthenticationPrincipal Jwt jwt,
            @Valid @RequestBody ReqCreateAppealDTO request) {

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(appealService.create(extractUserId(jwt), request));
    }

    private Long extractUserId(Jwt jwt) {
        return Long.parseLong(jwt.getSubject());
    }
}
package com.topviec.topviec_be.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReqAdjustViolationScoreDTO {

    @NotNull(message = "Số điểm giảm không được để trống")
    @Min(value = 1, message = "Số điểm giảm phải lớn hơn 0")
    private Integer pointsToDecrease;

    @NotBlank(message = "Lý do giảm điểm không được để trống")
    @Size(max = 500, message = "Lý do không được vượt quá 500 ký tự")
    private String note;
}
package com.topviec.topviec_be.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReqCreateAppealDTO {

    @NotNull(message = "ID báo cáo không được để trống")
    private Long complaintId;

    @NotBlank(message = "Nội dung kháng cáo không được để trống")
    @Size(max = 2000, message = "Nội dung kháng cáo không được vượt quá 2000 ký tự")
    private String content;
}
package com.topviec.topviec_be.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class ReqResetViolationScoreDTO {

    @NotBlank(message = "Lý do reset không được để trống")
    @Size(max = 500, message = "Lý do không được vượt quá 500 ký tự")
    private String note;
}
package com.topviec.topviec_be.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResAppealDTO {

    private Long id;
    private Long employerId;

    /** Thông tin báo cáo bị kháng cáo */
    private ComplaintInfo complaint;

    private String content;

    /**
     * Trạng thái kháng cáo.
     * Giá trị hợp lệ: {@code pending} | {@code approved} | {@code rejected}
     */
    private String status;

    /** Ghi chú Admin khi xử lý kháng cáo. NULL nếu chưa xử lý */
    private String adminNote;

    /** Admin đã xử lý kháng cáo */
    private AdminInfo reviewedByAdmin;

    private LocalDateTime reviewedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ComplaintInfo {
        private Long id;
        private String reportCode;
        /** Giá trị hợp lệ: {@code fraudulent} | {@code payment_issue} | ... */
        private String complaintType;
        /** Giá trị hợp lệ: {@code A} | {@code B} */
        private String violationGroup;
        private String status;
        private Long jobPostId;
        private String jobPostTitle;
        private String companyName;
        private LocalDateTime createdAt;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class AdminInfo {
        private Long adminUserId;
        private String fullName;
    }
}
package com.topviec.topviec_be.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;
import java.util.List;

/**
 * Response trả về khi Admin xem điểm vi phạm của một NTD.
 * Bao gồm thông tin tổng hợp và lịch sử từng lần vi phạm.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResViolationScoreDTO {

    private Long employerId;
    private String employerEmail;

    private CompanyInfo company;
    private ScoreInfo score;

    /** Lịch sử vi phạm sắp xếp mới nhất trước */
    private List<ViolationLogInfo> history;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class CompanyInfo {
        private Long id;
        private String name;
        private String logoUrl;
        /** Giá trị hợp lệ: {@code pending} | {@code active} | {@code suspended} | {@code deleted} */
        private String status;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ScoreInfo {
        private Integer totalScore;

        /**
         * Mức độ vi phạm hiện tại dựa trên tổng điểm.
         * Giá trị: {@code normal} (0–19) | {@code limited} (20–49) | {@code suspended} (≥50)
         */
        private String scoreLevel;

        /** Thời điểm vi phạm nhóm B gần nhất — dùng để kiểm tra điều kiện reset 6 tháng */
        private LocalDateTime lastGroupBViolationAt;

        /** Thời điểm Admin reset điểm về 0 gần nhất */
        private LocalDateTime lastResetAt;

        /** Tên Admin đã thực hiện reset gần nhất */
        private String resetByAdminName;

        /**
         * Admin có thể reset điểm về 0 không.
         * true nếu chưa từng vi phạm nhóm B hoặc vi phạm nhóm B gần nhất đã qua 6 tháng.
         */
        private Boolean canResetScore;
    }

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ViolationLogInfo {
        private Long id;
        /** Khớp với {@code complaint_type}: fraudulent | spam | wrong_info | ... */
        private String violationType;
        private Integer points;
        /** Nguồn phát hiện: {@code admin} | {@code system} | {@code complaint} */
        private String source;
        /** ID báo cáo liên quan. NULL nếu vi phạm do system phát hiện */
        private Long complaintId;
        private String note;
        /** Tên Admin tạo log. NULL nếu do system */
        private String createdByAdminName;
        private LocalDateTime createdAt;
    }
}
