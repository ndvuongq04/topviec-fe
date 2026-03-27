CONTROLLER :
package com.topviec.topviec_be.controller;

import com.topviec.topviec_be.dto.request.*;
import com.topviec.topviec_be.dto.response.*;
import com.topviec.topviec_be.service.CompanyService;
import com.topviec.topviec_be.service.InterviewService;
import com.topviec.topviec_be.util.SecurityUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

/**
 * Controller dành cho Employer — quản lý phỏng vấn.
 * Base URL: /api/v1/employer
 */
@RestController
@RequestMapping("/employer")
@RequiredArgsConstructor
@PreAuthorize("hasRole('EMPLOYER')")
public class EmployerInterviewController {

    private final InterviewService interviewService;
    private final CompanyService companyService;

    // ── Vòng phỏng vấn ────────────────────────────────────────────────────────

    @PostMapping("/job-postings/{jobPostId}/interview-rounds")
    public ResponseEntity<ResInterviewRoundDTO> createRound(
            @PathVariable Long jobPostId,
            @Valid @RequestBody ReqCreateInterviewRoundDTO request) {

        Long userId = SecurityUtil.getCurrentUserId();
        Long companyId = companyService.getCompanyIdByUserId(userId);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(interviewService.createRound(jobPostId, userId, companyId, request));
    }

    @GetMapping("/job-postings/{jobPostId}/interview-rounds")
    public ResponseEntity<List<ResInterviewRoundDTO>> getRounds(
            @PathVariable Long jobPostId) {

        Long userId = SecurityUtil.getCurrentUserId();
        Long companyId = companyService.getCompanyIdByUserId(userId);

        return ResponseEntity.ok(interviewService.getRounds(jobPostId, companyId));
    }

    @PatchMapping("/interview-rounds/{roundId}")
    public ResponseEntity<ResInterviewRoundDTO> updateRound(
            @PathVariable Long roundId,
            @Valid @RequestBody ReqUpdateInterviewRoundDTO request) {

        Long userId = SecurityUtil.getCurrentUserId();
        Long companyId = companyService.getCompanyIdByUserId(userId);

        return ResponseEntity.ok(interviewService.updateRound(roundId, userId, companyId, request));
    }

    @DeleteMapping("/interview-rounds/{roundId}")
    public ResponseEntity<Void> deleteRound(@PathVariable Long roundId) {
        Long userId = SecurityUtil.getCurrentUserId();
        Long companyId = companyService.getCompanyIdByUserId(userId);

        interviewService.deleteRound(roundId, userId, companyId);
        return ResponseEntity.noContent().build();
    }

    // ── Lịch phỏng vấn ───────────────────────────────────────────────────────

    @PostMapping("/interview-rounds/{roundId}/schedules")
    public ResponseEntity<ResInterviewScheduleDTO> createSchedule(
            @PathVariable Long roundId,
            @Valid @RequestBody ReqCreateInterviewScheduleDTO request) {

        Long userId = SecurityUtil.getCurrentUserId();
        Long companyId = companyService.getCompanyIdByUserId(userId);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(interviewService.createSchedule(roundId, userId, companyId, request));
    }

    @PostMapping("/interview-rounds/{roundId}/schedule-slots")
    public ResponseEntity<Void> createSlots(
            @PathVariable Long roundId,
            @Valid @RequestBody ReqCreateInterviewSlotsDTO request) {

        Long userId = SecurityUtil.getCurrentUserId();
        Long companyId = companyService.getCompanyIdByUserId(userId);

        interviewService.createSlots(roundId, userId, companyId, request);
        return ResponseEntity.status(HttpStatus.CREATED).build();
    }

    @GetMapping("/job-postings/{jobPostId}/interview-schedules")
    public ResponseEntity<List<ResInterviewScheduleDTO>> getSchedules(
            @PathVariable Long jobPostId,
            @RequestParam(required = false) Long roundId,
            @RequestParam(required = false) String status) {

        Long userId = SecurityUtil.getCurrentUserId();
        Long companyId = companyService.getCompanyIdByUserId(userId);

        return ResponseEntity.ok(interviewService.getSchedules(jobPostId, companyId, roundId, status));
    }

    @PutMapping("/interview-schedules/{scheduleId}")
    public ResponseEntity<ResInterviewScheduleDTO> updateSchedule(
            @PathVariable Long scheduleId,
            @Valid @RequestBody ReqUpdateInterviewScheduleDTO request) {

        Long userId = SecurityUtil.getCurrentUserId();
        Long companyId = companyService.getCompanyIdByUserId(userId);

        return ResponseEntity.ok(interviewService.updateSchedule(scheduleId, userId, companyId, request));
    }

