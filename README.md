package com.topviec.topviec_be.controller;

import com.topviec.topviec_be.dto.response.ResEmployerComplaintDetailDTO;
import com.topviec.topviec_be.dto.response.ResMyViolationScoreDTO;
import com.topviec.topviec_be.dto.response.ResultPaginationDTO;
import com.topviec.topviec_be.service.ReportService;
import com.topviec.topviec_be.service.ViolationScoreService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.oauth2.jwt.Jwt;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

/**
 * NTD tự quan sát các khiếu nại nhắm vào tin tuyển dụng của mình.
 * Base URL: /employer/me
 */
@RestController
@RequestMapping("/employer/me")
@RequiredArgsConstructor
@PreAuthorize("hasRole('EMPLOYER')")
public class EmployerComplaintController {

    private final ReportService reportService;
    private final ViolationScoreService violationScoreService;

    /**
     * GET /employer/me/reports
     * Danh sách khiếu nại nhắm vào tin của NTD (ẩn danh người báo cáo).
     */
    @GetMapping("/reports")
    public ResponseEntity<ResultPaginationDTO> getMyReports(
            @AuthenticationPrincipal Jwt jwt,
            @RequestParam(required = false) String status,
            @PageableDefault(size = 10, sort = "createdAt") Pageable pageable) {

        return ResponseEntity.ok(reportService.getEmployerReports(extractUserId(jwt), status, pageable));
    }

    /**
     * GET /employer/me/reports/{id}
     * Chi tiết một khiếu nại — chỉ cho phép nếu tin thuộc công ty của NTD.
     */
    @GetMapping("/reports/{id}")
    public ResponseEntity<ResEmployerComplaintDetailDTO> getReportDetail(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long id) {

        return ResponseEntity.ok(reportService.getEmployerReportDetail(extractUserId(jwt), id));
    }

    /**
     * GET /employer/me/violation-score
     * NTD xem điểm vi phạm hiện tại của mình.
     */
    @GetMapping("/violation-score")
    public ResponseEntity<ResMyViolationScoreDTO> getMyViolationScore(
            @AuthenticationPrincipal Jwt jwt) {

        return ResponseEntity.ok(violationScoreService.getMyScore(extractUserId(jwt)));
    }

    /**
     * POST /employer/me/reports/{id}/respond
     * NTD xác nhận đã sửa tin (nhóm A) → trigger tự đóng báo cáo.
     */
    @PostMapping("/reports/{id}/respond")
    public ResponseEntity<ResEmployerComplaintDetailDTO> respondToReport(
            @AuthenticationPrincipal Jwt jwt,
            @PathVariable Long id) {

        return ResponseEntity.ok(reportService.respondToReport(extractUserId(jwt), id));
    }

    private Long extractUserId(Jwt jwt) {
        return Long.parseLong(jwt.getSubject());
    }
}
package com.topviec.topviec_be.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * Response chi tiết một khiếu nại từ góc nhìn của NTD.
 * Không chứa danh tính người báo cáo, không chứa bằng chứng, không chứa ghi chú nội bộ Admin.
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResEmployerComplaintDetailDTO {

    private Long id;
    private String reportCode;

    private JobPostInfo jobPost;

    private String complaintType;
    private String violationGroup;
    private String priority;
    private String status;

    /** Mô tả khiếu nại do UV nhập (hiển thị để NTD biết cần sửa gì) */
    private String description;

    // ── Thông tin xử lý nhóm A ────────────────────────────────────────────────

    /** Thời điểm hệ thống gửi email nhắc NTD sửa tin */
    private LocalDateTime emailSentAt;

    /** Deadline NTD phải sửa tin = emailSentAt + 48h */
    private LocalDateTime employerDeadline;

    /** Thời gian còn lại (giờ) trước deadline. 0 nếu đã hết hạn hoặc đã xử lý xong */
    private Long remainingHours;

    /** Thời điểm NTD bấm xác nhận đã sửa */
    private LocalDateTime employerRespondedAt;

    // ── Kết quả xử lý (hiển thị khi resolved / rejected) ─────────────────────

    /** Ghi chú kết quả xử lý của Admin (public — không chứa thông tin nội bộ) */
    private String resolutionNote;

    private LocalDateTime resolvedAt;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class JobPostInfo {
        private Long id;
        private String title;
        private String status;
    }
}
package com.topviec.topviec_be.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * Response danh sách khiếu nại mà NTD bị báo cáo.
 * Không chứa thông tin định danh của người báo cáo (UV).
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResEmployerComplaintSummaryDTO {

    private Long id;
    private String reportCode;

    private JobPostInfo jobPost;

    /** Giá trị hợp lệ: {@code wrong_info} | {@code spam} | {@code payment_issue} | ... */
    private String complaintType;
    /** Giá trị hợp lệ: {@code A} (nhẹ) | {@code B} (nặng) */
    private String violationGroup;
    /** Giá trị hợp lệ: {@code urgent} | {@code important} | {@code normal} */
    private String priority;
    /** Giá trị hợp lệ: {@code pending} | {@code processing} | {@code waiting_employer} | {@code resolved} | {@code rejected} | {@code auto_closed} */
    private String status;

    /** Deadline NTD phải sửa tin (chỉ có với nhóm A ở trạng thái waiting_employer) */
    private LocalDateTime employerDeadline;
    private Long remainingHours;

    private LocalDateTime createdAt;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class JobPostInfo {
        private Long id;
        private String title;
        private String status;
    }
}
package com.topviec.topviec_be.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDateTime;

/**
 * Response điểm vi phạm dành cho NTD xem thông tin của chính mình.
 * Không bao gồm lịch sử chi tiết từng lần vi phạm (dành riêng cho Admin).
 */
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResMyViolationScoreDTO {

    private Integer totalScore;

    /**
     * Mức độ vi phạm hiện tại.
     * Giá trị: {@code normal} (0–19) | {@code limited} (20–49) | {@code suspended} (≥50)
     */
    private String scoreLevel;

    /**
     * Mô tả hạn chế áp dụng tương ứng với scoreLevel.
     * VD: "Chỉ được đăng tối đa 3 tin/tuần, tin mới cần Admin duyệt trước khi hiển thị"
     */
    private String restrictionDescription;

    /**
     * Thời điểm vi phạm nhóm B gần nhất.
     * Dùng để NTD biết khi nào đủ điều kiện yêu cầu Admin reset điểm (sau 6 tháng).
     */
    private LocalDateTime lastGroupBViolationAt;

    /**
     * NTD đã đủ điều kiện để liên hệ Admin yêu cầu reset điểm về 0 hay chưa.
     * true nếu chưa từng vi phạm nhóm B hoặc đã qua 6 tháng kể từ lần vi phạm nhóm B gần nhất.
     */
    private Boolean canRequestReset;

    private String companyStatus;
}
