hiện tại bên BE tôi đã có sự thay đổi : 

controler:AdminServicePackageController 

các API :
package com.topviec.topviec_be.controller;

import com.topviec.topviec_be.dto.request.ReqServicePackageDTO;
import com.topviec.topviec_be.dto.response.ResServicePackageDTO;
import com.topviec.topviec_be.dto.response.ResultPaginationDTO;
import com.topviec.topviec_be.enums.adminUsers.AdminRoleConstants;
import com.topviec.topviec_be.service.ServicePackageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/service-packages")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminServicePackageController {

    private final ServicePackageService servicePackageService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') and @adminSecurity.hasAnyRole(authentication, '"
            + AdminRoleConstants.SUPER_ADMIN + "', '"
            + AdminRoleConstants.FINANCE_ADMIN + "', '"
            + AdminRoleConstants.SUPPORT_ADMIN + "', '"
            + AdminRoleConstants.CONTENT_MODERATOR + "')")
    public ResponseEntity<ResultPaginationDTO> getAllServicePackages(
            @RequestParam(required = false) String keyword,
            @PageableDefault(size = 10, sort = "sortOrder") Pageable pageable) {
        return ResponseEntity.ok(servicePackageService.getAllServicePackages(keyword, pageable));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') and @adminSecurity.hasAnyRole(authentication, '"
            + AdminRoleConstants.SUPER_ADMIN + "', '"
            + AdminRoleConstants.FINANCE_ADMIN + "')")
    public ResponseEntity<ResServicePackageDTO> getServicePackageById(@PathVariable Long id) {
        return ResponseEntity.ok(servicePackageService.getServicePackageById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') and @adminSecurity.hasAnyRole(authentication, '"
            + AdminRoleConstants.SUPER_ADMIN + "', '"
            + AdminRoleConstants.FINANCE_ADMIN + "')")
    public ResponseEntity<ResServicePackageDTO> createServicePackage(
            @Valid @RequestBody ReqServicePackageDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(servicePackageService.createServicePackage(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') and @adminSecurity.hasAnyRole(authentication, '"
            + AdminRoleConstants.SUPER_ADMIN + "', '"
            + AdminRoleConstants.FINANCE_ADMIN + "')")
    public ResponseEntity<ResServicePackageDTO> updateServicePackage(
            @PathVariable Long id,
            @Valid @RequestBody ReqServicePackageDTO request) {
        return ResponseEntity.ok(servicePackageService.updateServicePackage(id, request));
    }
}

controler : EmployerPackageController

các API :
package com.topviec.topviec_be.controller;

import com.topviec.topviec_be.dto.response.ResAddonServiceDTO;
import com.topviec.topviec_be.dto.response.ResServicePackageDTO;
import com.topviec.topviec_be.enums.services.ServiceCategory;
import com.topviec.topviec_be.service.AddonServiceService;
import com.topviec.topviec_be.service.ServicePackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/employer/packages")
@RequiredArgsConstructor
@PreAuthorize("hasRole('EMPLOYER')")
public class EmployerPackageController {

    private final ServicePackageService servicePackageService;
    private final AddonServiceService addonServiceService;

    @GetMapping("/services")
    public ResponseEntity<List<ResServicePackageDTO>> getActiveServicePackages() {
        return ResponseEntity.ok(servicePackageService.getPublicActivePackages());
    }

    @GetMapping("/addons")
    public ResponseEntity<List<ResAddonServiceDTO>> getActiveAddonServices(
            @RequestParam(required = false) ServiceCategory category) {
        return ResponseEntity.ok(addonServiceService.getActiveAddonServices(category));
    }
}

các req , res thay đổi :

package com.topviec.topviec_be.dto.request;

import com.topviec.topviec_be.enums.services.BillingCycle;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
public class ReqServicePackageDTO {

    @NotBlank(message = "Tên gói không được để trống")
    private String name;

    @NotBlank(message = "Mã gói không được để trống")
    private String code;

    @NotNull(message = "Chu kỳ thanh toán không được để trống")
    private BillingCycle billingCycle;

    @NotNull(message = "Giá không được để trống")
    private BigDecimal price;

    private String description;

    private Boolean isActive;

    private Integer sortOrder;

    private List<DetailItem> details;

    @Data
    public static class DetailItem {
        @NotNull(message = "ID dịch vụ không được để trống")
        private Long serviceId;

        @NotNull(message = "Số lượng không được để trống")
        private Integer quantity;
    }
}
package com.topviec.topviec_be.dto.response;

import com.topviec.topviec_be.enums.services.ServiceCategory;
import com.topviec.topviec_be.enums.services.SubscriptionStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ResCompanyAddonDTO {
    private Long id;
    private Long addonServiceId;
    private String addonName;
    private String addonCode;
    private Integer addonQuantity;
    private Long serviceId;
    private String serviceCode;
    private String serviceName;
    private ServiceCategory serviceCategory;
    private String serviceCategoryName;
    private SubscriptionStatus status;
    private Integer quantityTotal;
    private Integer quantityRemaining;
    private LocalDateTime startedAt;
    private LocalDateTime expiredAt;
    private LocalDateTime createdAt;
}

package com.topviec.topviec_be.dto.response;

import com.topviec.topviec_be.enums.services.BillingCycle;
import com.topviec.topviec_be.enums.services.SubscriptionStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ResCompanySubscriptionDTO {
    private Long id;
    private Long servicePackageId;
    private String packageName;
    private String packageCode;
    private BillingCycle billingCycle;
    private SubscriptionStatus status;
    private LocalDateTime startedAt;
    private LocalDateTime expiredAt;
    private LocalDateTime createdAt;
    private List<ResSubscriptionUsageDTO> usages;

    @Data
    @Builder
    public static class ResSubscriptionUsageDTO {
        private Long id;
        private String featureCode;
        private String featureName;
        private Integer quantityTotal;
        private Integer quantityRemaining;
        private LocalDateTime resetAt;
    }
}
package com.topviec.topviec_be.dto.response;

import com.topviec.topviec_be.enums.services.JobPostAddonStatus;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ResJobPostAddonDTO {
    private Long id;
    private Long jobPostingId;
    private Long companyAddonId;
    private Long addonServiceId;
    private String addonName;
    private JobPostAddonStatus status;
    private LocalDateTime startedAt;
    private LocalDateTime expiredAt;
    private LocalDateTime createdAt;
}
package com.topviec.topviec_be.dto.response;

import com.topviec.topviec_be.enums.services.BillingCycle;
import com.topviec.topviec_be.enums.services.OrderItemType;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.util.List;

@Data
@Builder
public class ResOrderItemDTO {
    private Long id;
    private OrderItemType itemType;
    private Long servicePackageId;
    private Long addonServiceId;
    private Integer quantity;
    private BigDecimal unitPrice;
    private BigDecimal totalPrice;
    private BillingCycle billingCycle;
    private Integer durationDays;
    private String packageName;
    private List<ResServicePackageDetailDTO> details;
}
package com.topviec.topviec_be.dto.response;

import com.topviec.topviec_be.enums.services.BillingCycle;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.List;

@Data
@Builder
public class ResServicePackageDTO {
    private Long id;
    private String name;
    private String code;
    private BillingCycle billingCycle;
    private BigDecimal price;
    private String description;
    private Boolean isActive;
    private Integer sortOrder;
    private List<ResServicePackageDetailDTO> details;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}



các LOGIC code để bạn có thể hiểu thêm hơn về BE :

package com.topviec.topviec_be.service.impl;

import com.topviec.topviec_be.dto.request.ReqAddonServiceDTO;
import com.topviec.topviec_be.dto.response.ResAddonServiceDTO;
import com.topviec.topviec_be.dto.response.ResultPaginationDTO;
import com.topviec.topviec_be.entity.AddonService;
import com.topviec.topviec_be.entity.Services;
import com.topviec.topviec_be.enums.services.ServiceCategory;
import com.topviec.topviec_be.exception.AppException;
import com.topviec.topviec_be.repository.AddonServiceRepository;
import com.topviec.topviec_be.repository.ServiceRepository;
import com.topviec.topviec_be.service.AddonServiceService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AddonServiceServiceImpl implements AddonServiceService {

    private final AddonServiceRepository addonServiceRepository;
    private final ServiceRepository serviceRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ResAddonServiceDTO> getActiveAddonServices(ServiceCategory category) {
        List<AddonService> list = category != null
                ? addonServiceRepository.findByIsActiveTrueAndServiceCategory(category)
                : addonServiceRepository.findByIsActiveTrue();
        return list.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ResultPaginationDTO getAllAddonServices(ServiceCategory category, String keyword, Pageable pageable) {
        Page<AddonService> page = addonServiceRepository.searchAll(category, keyword, pageable);

        ResultPaginationDTO.Meta meta = new ResultPaginationDTO.Meta();
        meta.setPage(pageable.getPageNumber() + 1);
        meta.setPageSize(pageable.getPageSize());
        meta.setPages(page.getTotalPages());
        meta.setTotals(page.getTotalElements());

        List<ResAddonServiceDTO> results = page.getContent().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());

        ResultPaginationDTO response = new ResultPaginationDTO();
        response.setMeta(meta);
        response.setResult(results);
        return response;
    }

    @Override
    @Transactional(readOnly = true)
    public ResAddonServiceDTO getAddonServiceById(Long id) {
        AddonService addonService = addonServiceRepository.findById(id)
                .orElseThrow(() -> AppException.notFound("Không tìm thấy dịch vụ lẻ với ID: " + id));
        return mapToDTO(addonService);
    }

    @Override
    @Transactional
    public ResAddonServiceDTO createAddonService(ReqAddonServiceDTO reqDTO) {
        if (addonServiceRepository.existsByCode(reqDTO.getCode())) {
            throw AppException.badRequest("Mã dịch vụ lẻ đã tồn tại, vui lòng chọn mã khác.");
        }

        Services service = serviceRepository.findById(reqDTO.getServiceId())
                .orElseThrow(() -> AppException.notFound("Không tìm thấy dịch vụ với ID: " + reqDTO.getServiceId()));

        AddonService addonService = AddonService.builder()
                .serviceId(service.getId())
                .name(reqDTO.getName())
                .code(reqDTO.getCode())
                .quantity(reqDTO.getQuantity())
                .durationDays(reqDTO.getDurationDays())
                .price(reqDTO.getPrice())
                .description(reqDTO.getDescription())
                .isActive(reqDTO.getIsActive() != null ? reqDTO.getIsActive() : true)
                .build();

        return mapToDTO(addonServiceRepository.save(addonService));
    }

    @Override
    @Transactional
    public ResAddonServiceDTO updateAddonService(Long id, ReqAddonServiceDTO reqDTO) {
        AddonService addonService = addonServiceRepository.findById(id)
                .orElseThrow(() -> AppException.notFound("Không tìm thấy dịch vụ lẻ với ID: " + id));

        if (addonServiceRepository.existsByCodeAndIdNot(reqDTO.getCode(), id)) {
            throw AppException.badRequest("Mã dịch vụ lẻ đã tồn tại, vui lòng chọn mã khác.");
        }

        Services service = serviceRepository.findById(reqDTO.getServiceId())
                .orElseThrow(() -> AppException.notFound("Không tìm thấy dịch vụ với ID: " + reqDTO.getServiceId()));

        addonService.setServiceId(service.getId());
        addonService.setName(reqDTO.getName());
        addonService.setCode(reqDTO.getCode());
        addonService.setQuantity(reqDTO.getQuantity());
        addonService.setDurationDays(reqDTO.getDurationDays());
        addonService.setPrice(reqDTO.getPrice());
        addonService.setDescription(reqDTO.getDescription());
        if (reqDTO.getIsActive() != null) {
            addonService.setIsActive(reqDTO.getIsActive());
        }

        return mapToDTO(addonServiceRepository.save(addonService));
    }

    public ResAddonServiceDTO mapToDTO(AddonService entity) {
        Services svc = entity.getService();
        if (svc == null) {
            svc = serviceRepository.findById(entity.getServiceId()).orElse(null);
        }
        return ResAddonServiceDTO.builder()
                .id(entity.getId())
                .serviceId(entity.getServiceId())
                .serviceCode(svc != null ? svc.getCode() : null)
                .serviceName(svc != null ? svc.getName() : null)
                .serviceCategory(svc != null ? svc.getCategory() : null)
                .serviceCategoryName(svc != null && svc.getCategory() != null ? svc.getCategory().getValue() : null)
                .name(entity.getName())
                .code(entity.getCode())
                .quantity(entity.getQuantity())
                .durationDays(entity.getDurationDays())
                .price(entity.getPrice())
                .description(entity.getDescription())
                .isActive(entity.getIsActive())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}
package com.topviec.topviec_be.service.impl;

import com.topviec.topviec_be.dto.request.ReqApplyAddonDTO;
import com.topviec.topviec_be.dto.response.ResCompanyAddonDTO;
import com.topviec.topviec_be.dto.response.ResCompanySubscriptionDTO;
import com.topviec.topviec_be.dto.response.ResCompanySubscriptionDTO.ResSubscriptionUsageDTO;
import com.topviec.topviec_be.dto.response.ResJobPostAddonDTO;
import com.topviec.topviec_be.entity.AddonService;
import com.topviec.topviec_be.entity.CompanyAddon;
import com.topviec.topviec_be.entity.CompanySubscription;
import com.topviec.topviec_be.entity.JobPostAddon;
import com.topviec.topviec_be.entity.JobPosting;
import com.topviec.topviec_be.entity.Services;
import com.topviec.topviec_be.entity.ServicePackage;
import com.topviec.topviec_be.entity.SubscriptionUsage;
import com.topviec.topviec_be.enums.services.JobPostAddonStatus;
import com.topviec.topviec_be.enums.services.SubscriptionStatus;
import com.topviec.topviec_be.exception.AppException;
import com.topviec.topviec_be.repository.AddonServiceRepository;
import com.topviec.topviec_be.repository.CompanyAddonRepository;
import com.topviec.topviec_be.repository.CompanySubscriptionRepository;
import com.topviec.topviec_be.repository.JobPostAddonRepository;
import com.topviec.topviec_be.repository.JobPostingRepository;
import com.topviec.topviec_be.repository.ServicePackageRepository;
import com.topviec.topviec_be.repository.ServiceRepository;
import com.topviec.topviec_be.repository.SubscriptionUsageRepository;
import com.topviec.topviec_be.service.CompanyService;
import com.topviec.topviec_be.service.EmployerServiceManagementService;
import lombok.RequiredArgsConstructor;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class EmployerServiceManagementServiceImpl implements EmployerServiceManagementService {

        private final CompanyService companyService;
        private final CompanySubscriptionRepository companySubscriptionRepository;
        private final SubscriptionUsageRepository subscriptionUsageRepository;
        private final CompanyAddonRepository companyAddonRepository;
        private final AddonServiceRepository addonServiceRepository;
        private final ServiceRepository serviceRepository;
        private final ServicePackageRepository servicePackageRepository;
        private final JobPostingRepository jobPostingRepository;
        private final JobPostAddonRepository jobPostAddonRepository;

        @Override
        @Transactional(readOnly = true)
        public ResCompanySubscriptionDTO getMySubscription(Long userId) {
                Long companyId = getCompanyId(userId);

                CompanySubscription subscription = companySubscriptionRepository
                                .findFirstByCompanyIdAndStatusOrderByCreatedAtDesc(companyId, SubscriptionStatus.ACTIVE)
                                .orElseThrow(() -> AppException.notFound("Công ty chưa đăng ký gói dịch vụ nào."));

                ServicePackage servicePackage = servicePackageRepository.findById(subscription.getServicePackageId())
                                .orElse(null);

                List<SubscriptionUsage> usages = subscriptionUsageRepository
                                .findByCompanySubscriptionId(subscription.getId());

                List<ResSubscriptionUsageDTO> usageDTOs = usages.stream()
                                .map(u -> {
                                        Services svc = serviceRepository.findByCode(u.getFeatureCode()).orElse(null);
                                        return ResSubscriptionUsageDTO.builder()
                                                        .id(u.getId())
                                                        .featureCode(u.getFeatureCode())
                                                        .featureName(svc != null ? svc.getName() : null)
                                                        .quantityTotal(u.getQuantityTotal())
                                                        .quantityRemaining(u.getQuantityRemaining())
                                                        .resetAt(u.getResetAt())
                                                        .build();
                                })
                                .collect(Collectors.toList());

                return ResCompanySubscriptionDTO.builder()
                                .id(subscription.getId())
                                .servicePackageId(subscription.getServicePackageId())
                                .packageName(servicePackage != null ? servicePackage.getName() : null)
                                .packageCode(servicePackage != null ? servicePackage.getCode() : null)
                                .billingCycle(subscription.getBillingCycle())
                                .status(subscription.getStatus())
                                .startedAt(subscription.getStartedAt())
                                .expiredAt(subscription.getExpiredAt())
                                .createdAt(subscription.getCreatedAt())
                                .usages(usageDTOs)
                                .build();
        }

        @Override
        @Transactional(readOnly = true)
        public List<ResCompanyAddonDTO> getMyAddons(Long userId) {
                Long companyId = getCompanyId(userId);

                List<CompanyAddon> addons = companyAddonRepository
                                .findByCompanyIdOrderByCreatedAtDesc(companyId);

                return addons.stream().map(addon -> {
                        AddonService addonSvc = addonServiceRepository.findById(addon.getAddonServiceId()).orElse(null);
                        Services svc = addonSvc != null
                                        ? serviceRepository.findById(addonSvc.getServiceId()).orElse(null)
                                        : null;

                        return ResCompanyAddonDTO.builder()
                                        .id(addon.getId())
                                        .addonServiceId(addon.getAddonServiceId())
                                        .addonName(addonSvc != null ? addonSvc.getName() : null)
                                        .addonCode(addonSvc != null ? addonSvc.getCode() : null)
                                        .addonQuantity(addonSvc != null ? addonSvc.getQuantity() : null)
                                        .serviceId(svc != null ? svc.getId() : null)
                                        .serviceCode(svc != null ? svc.getCode() : null)
                                        .serviceName(svc != null ? svc.getName() : null)
                                        .serviceCategory(svc != null ? svc.getCategory() : null)
                                        .serviceCategoryName(svc != null && svc.getCategory() != null
                                                        ? svc.getCategory().getValue()
                                                        : null)
                                        .status(addon.getStatus())
                                        .quantityTotal(addon.getQuantityTotal())
                                        .quantityRemaining(addon.getQuantityRemaining())
                                        .startedAt(addon.getStartedAt())
                                        .expiredAt(addon.getExpiredAt())
                                        .createdAt(addon.getCreatedAt())
                                        .build();
                }).collect(Collectors.toList());
        }

        @Override
        @Transactional
        public ResJobPostAddonDTO applyAddonToJobPost(Long userId, Long jobPostingId, ReqApplyAddonDTO request) {
                Long companyId = getCompanyId(userId);

                JobPosting jobPosting = jobPostingRepository.findByIdAndDeletedAtIsNull(jobPostingId)
                                .orElseThrow(() -> AppException.notFound("Không tìm thấy tin tuyển dụng."));

                if (!jobPosting.getCompanyId().equals(companyId)) {
                        throw AppException.forbidden("Bạn không có quyền thao tác trên tin tuyển dụng này.");
                }

                CompanyAddon companyAddon = companyAddonRepository.findById(request.getCompanyAddonId())
                                .orElseThrow(() -> AppException.notFound("Không tìm thấy dịch vụ lẻ."));

                if (!companyAddon.getCompanyId().equals(companyId)) {
                        throw AppException.forbidden("Dịch vụ lẻ này không thuộc công ty của bạn.");
                }

                if (companyAddon.getStatus() != SubscriptionStatus.ACTIVE) {
                        throw AppException.badRequest("Dịch vụ lẻ này đã hết hiệu lực.");
                }

                if (companyAddon.getExpiredAt() != null && companyAddon.getExpiredAt().isBefore(LocalDateTime.now())) {
                        throw AppException.badRequest("Dịch vụ lẻ này đã hết hạn sử dụng.");
                }

                if (companyAddon.getQuantityRemaining() <= 0) {
                        throw AppException.badRequest("Dịch vụ lẻ này đã hết số lượng sử dụng.");
                }

                AddonService addonService = addonServiceRepository.findById(companyAddon.getAddonServiceId())
                                .orElseThrow(() -> AppException.notFound("Không tìm thấy thông tin dịch vụ lẻ."));

                LocalDateTime now = LocalDateTime.now();
                LocalDateTime expiredAt = addonService.getDurationDays() != null
                                ? now.plusDays(addonService.getDurationDays())
                                : null;

                JobPostAddon jobPostAddon = JobPostAddon.builder()
                                .jobPostingId(jobPostingId)
                                .companyAddonId(companyAddon.getId())
                                .addonServiceId(addonService.getId())
                                .startedAt(now)
                                .expiredAt(expiredAt)
                                .status(JobPostAddonStatus.ACTIVE)
                                .build();

                JobPostAddon saved = jobPostAddonRepository.save(jobPostAddon);

                companyAddon.setQuantityRemaining(companyAddon.getQuantityRemaining() - 1);
                companyAddonRepository.save(companyAddon);

                return ResJobPostAddonDTO.builder()
                                .id(saved.getId())
                                .jobPostingId(saved.getJobPostingId())
                                .companyAddonId(saved.getCompanyAddonId())
                                .addonServiceId(saved.getAddonServiceId())
                                .addonName(addonService.getName())
                                .status(saved.getStatus())
                                .startedAt(saved.getStartedAt())
                                .expiredAt(saved.getExpiredAt())
                                .createdAt(saved.getCreatedAt())
                                .build();
        }

        private Long getCompanyId(Long userId) {
                Long companyId = companyService.getCompanyIdByUserId(userId);
                if (companyId == null) {
                        throw AppException.badRequest("Chưa có hồ sơ công ty.");
                }
                return companyId;
        }
}
package com.topviec.topviec_be.service.impl;

import com.topviec.topviec_be.dto.request.ReqCreateOrderDTO;
import com.topviec.topviec_be.dto.request.ReqUpdateOrderStatusDTO;
import com.topviec.topviec_be.dto.response.ResCompanyDTO;
import com.topviec.topviec_be.dto.response.ResOrderDTO;
import com.topviec.topviec_be.dto.response.ResOrderItemDTO;
import com.topviec.topviec_be.dto.response.ResServicePackageDetailDTO;
import com.topviec.topviec_be.dto.response.ResultPaginationDTO;
import com.topviec.topviec_be.entity.AddonService;
import com.topviec.topviec_be.entity.Order;
import com.topviec.topviec_be.entity.OrderItem;
import com.topviec.topviec_be.entity.Services;
import com.topviec.topviec_be.entity.ServicePackage;
import com.topviec.topviec_be.entity.ServicePackageDetail;
import com.topviec.topviec_be.entity.CompanySubscription;
import com.topviec.topviec_be.entity.SubscriptionUsage;
import com.topviec.topviec_be.entity.CompanyAddon;
import com.topviec.topviec_be.enums.services.BillingCycle;
import com.topviec.topviec_be.enums.services.SubscriptionStatus;
import com.topviec.topviec_be.enums.services.OrderItemType;
import com.topviec.topviec_be.enums.services.OrderStatus;
import com.topviec.topviec_be.enums.services.OrderType;
import com.topviec.topviec_be.exception.AppException;
import com.topviec.topviec_be.repository.AddonServiceRepository;
import com.topviec.topviec_be.repository.OrderRepository;
import com.topviec.topviec_be.repository.ServicePackageRepository;
import com.topviec.topviec_be.repository.ServicePackageDetailRepository;
import com.topviec.topviec_be.repository.ServiceRepository;
import com.topviec.topviec_be.repository.CompanySubscriptionRepository;
import com.topviec.topviec_be.repository.SubscriptionUsageRepository;
import com.topviec.topviec_be.repository.CompanyAddonRepository;
import com.topviec.topviec_be.service.CompanyService;
import com.topviec.topviec_be.service.OrderService;
import com.topviec.topviec_be.specification.OrderSpecification;

import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class OrderServiceImpl implements OrderService {

    private final OrderRepository orderRepository;
    private final ServicePackageRepository servicePackageRepository;
    private final ServicePackageDetailRepository servicePackageDetailRepository;
    private final ServiceRepository serviceRepository;
    private final AddonServiceRepository addonServiceRepository;
    private final CompanyService companyService;
    private final CompanySubscriptionRepository companySubscriptionRepository;
    private final SubscriptionUsageRepository subscriptionUsageRepository;
    private final CompanyAddonRepository companyAddonRepository;

    @Override
    @Transactional
    public ResOrderDTO createOrder(Long userId, ReqCreateOrderDTO request) {
        Long companyId = companyService.getCompanyIdByUserId(userId);
        if (companyId == null) {
            throw AppException.badRequest("Chưa có hồ sơ công ty. Không thể thực hiện mua hàng.");
        }

        BigDecimal unitPrice = BigDecimal.ZERO;
        ServicePackage servicePackage = null;
        AddonService addonService = null;
        OrderItemType itemType;

        if (request.getType() == OrderType.SUBSCRIPTION) {
            itemType = OrderItemType.SUBSCRIPTION;
            servicePackage = servicePackageRepository.findById(request.getPackageId())
                    .orElseThrow(() -> AppException.notFound("Không tìm thấy gói dịch vụ."));
            if (servicePackage.getIsActive() == null || !servicePackage.getIsActive()) {
                throw AppException.badRequest("Gói dịch vụ này không còn hoạt động.");
            }
            unitPrice = servicePackage.getPrice();
        } else {
            itemType = OrderItemType.ADDON;
            addonService = addonServiceRepository.findById(request.getPackageId())
                    .orElseThrow(() -> AppException.notFound("Không tìm thấy dịch vụ lẻ."));
            if (addonService.getIsActive() == null || !addonService.getIsActive()) {
                throw AppException.badRequest("Dịch vụ lẻ này không còn hoạt động.");
            }
            unitPrice = addonService.getPrice();
        }

        BigDecimal totalAmount = unitPrice.multiply(BigDecimal.valueOf(request.getQuantity()));

        Order order = Order.builder()
                .companyId(companyId)
                .orderCode("ORD-" + System.currentTimeMillis())
                .type(request.getType())
                .totalAmount(totalAmount)
                .status(OrderStatus.PAID)
                .paymentMethod(request.getPaymentMethod())
                .paidAt(LocalDateTime.now())
                .createdBy(userId)
                .build();

        Order savedOrder = orderRepository.save(order);

        OrderItem item = OrderItem.builder()
                .orderId(savedOrder.getId())
                .itemType(itemType)
                .servicePackageId(servicePackage != null ? servicePackage.getId() : null)
                .addonServiceId(addonService != null ? addonService.getId() : null)
                .quantity(request.getQuantity())
                .unitPrice(unitPrice)
                .totalPrice(totalAmount)
                .billingCycle(servicePackage != null ? servicePackage.getBillingCycle() : null)
                .durationDays(addonService != null ? addonService.getDurationDays() : null)
                .build();

        List<OrderItem> items = new ArrayList<>();
        items.add(item);
        savedOrder.setOrderItems(items);

        // TODO: Sẽ có phần Gateway thanh toán (VNPAY/MOMO) ở đây để nhận callback
        // Tạm thời giả lập thanh toán thành công và kích hoạt ngay
        if (itemType == OrderItemType.SUBSCRIPTION && servicePackage != null) {
            activateSubscription(companyId, savedOrder.getId(), servicePackage);
        } else if (itemType == OrderItemType.ADDON && addonService != null) {
            activateAddon(companyId, savedOrder.getId(), addonService, request.getQuantity());
        }

        return mapToDTO(savedOrder);
    }

    private void activateSubscription(Long companyId, Long orderId, ServicePackage servicePackage) {
        CompanySubscription sub = CompanySubscription.builder()
                .companyId(companyId)
                .servicePackageId(servicePackage.getId())
                .orderId(orderId)
                .status(SubscriptionStatus.ACTIVE)
                .billingCycle(servicePackage.getBillingCycle())
                .startedAt(LocalDateTime.now())
                .expiredAt(servicePackage.getBillingCycle() == BillingCycle.MONTHLY
                        ? LocalDateTime.now().plusMonths(1)
                        : LocalDateTime.now().plusYears(1))
                .build();

        CompanySubscription savedSub = companySubscriptionRepository.save(sub);

        // Tạo SubscriptionUsage từ ServicePackageDetails (thay thế JSON features cũ)
        List<ServicePackageDetail> details = servicePackageDetailRepository
                .findByServicePackageId(servicePackage.getId());

        for (ServicePackageDetail detail : details) {
            Services svc = serviceRepository.findById(detail.getServiceId()).orElse(null);
            if (svc == null) continue;

            SubscriptionUsage usage = SubscriptionUsage.builder()
                    .companySubscriptionId(savedSub.getId())
                    .companyId(companyId)
                    .featureCode(svc.getCode())
                    .quantityTotal(detail.getQuantity())
                    .quantityRemaining(detail.getQuantity())
                    .resetAt(savedSub.getExpiredAt())
                    .build();

            subscriptionUsageRepository.save(usage);
        }
    }

    private void activateAddon(Long companyId, Long orderId, AddonService addonService, int quantity) {
        CompanyAddon companyAddon = CompanyAddon.builder()
                .companyId(companyId)
                .addonServiceId(addonService.getId())
                .orderId(orderId)
                .status(SubscriptionStatus.ACTIVE)
                .quantityTotal(quantity * addonService.getQuantity())
                .quantityRemaining(quantity * addonService.getQuantity())
                .startedAt(LocalDateTime.now())
                .expiredAt(addonService.getDurationDays() != null
                        ? LocalDateTime.now().plusDays(addonService.getDurationDays())
                        : null)
                .build();
        companyAddonRepository.save(companyAddon);
    }

    @Override
    @Transactional(readOnly = true)
    public ResultPaginationDTO getMyOrders(
            Long userId,
            String keyword, OrderType type, OrderStatus status,
            String dateFilter, String startDate, String endDate,
            Pageable pageable) {
        Long companyId = companyService.getCompanyIdByUserId(userId);
        if (companyId == null) {
            throw AppException.badRequest("Chưa có hồ sơ công ty.");
        }

        LocalDateTime startDt = parseDateFilter(dateFilter, startDate, true);
        LocalDateTime endDt = parseDateFilter(dateFilter, endDate, false);

        Specification<Order> spec = OrderSpecification.withFilter(keyword, type, status, startDt, endDt)
                .and(OrderSpecification.hasCompanyId(companyId));

        Page<Order> page = orderRepository.findAll(spec, pageable);
        return buildPaginationResult(page, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public ResOrderDTO getMyOrderById(Long userId, Long orderId) {
        Long companyId = companyService.getCompanyIdByUserId(userId);
        if (companyId == null) {
            throw AppException.badRequest("Chưa có hồ sơ công ty.");
        }

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> AppException.notFound("Không tìm thấy đơn hàng."));

        if (!order.getCompanyId().equals(companyId)) {
            throw AppException.badRequest("Bạn không có quyền truy cập đơn hàng này.");
        }

        return mapToDTO(order);
    }

    @Override
    @Transactional
    public ResOrderDTO cancelOrder(Long userId, Long orderId) {
        Long companyId = companyService.getCompanyIdByUserId(userId);
        if (companyId == null) {
            throw AppException.badRequest("Chưa có hồ sơ công ty.");
        }

        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> AppException.notFound("Không tìm thấy đơn hàng."));

        if (!order.getCompanyId().equals(companyId)) {
            throw AppException.badRequest("Bạn không có quyền thao tác trên đơn hàng này.");
        }

        if (order.getStatus() != OrderStatus.PENDING) {
            throw AppException.badRequest("Chỉ có thể hủy đơn hàng đang trong trạng thái chờ thanh toán (PENDING).");
        }

        order.setStatus(OrderStatus.CANCELLED);
        return mapToDTO(orderRepository.save(order));
    }

    @Override
    @Transactional(readOnly = true)
    public ResultPaginationDTO getAllOrders(
            String keyword, OrderType type, OrderStatus status,
            String dateFilter, String startDate, String endDate,
            Pageable pageable) {

        LocalDateTime startDt = parseDateFilter(dateFilter, startDate, true);
        LocalDateTime endDt = parseDateFilter(dateFilter, endDate, false);

        Specification<Order> spec = OrderSpecification.withFilter(keyword, type, status, startDt, endDt);
        Page<Order> page = orderRepository.findAll(spec, pageable);
        return buildPaginationResult(page, pageable);
    }

    @Override
    @Transactional(readOnly = true)
    public ResOrderDTO getOrderById(Long orderId) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> AppException.notFound("Không tìm thấy đơn hàng."));
        return mapToDTO(order);
    }

    @Override
    @Transactional
    public ResOrderDTO updateOrderStatus(Long adminId, Long orderId, ReqUpdateOrderStatusDTO request) {
        Order order = orderRepository.findById(orderId)
                .orElseThrow(() -> AppException.notFound("Không tìm thấy đơn hàng."));

        if (request.getStatus() == OrderStatus.PAID && order.getStatus() != OrderStatus.PAID) {
            order.setPaidAt(LocalDateTime.now());
        }

        order.setStatus(request.getStatus());
        return mapToDTO(orderRepository.save(order));
    }

    // ─── helpers ─────────────────────────────────────────────────────────────

    private LocalDateTime parseDateFilter(String dateFilter, String rawDate, boolean isStart) {
        if (dateFilter != null && !dateFilter.isBlank()) {
            LocalDateTime now = LocalDateTime.now();
            switch (dateFilter.toLowerCase()) {
                case "today":
                    return isStart ? now.toLocalDate().atStartOfDay() : now.toLocalDate().atTime(23, 59, 59);
                case "last7days":
                    return isStart ? now.minusDays(7).toLocalDate().atStartOfDay() : now.toLocalDate().atTime(23, 59, 59);
                case "thismonth":
                    return isStart ? now.withDayOfMonth(1).toLocalDate().atStartOfDay() : now.toLocalDate().atTime(23, 59, 59);
            }
        }
        if (rawDate != null && !rawDate.isBlank()) {
            try {
                return LocalDateTime.parse(rawDate);
            } catch (Exception e) {
                try {
                    return isStart
                            ? java.time.LocalDate.parse(rawDate).atStartOfDay()
                            : java.time.LocalDate.parse(rawDate).atTime(23, 59, 59);
                } catch (Exception ex) {}
            }
        }
        return null;
    }

    private ResultPaginationDTO buildPaginationResult(Page<Order> page, Pageable pageable) {
        ResultPaginationDTO.Meta meta = new ResultPaginationDTO.Meta();
        meta.setPage(pageable.getPageNumber() + 1);
        meta.setPageSize(pageable.getPageSize());
        meta.setPages(page.getTotalPages());
        meta.setTotals(page.getTotalElements());

        List<ResOrderDTO> results = page.getContent().stream()
                .map(this::mapToDTO).collect(Collectors.toList());

        ResultPaginationDTO response = new ResultPaginationDTO();
        response.setMeta(meta);
        response.setResult(results);
        return response;
    }

    private ResOrderDTO mapToDTO(Order entity) {
        List<ResOrderItemDTO> itemDTOs = new ArrayList<>();
        if (entity.getOrderItems() != null) {
            itemDTOs = entity.getOrderItems().stream().map(item -> {
                String packageName = null;
                List<ResServicePackageDetailDTO> detailDTOs = new ArrayList<>();

                if (item.getServicePackageId() != null) {
                    ServicePackage sp = item.getServicePackage();
                    if (sp == null) {
                        sp = servicePackageRepository.findById(item.getServicePackageId()).orElse(null);
                    }
                    if (sp != null) {
                        packageName = sp.getName();
                        final ServicePackage finalSp = sp;
                        List<ServicePackageDetail> details = finalSp.getDetails();
                        if (details == null || details.isEmpty()) {
                            details = servicePackageDetailRepository.findByServicePackageId(finalSp.getId());
                        }
                        detailDTOs = details.stream().map(d -> {
                            Services svc = serviceRepository.findById(d.getServiceId()).orElse(null);
                            return ResServicePackageDetailDTO.builder()
                                    .id(d.getId())
                                    .serviceId(d.getServiceId())
                                    .serviceCode(svc != null ? svc.getCode() : null)
                                    .serviceName(svc != null ? svc.getName() : null)
                                    .serviceCategory(svc != null ? svc.getCategory() : null)
                                    .serviceCategoryName(svc != null && svc.getCategory() != null ? svc.getCategory().getValue() : null)
                                    .serviceUnit(svc != null ? svc.getUnit() : null)
                                    .quantity(d.getQuantity())
                                    .build();
                        }).collect(Collectors.toList());
                    }
                }

                if (packageName == null && item.getAddonServiceId() != null) {
                    AddonService addon = item.getAddonService();
                    if (addon == null) {
                        addon = addonServiceRepository.findById(item.getAddonServiceId()).orElse(null);
                    }
                    if (addon != null) {
                        packageName = addon.getName();
                    }
                }

                return ResOrderItemDTO.builder()
                        .id(item.getId())
                        .itemType(item.getItemType())
                        .servicePackageId(item.getServicePackageId())
                        .addonServiceId(item.getAddonServiceId())
                        .packageName(packageName)
                        .details(detailDTOs)
                        .quantity(item.getQuantity())
                        .unitPrice(item.getUnitPrice())
                        .totalPrice(item.getTotalPrice())
                        .billingCycle(item.getBillingCycle())
                        .durationDays(item.getDurationDays())
                        .build();
            }).collect(Collectors.toList());
        }

        ResOrderDTO.CompanyInfo companyInfo = null;
        if (entity.getCompany() != null) {
            companyInfo = ResOrderDTO.CompanyInfo.builder()
                    .name(entity.getCompany().getName())
                    .logoUrl(entity.getCompany().getLogoUrl())
                    .email(entity.getCompany().getEmail())
                    .phone(entity.getCompany().getPhone())
                    .build();
        } else if (entity.getCompanyId() != null) {
            try {
                ResCompanyDTO dto = companyService.getById(entity.getCompanyId());
                companyInfo = ResOrderDTO.CompanyInfo.builder()
                        .name(dto.getName())
                        .logoUrl(dto.getLogoUrl())
                        .email(dto.getEmail())
                        .phone(dto.getPhone())
                        .build();
            } catch (Exception e) {
                // Ignore if not found
            }
        }

        return ResOrderDTO.builder()
                .id(entity.getId())
                .orderCode(entity.getOrderCode())
                .type(entity.getType())
                .totalAmount(entity.getTotalAmount())
                .status(entity.getStatus())
                .paymentMethod(entity.getPaymentMethod())
                .paymentTransactionId(entity.getPaymentTransactionId())
                .paidAt(entity.getPaidAt())
                .note(entity.getNote())
                .createdAt(entity.getCreatedAt())
                .items(itemDTOs)
                .company(companyInfo)
                .build();
    }
}

package com.topviec.topviec_be.service.impl;

import com.topviec.topviec_be.dto.request.ReqServicePackageDTO;
import com.topviec.topviec_be.dto.response.ResServicePackageDTO;
import com.topviec.topviec_be.dto.response.ResServicePackageDetailDTO;
import com.topviec.topviec_be.dto.response.ResultPaginationDTO;
import com.topviec.topviec_be.entity.ServicePackage;
import com.topviec.topviec_be.entity.ServicePackageDetail;
import com.topviec.topviec_be.entity.Services;
import com.topviec.topviec_be.exception.AppException;
import com.topviec.topviec_be.repository.ServicePackageDetailRepository;
import com.topviec.topviec_be.repository.ServicePackageRepository;
import com.topviec.topviec_be.repository.ServiceRepository;
import com.topviec.topviec_be.service.ServicePackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@org.springframework.stereotype.Service
@RequiredArgsConstructor
public class ServicePackageServiceImpl implements ServicePackageService {

    private final ServicePackageRepository servicePackageRepository;
    private final ServicePackageDetailRepository servicePackageDetailRepository;
    private final ServiceRepository serviceRepository;

    @Override
    @Transactional(readOnly = true)
    public List<ResServicePackageDTO> getPublicActivePackages() {
        return servicePackageRepository.findByIsActiveTrueOrderBySortOrderAsc().stream()
                .map(this::mapToDTO).collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public ResultPaginationDTO getAllServicePackages(String keyword, Pageable pageable) {
        Page<ServicePackage> page = servicePackageRepository.searchAll(keyword, pageable);

        ResultPaginationDTO.Meta meta = new ResultPaginationDTO.Meta();
        meta.setPage(pageable.getPageNumber() + 1);
        meta.setPageSize(pageable.getPageSize());
        meta.setPages(page.getTotalPages());
        meta.setTotals(page.getTotalElements());

        List<ResServicePackageDTO> results = page.getContent().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());

        ResultPaginationDTO response = new ResultPaginationDTO();
        response.setMeta(meta);
        response.setResult(results);
        return response;
    }

    @Override
    @Transactional(readOnly = true)
    public ResServicePackageDTO getServicePackageById(Long id) {
        ServicePackage servicePackage = servicePackageRepository.findById(id)
                .orElseThrow(() -> AppException.notFound("Không tìm thấy gói dịch vụ với ID: " + id));
        return mapToDTO(servicePackage);
    }

    @Override
    @Transactional
    public ResServicePackageDTO createServicePackage(ReqServicePackageDTO reqDTO) {
        if (servicePackageRepository.existsByCode(reqDTO.getCode())) {
            throw AppException.badRequest("Mã gói dịch vụ đã tồn tại, vui lòng chọn mã khác.");
        }

        ServicePackage servicePackage = ServicePackage.builder()
                .name(reqDTO.getName())
                .code(reqDTO.getCode())
                .billingCycle(reqDTO.getBillingCycle())
                .price(reqDTO.getPrice())
                .description(reqDTO.getDescription())
                .isActive(reqDTO.getIsActive() != null ? reqDTO.getIsActive() : true)
                .sortOrder(reqDTO.getSortOrder())
                .build();

        ServicePackage saved = servicePackageRepository.save(servicePackage);

        if (reqDTO.getDetails() != null && !reqDTO.getDetails().isEmpty()) {
            saveDetails(saved, reqDTO.getDetails());
        }

        return mapToDTO(servicePackageRepository.findById(saved.getId()).orElse(saved));
    }

    @Override
    @Transactional
    public ResServicePackageDTO updateServicePackage(Long id, ReqServicePackageDTO reqDTO) {
        ServicePackage servicePackage = servicePackageRepository.findById(id)
                .orElseThrow(() -> AppException.notFound("Không tìm thấy gói dịch vụ với ID: " + id));

        if (servicePackageRepository.existsByCodeAndIdNot(reqDTO.getCode(), id)) {
            throw AppException.badRequest("Mã gói dịch vụ đã tồn tại, vui lòng chọn mã khác.");
        }

        servicePackage.setName(reqDTO.getName());
        servicePackage.setCode(reqDTO.getCode());
        servicePackage.setBillingCycle(reqDTO.getBillingCycle());
        servicePackage.setPrice(reqDTO.getPrice());
        servicePackage.setDescription(reqDTO.getDescription());
        if (reqDTO.getIsActive() != null) {
            servicePackage.setIsActive(reqDTO.getIsActive());
        }
        if (reqDTO.getSortOrder() != null) {
            servicePackage.setSortOrder(reqDTO.getSortOrder());
        }

        ServicePackage saved = servicePackageRepository.save(servicePackage);

        if (reqDTO.getDetails() != null) {
            if (saved.getDetails() != null) {
                saved.getDetails().clear();
            }
            servicePackageDetailRepository.deleteByServicePackageId(saved.getId());
            servicePackageDetailRepository.flush();
            
            if (!reqDTO.getDetails().isEmpty()) {
                saveDetails(saved, reqDTO.getDetails());
            }
        }

        return mapToDTO(servicePackageRepository.findById(saved.getId()).orElse(saved));
    }

    private void saveDetails(ServicePackage pkg, List<ReqServicePackageDTO.DetailItem> items) {
        for (ReqServicePackageDTO.DetailItem item : items) {
            Services service = serviceRepository.findById(item.getServiceId())
                    .orElseThrow(() -> AppException.notFound("Không tìm thấy dịch vụ với ID: " + item.getServiceId()));

            ServicePackageDetail detail = ServicePackageDetail.builder()
                    .servicePackageId(pkg.getId())
                    .serviceId(service.getId())
                    .quantity(item.getQuantity())
                    .build();

            servicePackageDetailRepository.save(detail);
        }
    }

    private ResServicePackageDTO mapToDTO(ServicePackage entity) {
        List<ServicePackageDetail> rawDetails = entity.getDetails();
        if (rawDetails == null) {
            rawDetails = servicePackageDetailRepository.findByServicePackageId(entity.getId());
        }

        List<ResServicePackageDetailDTO> detailDTOs = rawDetails.stream()
                .map(d -> {
                    Services svc = d.getService();
                    if (svc == null) {
                        svc = serviceRepository.findById(d.getServiceId()).orElse(null);
                    }
                    return ResServicePackageDetailDTO.builder()
                            .id(d.getId())
                            .serviceId(d.getServiceId())
                            .serviceCode(svc != null ? svc.getCode() : null)
                            .serviceName(svc != null ? svc.getName() : null)
                            .serviceCategory(svc != null ? svc.getCategory() : null)
                            .serviceCategoryName(svc != null && svc.getCategory() != null ? svc.getCategory().getValue() : null)
                            .serviceUnit(svc != null ? svc.getUnit() : null)
                            .quantity(d.getQuantity())
                            .build();
                })
                .collect(Collectors.toList());

        return ResServicePackageDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .code(entity.getCode())
                .billingCycle(entity.getBillingCycle())
                .price(entity.getPrice())
                .description(entity.getDescription())
                .isActive(entity.getIsActive())
                .sortOrder(entity.getSortOrder())
                .details(detailDTOs)
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}