    @DeleteMapping("/interview-schedules/{scheduleId}")
    public ResponseEntity<Void> deleteSchedule(@PathVariable Long scheduleId) {
        Long userId = SecurityUtil.getCurrentUserId();
        Long companyId = companyService.getCompanyIdByUserId(userId);

        interviewService.deleteSchedule(scheduleId, userId, companyId);
        return ResponseEntity.noContent().build();
    }

    // ── Kết quả phỏng vấn ────────────────────────────────────────────────────

    @PostMapping("/interview-schedules/{scheduleId}/results")
    public ResponseEntity<ResInterviewResultDTO> createResult(
            @PathVariable Long scheduleId,
            @Valid @RequestBody ReqInterviewResultDTO request) {

        Long userId = SecurityUtil.getCurrentUserId();
        Long companyId = companyService.getCompanyIdByUserId(userId);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(interviewService.createResult(scheduleId, userId, companyId, request));
    }

    @GetMapping("/interview-schedules/{scheduleId}/results")
    public ResponseEntity<ResInterviewResultDTO> getResult(
            @PathVariable Long scheduleId) {

        Long userId = SecurityUtil.getCurrentUserId();
        Long companyId = companyService.getCompanyIdByUserId(userId);

        return ResponseEntity.ok(interviewService.getResult(scheduleId, companyId));
    }

    // ── Lịch sử PV ──────────────────────────────────────────────────────────

    @GetMapping("/applications/{applicationId}/interview-history")
    public ResponseEntity<ResInterviewHistoryDTO> getInterviewHistory(
            @PathVariable Long applicationId) {

        Long userId = SecurityUtil.getCurrentUserId();
        Long companyId = companyService.getCompanyIdByUserId(userId);

        return ResponseEntity.ok(interviewService.getInterviewHistory(applicationId, companyId));
    }

    // ── Overdue ──────────────────────────────────────────────────────────────

    @GetMapping("/job-postings/{jobPostId}/overdue-applications")
    public ResponseEntity<List<ResOverdueApplicationDTO>> getOverdueApplications(
            @PathVariable Long jobPostId) {

        Long userId = SecurityUtil.getCurrentUserId();
        Long companyId = companyService.getCompanyIdByUserId(userId);

        return ResponseEntity.ok(interviewService.getOverdueApplications(jobPostId, companyId));
    }

    @PatchMapping("/applications/{applicationId}/extend-deadline")
    public ResponseEntity<Void> extendDeadline(
            @PathVariable Long applicationId,
            @Valid @RequestBody ReqExtendDeadlineDTO request) {

        Long userId = SecurityUtil.getCurrentUserId();
        Long companyId = companyService.getCompanyIdByUserId(userId);

        interviewService.extendDeadline(applicationId, userId, companyId, request);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/applications/{applicationId}/force-schedule")
    public ResponseEntity<ResInterviewScheduleDTO> forceSchedule(
            @PathVariable Long applicationId,
            @Valid @RequestBody ReqForceScheduleDTO request) {

        Long userId = SecurityUtil.getCurrentUserId();
        Long companyId = companyService.getCompanyIdByUserId(userId);

        return ResponseEntity.ok(interviewService.forceSchedule(applicationId, userId, companyId, request));
    }

    // ── Offer ────────────────────────────────────────────────────────────────

    @PatchMapping("/applications/{applicationId}/offer")
    public ResponseEntity<ResEmployerApplicationDTO> updateOffer(
            @PathVariable Long applicationId,
            @Valid @RequestBody ReqOfferResultDTO request) {

        Long userId = SecurityUtil.getCurrentUserId();
        Long companyId = companyService.getCompanyIdByUserId(userId);

        return ResponseEntity.ok(interviewService.updateOffer(applicationId, userId, companyId, request));
    }

    // ── Job interview phase ──────────────────────────────────────────────────

    @GetMapping("/job-postings/{jobPostId}/interview-readiness")
    public ResponseEntity<ResInterviewReadinessDTO> checkReadiness(
            @PathVariable Long jobPostId) {

        Long userId = SecurityUtil.getCurrentUserId();
        Long companyId = companyService.getCompanyIdByUserId(userId);

        return ResponseEntity.ok(interviewService.checkReadiness(jobPostId, companyId));
    }

    @PatchMapping("/job-postings/{jobPostId}/start-interviewing")
    public ResponseEntity<Void> startInterviewing(
            @PathVariable Long jobPostId) {

        Long userId = SecurityUtil.getCurrentUserId();
        Long companyId = companyService.getCompanyIdByUserId(userId);

        interviewService.startInterviewing(jobPostId, userId, companyId);
        return ResponseEntity.ok().build();
    }

    @PatchMapping("/job-postings/{jobPostId}/complete")
    public ResponseEntity<Void> completeRecruitment(
            @PathVariable Long jobPostId,
            @Valid @RequestBody ReqCompleteRecruitmentDTO request) {

        Long userId = SecurityUtil.getCurrentUserId();
        Long companyId = companyService.getCompanyIdByUserId(userId);

        interviewService.completeRecruitment(jobPostId, userId, companyId, request);
        return ResponseEntity.ok().build();
    }
}

package com.topviec.topviec_be.controller;

import com.topviec.topviec_be.service.InterviewService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * Controller public — UV xác nhận chọn slot PV (không cần đăng nhập).
 * Base URL: /api/v1/interview-schedules
 */
@RestController
@RequestMapping("/interview-schedules")
@RequiredArgsConstructor
public class PublicInterviewController {

