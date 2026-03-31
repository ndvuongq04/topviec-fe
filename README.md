package com.topviec.topviec_be.controller;

import com.topviec.topviec_be.dto.request.ReqUpdateApplicationStatusDTO;
import com.topviec.topviec_be.dto.request.ReqEvaluateApplicationDTO;
import com.topviec.topviec_be.dto.response.ResEmployerApplicationDTO;
import com.topviec.topviec_be.dto.response.ResultPaginationDTO;
import com.topviec.topviec_be.service.ApplicationService;
import com.topviec.topviec_be.service.CompanyService;
import com.topviec.topviec_be.util.SecurityUtil;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

/**
 * Controller dành cho Employer nhận và xem CV ứng tuyển.
 * Base URL: /api/v1/employer/applications
 */
@RestController
@RequestMapping("/employer/applications")
@RequiredArgsConstructor
@PreAuthorize("hasRole('EMPLOYER')")
public class EmployerApplicationController {

    private final ApplicationService applicationService;
    private final CompanyService companyService;

    /**
     * Lấy danh sách hồ sơ ứng tuyển của 1 tin tuyển dụng.
     */
    @GetMapping("/job/{jobPostId}")
    public ResponseEntity<ResultPaginationDTO> getApplicationsByJobPost(
            @PathVariable Long jobPostId,
            @RequestParam(required = false) String status,
            @PageableDefault(size = 10, sort = "createdAt") Pageable pageable) {

        Long userId = SecurityUtil.getCurrentUserId();
        Long companyId = companyService.getCompanyIdByUserId(userId);

        return ResponseEntity.ok(
                applicationService.getApplicationsByJobPost(userId, companyId, jobPostId, status, pageable));
    }

    /**
     * Xem chi tiết 1 hồ sơ ứng tuyển. Tự động chuyển status PENDING -> SEEN.
     */
    @GetMapping("/{applicationId}")
    public ResponseEntity<ResEmployerApplicationDTO> getApplicationDetail(
            @PathVariable Long applicationId) {

        Long userId = SecurityUtil.getCurrentUserId();
        Long companyId = companyService.getCompanyIdByUserId(userId);

        return ResponseEntity.ok(
                applicationService.getApplicationDetailByEmployer(userId, companyId, applicationId));
    }

    /**
     * NTD cập nhật trạng thái CV ứng tuyển (ví dụ: interviewing, rejected, hired...).
     */
    @PatchMapping("/{applicationId}/status")
    public ResponseEntity<ResEmployerApplicationDTO> updateApplicationStatus(
            @PathVariable Long applicationId,
            @Valid @RequestBody ReqUpdateApplicationStatusDTO request) {

        Long userId = SecurityUtil.getCurrentUserId();
        Long companyId = companyService.getCompanyIdByUserId(userId);

        return ResponseEntity.ok(
                applicationService.changeApplicationStatus(userId, companyId, applicationId, request));
    }

