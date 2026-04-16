hiện tại các phần mà BE đã thêm : 

controler :  AdminServiceCatalogController

các API : 


package com.topviec.topviec_be.controller;

import com.topviec.topviec_be.dto.request.ReqServiceDTO;
import com.topviec.topviec_be.dto.response.ResServiceDTO;
import com.topviec.topviec_be.dto.response.ResultPaginationDTO;
import com.topviec.topviec_be.enums.adminUsers.AdminRoleConstants;
import com.topviec.topviec_be.enums.services.ServiceCategory;
import com.topviec.topviec_be.service.ServiceCatalogService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/admin/services")
@RequiredArgsConstructor
@PreAuthorize("hasRole('ADMIN')")
public class AdminServiceCatalogController {

    private final ServiceCatalogService serviceCatalogService;

    @GetMapping
    @PreAuthorize("hasRole('ADMIN') and @adminSecurity.hasAnyRole(authentication, '"
            + AdminRoleConstants.SUPER_ADMIN + "', '"
            + AdminRoleConstants.FINANCE_ADMIN + "', '"
            + AdminRoleConstants.SUPPORT_ADMIN + "', '"
            + AdminRoleConstants.CONTENT_MODERATOR + "')")
    public ResponseEntity<ResultPaginationDTO> getAllServices(
            @RequestParam(required = false) ServiceCategory category,
            @RequestParam(required = false) String keyword,
            @PageableDefault(size = 20, sort = "name") Pageable pageable) {
        return ResponseEntity.ok(serviceCatalogService.getAllServices(category, keyword, pageable));
    }

    @GetMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') and @adminSecurity.hasAnyRole(authentication, '"
            + AdminRoleConstants.SUPER_ADMIN + "', '"
            + AdminRoleConstants.FINANCE_ADMIN + "')")
    public ResponseEntity<ResServiceDTO> getServiceById(@PathVariable Long id) {
        return ResponseEntity.ok(serviceCatalogService.getServiceById(id));
    }

    @PostMapping
    @PreAuthorize("hasRole('ADMIN') and @adminSecurity.hasAnyRole(authentication, '"
            + AdminRoleConstants.SUPER_ADMIN + "', '"
            + AdminRoleConstants.FINANCE_ADMIN + "')")
    public ResponseEntity<ResServiceDTO> createService(@Valid @RequestBody ReqServiceDTO request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(serviceCatalogService.createService(request));
    }

    @PutMapping("/{id}")
    @PreAuthorize("hasRole('ADMIN') and @adminSecurity.hasAnyRole(authentication, '"
            + AdminRoleConstants.SUPER_ADMIN + "', '"
            + AdminRoleConstants.FINANCE_ADMIN + "')")
    public ResponseEntity<ResServiceDTO> updateService(
            @PathVariable Long id,
            @Valid @RequestBody ReqServiceDTO request) {
        return ResponseEntity.ok(serviceCatalogService.updateService(id, request));
    }
}


các res , req , enum : 

package com.topviec.topviec_be.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.Data;

import java.math.BigDecimal;

@Data
public class ReqAddonServiceDTO {

    @NotNull(message = "ID dịch vụ không được để trống")
    private Long serviceId;

    @NotBlank(message = "Tên không được để trống")
    private String name;

    @NotBlank(message = "Mã không được để trống")
    private String code;

    @NotNull(message = "Số lượng không được để trống")
    @Min(value = 1, message = "Số lượng tối thiểu là 1")
    private Integer quantity;

    private Integer durationDays;

    @NotNull(message = "Giá không được để trống")
    private BigDecimal price;

    private String description;

    private Boolean isActive;
}
package com.topviec.topviec_be.dto.request;

import com.topviec.topviec_be.enums.services.ServiceCategory;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class ReqServiceDTO {

    @NotBlank(message = "Mã dịch vụ không được để trống")
    private String code;

    @NotBlank(message = "Tên dịch vụ không được để trống")
    private String name;

    private ServiceCategory category;

    private String unit;

    private String description;

    private Boolean isActive;
}
package com.topviec.topviec_be.dto.response;

import com.topviec.topviec_be.enums.services.ServiceCategory;
import lombok.Builder;
import lombok.Data;

import java.math.BigDecimal;
import java.time.LocalDateTime;

@Data
@Builder
public class ResAddonServiceDTO {
    private Long id;
    private Long serviceId;
    private String serviceCode;
    private String serviceName;
    private ServiceCategory serviceCategory;
    private String serviceCategoryName;
    private String name;
    private String code;
    private Integer quantity;
    private Integer durationDays;
    private BigDecimal price;
    private String description;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
package com.topviec.topviec_be.dto.response;

import com.topviec.topviec_be.enums.services.ServiceCategory;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ResServiceDTO {
    private Long id;
    private String code;
    private String name;
    private ServiceCategory category;
    private String categoryName;
    private String unit;
    private String description;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}
package com.topviec.topviec_be.dto.response;

import com.topviec.topviec_be.enums.services.ServiceCategory;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class ResServicePackageDetailDTO {
    private Long id;
    private Long serviceId;
    private String serviceCode;
    private String serviceName;
    private ServiceCategory serviceCategory;
    private String serviceCategoryName;
    private String serviceUnit;
    private Integer quantity;
}