    private final InterviewService interviewService;

    /**
     * GET /interview-schedules/confirm?token=xxx&slotId=123
     * UV click link từ email để chọn slot. Không cần auth.
     */
    @GetMapping("/confirm")
    public ResponseEntity<Map<String, String>> confirmSlot(
            @RequestParam String token,
            @RequestParam Long slotId) {

        String message = interviewService.confirmSlot(token, slotId);
        return ResponseEntity.ok(Map.of("message", message));
    }
}

DTO :
package com.topviec.topviec_be.dto.request;

import jakarta.validation.constraints.NotEmpty;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReqCompleteRecruitmentDTO {

    @NotEmpty(message = "Danh sách ứng viên trúng tuyển không được trống")
    private List<Long> applicationIds;
}

package com.topviec.topviec_be.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReqCreateInterviewRoundDTO {

    @NotBlank(message = "Tên vòng phỏng vấn không được trống")
    private String roundName;

    private String description;

    private Boolean isFinal;

    @Valid
    private List<InterviewerDTO> interviewers;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class InterviewerDTO {
        @NotBlank(message = "Tên người phỏng vấn không được trống")
        private String name;
        private String email;
        private String phone;
    }
}

package com.topviec.topviec_be.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReqCreateInterviewScheduleDTO {

    @NotNull(message = "applicationId không được trống")
    private Long applicationId;

    @NotNull(message = "Thời gian phỏng vấn không được trống")
    private LocalDateTime scheduledAt;

    private Integer durationMinutes;

    @NotBlank(message = "Loại phỏng vấn không được trống")
    private String interviewType;

    private String location;

    private String meetingLink;

    private String interviewerNote;
}

package com.topviec.topviec_be.dto.request;

import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;
import lombok.*;

import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReqCreateInterviewSlotsDTO {

    @NotEmpty(message = "Danh sách ứng viên không được trống")
    private List<Long> applicationIds;

    @NotNull(message = "Hạn chót chọn lịch không được trống")
    private LocalDateTime deadline;

    @Valid
    @NotEmpty(message = "Cần ít nhất 1 slot thời gian")
    @Size(min = 3, max = 5, message = "Số lượng slot phải từ 3 đến 5")
    private List<SlotDTO> slots;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class SlotDTO {
        @NotNull(message = "Thời gian slot không được trống")
        private LocalDateTime proposedAt;

        @NotBlank(message = "Loại phỏng vấn không được trống")
        private String interviewType;

        private String location;

        private String meetingLink;
    }
}

package com.topviec.topviec_be.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReqExtendDeadlineDTO {

    @NotNull(message = "Số ngày gia hạn không được trống")
    @Min(value = 1, message = "Phải gia hạn ít nhất 1 ngày")
    private Integer extendDays;
}

package com.topviec.topviec_be.dto.request;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReqForceScheduleDTO {

    @NotNull(message = "Thời gian phỏng vấn không được trống")
    private LocalDateTime scheduledAt;

    @NotBlank(message = "Loại phỏng vấn không được trống")
    private String interviewType;

    private String location;

    private String meetingLink;
}

package com.topviec.topviec_be.dto.request;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReqInterviewResultDTO {

    @NotBlank(message = "Kết quả phỏng vấn không được trống")
    private String result; // PASS / FAIL

    @Min(value = 1, message = "Rating tối thiểu là 1")
    @Max(value = 5, message = "Rating tối đa là 5")
    private Integer rating;

    private String note;

    private Boolean notifyCandidate;
}

package com.topviec.topviec_be.dto.request;

import com.topviec.topviec_be.enums.interview.OfferResult;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReqOfferResultDTO {

    @NotNull(message = "Kết quả offer không được trống")
    private OfferResult result;
}

package com.topviec.topviec_be.dto.request;

import jakarta.validation.Valid;
import lombok.*;

import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReqUpdateInterviewRoundDTO {

    private String roundName;

    private String description;

    private Boolean isFinal;

    @Valid
    private List<ReqCreateInterviewRoundDTO.InterviewerDTO> interviewers;
}

package com.topviec.topviec_be.dto.request;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ReqUpdateInterviewScheduleDTO {

    private LocalDateTime scheduledAt;

    private String location;

    private String meetingLink;

    private String interviewerNote;
}

RES:
package com.topviec.topviec_be.dto.response;

import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResInterviewHistoryDTO {

    private Long applicationId;
    private String candidateName;
    private String currentStatus;
    private List<RoundHistory> rounds;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class RoundHistory {
        private Integer roundNumber;
        private String roundName;
        private Boolean isFinal;

        // Lịch PV (nếu có)
        private Long scheduleId;
        private LocalDateTime scheduledAt;
        private String interviewType;
        private String scheduleStatus;

        // Kết quả (nếu có)
        private String result;
        private Integer rating;
        private String note;
        private LocalDateTime evaluatedAt;
    }
}

package com.topviec.topviec_be.dto.response;

import lombok.*;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResInterviewReadinessDTO {

    private Boolean isJobClosed;
    private Boolean hasRounds;
    private Boolean hasCvPassed;
    private Boolean ready;
}

package com.topviec.topviec_be.dto.response;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResInterviewResultDTO {

    private Long id;
    private Long interviewId;
    private String result;
    private Integer rating;
    private String note;
    private Boolean notifyCandidate;
    private Long evaluatedBy;
    private LocalDateTime evaluatedAt;
}

package com.topviec.topviec_be.dto.response;

import lombok.*;
import java.time.LocalDateTime;
import java.util.List;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResInterviewRoundDTO {

    private Long id;
    private Long jobPostId;
    private Integer roundNumber;
    private String roundName;
    private String description;
    private Boolean isFinal;
    private List<InterviewerInfo> interviewers;
    private Long candidateCount; // số UV đang ở vòng này
    private LocalDateTime createdAt;

    @Getter
    @Setter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class InterviewerInfo {
        private Long id;
        private String name;
        private String email;
        private String phone;
    }
}

package com.topviec.topviec_be.dto.response;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResInterviewScheduleDTO {

    private Long id;
    private Long applicationId;
    private Long roundId;
    private Integer roundNumber;
    private String roundName;

    // Thông tin UV
    private String candidateName;
    private String candidateEmail;
    private String candidatePhone;

    // Thông tin buổi PV
    private LocalDateTime scheduledAt;
    private Integer durationMinutes;
    private String interviewType;
    private String location;
    private String meetingLink;
    private String status;
    private Boolean confirmedByCandidate;
    private String interviewerNote;

    // Audit
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}

package com.topviec.topviec_be.dto.response;

import lombok.*;
import java.time.LocalDateTime;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class ResOverdueApplicationDTO {

    private Long applicationId;
    private Long candidateUserId;
    private String candidateName;
    private String candidateEmail;
    private String candidatePhone;
    private Integer reminderCount;
    private LocalDateTime firstReminderAt;
    private LocalDateTime reminderDeadline;
    private String currentRoundName;
    private Integer currentRoundNumber;
}

ENUM
package com.topviec.topviec_be.enums.interview;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum InterviewStatus {

    SCHEDULED("scheduled"),
    CONFIRMED("confirmed"),
    COMPLETED("completed"),
    CANCELLED("cancelled"),
    NO_SHOW("no_show");

    private final String value;

    InterviewStatus(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static InterviewStatus fromValue(String value) {
        for (InterviewStatus status : InterviewStatus.values()) {
            if (status.value.equalsIgnoreCase(value)) {
                return status;
            }
        }
        throw new IllegalArgumentException("Unknown InterviewStatus: " + value);
    }
}

package com.topviec.topviec_be.enums.interview;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum InterviewType {

    ONSITE("onsite"),
    ONLINE("online"),
    PHONE("phone");

    private final String value;

    InterviewType(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static InterviewType fromValue(String value) {
        for (InterviewType type : InterviewType.values()) {
            if (type.value.equalsIgnoreCase(value)) {
                return type;
            }
        }
        throw new IllegalArgumentException("Unknown InterviewType: " + value);
    }
}

package com.topviec.topviec_be.enums.interview;

import com.fasterxml.jackson.annotation.JsonCreator;
import com.fasterxml.jackson.annotation.JsonValue;

public enum OfferResult {

    ACCEPTED("accepted"),
    DECLINED("declined");

    private final String value;

    OfferResult(String value) {
        this.value = value;
    }

    @JsonValue
    public String getValue() {
        return value;
    }

    @JsonCreator
    public static OfferResult fromValue(String value) {
        for (OfferResult result : OfferResult.values()) {
            if (result.value.equalsIgnoreCase(value)) {
                return result;
            }
        }
        throw new IllegalArgumentException("Unknown OfferResult: " + value);
    }
}


