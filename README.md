package com.topviec.topviec_be.controller;

import com.topviec.topviec_be.dto.request.ReqAddonPackageDTO;
import com.topviec.topviec_be.dto.response.ResAddonPackageDTO;
import com.topviec.topviec_be.dto.response.ResultPaginationDTO;
import com.topviec.topviec_be.enums.adminUsers.AdminRoleConstants;
import com.topviec.topviec_be.enums.services.AddonPackageGroup;
import com.topviec.topviec_be.service.AddonPackageService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/addon-packages")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminAddonPackageController {

    private final AddonPackageService addonPackageService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') and @adminSecurity.hasAnyRole(authentication, '"
            + AdminRoleConstants.SUPER_ADMIN + "', '"
            + AdminRoleConstants.FINANCE_ADMIN + "', '"
            + AdminRoleConstants.SUPPORT_ADMIN + "', '"
            + AdminRoleConstants.CONTENT_MODERATOR + "')")
    public ResponseEntity<ResultPaginationDTO> getAllAddonPackages(
            @RequestParam(required = false) AddonPackageGroup groupCode,
            @PageableDefault(size = 10, sort = "createdAt") Pageable pageable) {
        return ResponseEntity.ok(addonPackageService.getAllAddonPackages(groupCode, pageable));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') and @adminSecurity.hasAnyRole(authentication, '"
            + AdminRoleConstants.SUPER_ADMIN + "', '"
            + AdminRoleConstants.FINANCE_ADMIN + "')")
    public ResponseEntity<ResAddonPackageDTO> createAddonPackage(
            @Valid @RequestBody ReqAddonPackageDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(addonPackageService.createAddonPackage(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') and @adminSecurity.hasAnyRole(authentication, '"
            + AdminRoleConstants.SUPER_ADMIN + "', '"
            + AdminRoleConstants.FINANCE_ADMIN + "')")
    public ResponseEntity<ResAddonPackageDTO> updateAddonPackage(
            @PathVariable Long id,
            @Valid @RequestBody ReqAddonPackageDTO request) {
        return ResponseEntity.ok(addonPackageService.updateAddonPackage(id, request));
    }
}

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
            @PageableDefault(size = 10, sort = "sortOrder") Pageable pageable) {
        return ResponseEntity.ok(servicePackageService.getAllServicePackages(pageable));
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
package com.topviec.topviec_be.dto.request;

import com.topviec.topviec_be.enums.services.AddonPackageGroup;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ReqAddonPackageDTO {

    @NotNull(message = "Nhóm Addon không được để trống")
    private AddonPackageGroup groupCode;

    @NotBlank(message = "Tên gói không được để trống")
    private String name;

    @NotBlank(message = "Mã gói không được để trống")
    private String code;

    @NotNull(message = "Giá không được để trống")
    private BigDecimal price;

    private Integer durationDays;

    private String description;

    private Boolean isActive;
}
package com.topviec.topviec_be.dto.request;

import com.topviec.topviec_be.enums.services.BillingCycle;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;
import java.util.Map;

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

    private Map<String, Object> features;

    private String description;

    private Boolean isActive;

    private Integer sortOrder;
}
package com.topviec.topviec_be.dto.response;