    /**
     * NTD đánh giá (cho điểm, ghi chú, gán tag) CV.
     */
    @PatchMapping("/{applicationId}/evaluate")
    public ResponseEntity<ResEmployerApplicationDTO> evaluateApplication(
            @PathVariable Long applicationId,
            @Valid @RequestBody ReqEvaluateApplicationDTO request) {

        Long userId = SecurityUtil.getCurrentUserId();
        Long companyId = companyService.getCompanyIdByUserId(userId);

        return ResponseEntity.ok(
                applicationService.evaluateApplication(userId, companyId, applicationId, request));
    }
}


 // -------------------------------------------------------------------------
    // API cho Employer
    // -------------------------------------------------------------------------

    @Override
    @Transactional(readOnly = true)
    public ResultPaginationDTO getApplicationsByJobPost(Long userId, Long companyId, Long jobPostId, String status, Pageable pageable) {
        JobPosting job = jobPostingRepository.findByIdAndDeletedAtIsNull(jobPostId)
                .orElseThrow(() -> AppException.notFound("Không tìm thấy tin tuyển dụng"));
        
        if (!job.getCompanyId().equals(companyId)) {
            throw AppException.forbidden("Bạn không có quyền xem hồ sơ của tin tuyển dụng này");
        }

        Page<Application> applicationPage = applicationRepository.findByJobPost(jobPostId, status, pageable);
        
        ResultPaginationDTO.Meta meta = new ResultPaginationDTO.Meta();
        meta.setPage(pageable.getPageNumber());
        meta.setPageSize(pageable.getPageSize());
        meta.setPages(applicationPage.getTotalPages());
        meta.setTotals(applicationPage.getTotalElements());

        ResultPaginationDTO result = new ResultPaginationDTO();
        result.setMeta(meta);
        result.setResult(applicationPage.getContent().stream()
                .map(this::toEmployerResponse)
                .toList());

        return result;
    }

    @Override
    @Transactional
    public ResEmployerApplicationDTO getApplicationDetailByEmployer(Long userId, Long companyId, Long applicationId) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> AppException.notFound("Không tìm thấy đơn ứng tuyển"));
        
        JobPosting job = application.getJobPosting();
        if (job == null || !job.getCompanyId().equals(companyId)) {
            throw AppException.forbidden("Bạn không có quyền xem đơn ứng tuyển này");
        }

        // Chuyển status PENDING -> SEEN
        if (ApplicationStatus.PENDING.getValue().equals(application.getStatus())) {
            application.setStatus(ApplicationStatus.SEEN.getValue());
            application.setViewedAt(LocalDateTime.now());
            application = applicationRepository.save(application);
        }

        return toEmployerResponse(application);
    }

    @Override
    @Transactional
    public ResEmployerApplicationDTO changeApplicationStatus(Long userId, Long companyId, Long applicationId, ReqUpdateApplicationStatusDTO request) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> AppException.notFound("Không tìm thấy đơn ứng tuyển"));
        
        JobPosting job = application.getJobPosting();
        if (job == null || !job.getCompanyId().equals(companyId)) {
            throw AppException.forbidden("Bạn không có quyền sửa đơn ứng tuyển này");
        }

        ApplicationStatus currentStatus = ApplicationStatus.fromValue(application.getStatus());
        ApplicationStatus nextStatus = ApplicationStatus.fromValue(request.getStatus());

        if (!currentStatus.canTransitionTo(nextStatus)) {
            throw AppException.badRequest("Không thể chuyển trạng thái từ " + currentStatus.getValue() + " sang " + nextStatus.getValue());
        }

        application.setStatus(nextStatus.getValue());
        if (request.getNote() != null) {
            application.setRecruiterNote(request.getNote());
        }

        if (nextStatus == ApplicationStatus.REJECTED) {
            application.setRejectedAt(LocalDateTime.now());
        } else if (nextStatus == ApplicationStatus.HIRED) {
            application.setHiredAt(LocalDateTime.now());
        }

        Application saved = applicationRepository.save(application);
        return toEmployerResponse(saved);
    }

    @Override
    @Transactional
    public ResEmployerApplicationDTO evaluateApplication(Long userId, Long companyId, Long applicationId, ReqEvaluateApplicationDTO request) {
        Application application = applicationRepository.findById(applicationId)
                .orElseThrow(() -> AppException.notFound("Không tìm thấy đơn ứng tuyển"));
        
        JobPosting job = application.getJobPosting();
        if (job == null || !job.getCompanyId().equals(companyId)) {
            throw AppException.forbidden("Bạn không có quyền đánh giá đơn ứng tuyển này");
        }

        if (request.getRating() != null) {
            application.setRecruiterRating(request.getRating());
        }
        if (request.getNote() != null) {
            application.setRecruiterNote(request.getNote());
        }
        if (request.getTags() != null) {
            application.setRecruiterTags(request.getTags());
        }

        Application saved = applicationRepository.save(application);
        return toEmployerResponse(saved);
    }

    private ResEmployerApplicationDTO toEmployerResponse(Application a) {
        User user = null;
        CandidateProfile profile = null;
        Cvs cv = null;

        if (a.getCandidateUserId() != null) {
            user = userRepository.findById(a.getCandidateUserId()).orElse(null);
            profile = candidateProfileRepository.findByUserId(a.getCandidateUserId()).orElse(null);
        }
        
        if (a.getCvId() != null) {
            cv = cvsRepository.findById(a.getCvId()).orElse(null);
        }

        JobPosting job = a.getJobPosting();

        return ResEmployerApplicationDTO.builder()
                .id(a.getId())
                .jobPostId(a.getJobPostId())
                .jobTitle(job != null ? job.getTitle() : null)
                .candidateUserId(a.getCandidateUserId())
                .candidateName(profile != null ? profile.getFullName() : (user != null ? "User " + user.getId() : "Unknown"))
                .candidateEmail(user != null ? user.getEmail() : null)
                .candidatePhone(profile != null ? profile.getPhoneDisplay() : null)
                .candidateAvatar(profile != null ? profile.getAvatarUrl() : null)
                .cvId(a.getCvId())
                .cvFileUrl(cv != null ? cv.getFileUrl() : null)
                .cvPdfUrl(cv != null ? cv.getPdfUrl() : null)
                .status(a.getStatus())
                .applyMethod(a.getApplyMethod())
                .recruiterRating(a.getRecruiterRating())
                .recruiterNote(a.getRecruiterNote())
                .recruiterTags(a.getRecruiterTags())
                .viewedAt(a.getViewedAt())
                .createdAt(a.getCreatedAt())
                .updatedAt(a.getUpdatedAt())
                .build();
    }