import com.topviec.topviec_be.enums.services.AddonPackageGroup;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class ResAddonPackageDTO {
    private Long id;
    private AddonPackageGroup groupCode;
    private String groupName;
    private String name;
    private String code;
    private BigDecimal price;
    private Integer durationDays;
    private String description;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
package com.topviec.topviec_be.dto.response;

import com.topviec.topviec_be.enums.services.BillingCycle;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class ResServicePackageDTO {
    private Long id;
    private String name;
    private String code;
    private BillingCycle billingCycle;
    private BigDecimal price;
    private Object features;
    private String description;
    private Boolean isActive;
    private Integer sortOrder;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}


package com.topviec.topviec_be.service.impl;

import com.topviec.topviec_be.dto.request.ReqAddonPackageDTO;
import com.topviec.topviec_be.dto.response.ResAddonPackageDTO;
import com.topviec.topviec_be.dto.response.ResultPaginationDTO;
import com.topviec.topviec_be.entity.AddonPackage;
import com.topviec.topviec_be.enums.services.AddonPackageGroup;
import com.topviec.topviec_be.exception.AppException;
import com.topviec.topviec_be.repository.AddonPackageRepository;
import com.topviec.topviec_be.service.AddonPackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class AddonPackageServiceImpl implements AddonPackageService {

    private final AddonPackageRepository addonPackageRepository;

    @Override
    @Transactional(readOnly = true)
    public ResultPaginationDTO getAllAddonPackages(AddonPackageGroup groupCode, Pageable pageable) {
        Page<AddonPackage> page;
        if (groupCode != null) {
            page = addonPackageRepository.findByGroupCode(groupCode, pageable);
        } else {
            page = addonPackageRepository.findAll(pageable);
        }

        ResultPaginationDTO.Meta meta = new ResultPaginationDTO.Meta();
        meta.setPage(pageable.getPageNumber() + 1);
        meta.setPageSize(pageable.getPageSize());
        meta.setPages(page.getTotalPages());
        meta.setTotals(page.getTotalElements());

        List<ResAddonPackageDTO> results = page.getContent().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());

        ResultPaginationDTO response = new ResultPaginationDTO();
        response.setMeta(meta);
        response.setResult(results);

        return response;
    }

    @Override
    @Transactional(readOnly = true)
    public ResAddonPackageDTO getAddonPackageById(Long id) {
        AddonPackage addonPackage = addonPackageRepository.findById(id)
                .orElseThrow(() -> AppException.notFound("Không tìm thấy gói addon với ID: " + id));
        return mapToDTO(addonPackage);
    }

    @Override
    @Transactional
    public ResAddonPackageDTO createAddonPackage(ReqAddonPackageDTO reqDTO) {
        if (addonPackageRepository.existsByCode(reqDTO.getCode())) {
            throw AppException.badRequest("Mã gói addon đã tồn tại, vui lòng chọn mã khác.");
        }

        AddonPackage addonPackage = AddonPackage.builder()
                .groupCode(reqDTO.getGroupCode())
                .name(reqDTO.getName())
                .code(reqDTO.getCode())
                .price(reqDTO.getPrice())
                .durationDays(reqDTO.getDurationDays())
                .description(reqDTO.getDescription())
                .isActive(reqDTO.getIsActive() != null ? reqDTO.getIsActive() : true)
                .build();

        return mapToDTO(addonPackageRepository.save(addonPackage));
    }

    @Override
    @Transactional
    public ResAddonPackageDTO updateAddonPackage(Long id, ReqAddonPackageDTO reqDTO) {
        AddonPackage addonPackage = addonPackageRepository.findById(id)
                .orElseThrow(() -> AppException.notFound("Không tìm thấy gói addon với ID: " + id));

        if (addonPackageRepository.existsByCodeAndIdNot(reqDTO.getCode(), id)) {
            throw AppException.badRequest("Mã gói addon đã tồn tại, vui lòng chọn mã khác.");
        }

        addonPackage.setGroupCode(reqDTO.getGroupCode());
        addonPackage.setName(reqDTO.getName());
        addonPackage.setCode(reqDTO.getCode());
        addonPackage.setPrice(reqDTO.getPrice());
        addonPackage.setDurationDays(reqDTO.getDurationDays());
        addonPackage.setDescription(reqDTO.getDescription());
        
        if (reqDTO.getIsActive() != null) {
            addonPackage.setIsActive(reqDTO.getIsActive());
        }

        return mapToDTO(addonPackageRepository.save(addonPackage));
    }

    private ResAddonPackageDTO mapToDTO(AddonPackage entity) {
        return ResAddonPackageDTO.builder()
                .id(entity.getId())
                .groupCode(entity.getGroupCode())
                .groupName(entity.getGroupName())
                .name(entity.getName())
                .code(entity.getCode())
                .price(entity.getPrice())
                .durationDays(entity.getDurationDays())
                .description(entity.getDescription())
                .isActive(entity.getIsActive())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}
package com.topviec.topviec_be.service.impl;

import com.topviec.topviec_be.dto.request.ReqServicePackageDTO;
import com.topviec.topviec_be.dto.response.ResServicePackageDTO;
import com.topviec.topviec_be.dto.response.ResultPaginationDTO;
import com.topviec.topviec_be.entity.ServicePackage;
import com.topviec.topviec_be.exception.AppException;
import com.topviec.topviec_be.repository.ServicePackageRepository;
import com.topviec.topviec_be.service.ServicePackageService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ServicePackageServiceImpl implements ServicePackageService {

    private final ServicePackageRepository servicePackageRepository;

    @Override
    @Transactional(readOnly = true)
    public ResultPaginationDTO getAllServicePackages(Pageable pageable) {
        Page<ServicePackage> page = servicePackageRepository.findAll(pageable);

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
                .features(reqDTO.getFeatures())
                .description(reqDTO.getDescription())
                .isActive(reqDTO.getIsActive() != null ? reqDTO.getIsActive() : true)
                .sortOrder(reqDTO.getSortOrder())
                .build();

        return mapToDTO(servicePackageRepository.save(servicePackage));
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
        servicePackage.setFeatures(reqDTO.getFeatures());
        servicePackage.setDescription(reqDTO.getDescription());
        
        if (reqDTO.getIsActive() != null) {
            servicePackage.setIsActive(reqDTO.getIsActive());
        }
        if (reqDTO.getSortOrder() != null) {
            servicePackage.setSortOrder(reqDTO.getSortOrder());
        }

        return mapToDTO(servicePackageRepository.save(servicePackage));
    }

    private ResServicePackageDTO mapToDTO(ServicePackage entity) {
        return ResServicePackageDTO.builder()
                .id(entity.getId())
                .name(entity.getName())
                .code(entity.getCode())
                .billingCycle(entity.getBillingCycle())
                .price(entity.getPrice())
                .features(entity.getFeatures())
                .description(entity.getDescription())
                .isActive(entity.getIsActive())
                .sortOrder(entity.getSortOrder())
                .createdAt(entity.getCreatedAt())
                .updatedAt(entity.getUpdatedAt())
                .build();
    }
}
