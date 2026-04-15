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
    public List<ResServicePackageDTO> getPublicActivePackages() {
        return servicePackageRepository.findByIsActiveTrueOrderBySortOrderAsc().stream()
                .map(this::mapToDTO).collect(Collectors.toList());
    }

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

package com.topviec.topviec_be.service.impl;

import com.topviec.topviec_be.dto.request.ReqCreateOrderDTO;
import com.topviec.topviec_be.dto.request.ReqUpdateOrderStatusDTO;
import com.topviec.topviec_be.dto.response.ResOrderDTO;
import com.topviec.topviec_be.dto.response.ResOrderItemDTO;
import com.topviec.topviec_be.dto.response.ResultPaginationDTO;
import com.topviec.topviec_be.entity.AddonPackage;
import com.topviec.topviec_be.entity.Order;
import com.topviec.topviec_be.entity.OrderItem;
import com.topviec.topviec_be.entity.ServicePackage;
import com.topviec.topviec_be.enums.services.OrderItemType;
import com.topviec.topviec_be.enums.services.OrderStatus;
import com.topviec.topviec_be.enums.services.OrderType;
import com.topviec.topviec_be.exception.AppException;
import com.topviec.topviec_be.repository.AddonPackageRepository;
import com.topviec.topviec_be.repository.OrderRepository;
import com.topviec.topviec_be.repository.ServicePackageRepository;
import com.topviec.topviec_be.service.CompanyService;
import com.topviec.topviec_be.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
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
    private final AddonPackageRepository addonPackageRepository;
    private final CompanyService companyService;

    @Override
    @Transactional
    public ResOrderDTO createOrder(Long userId, ReqCreateOrderDTO request) {
        Long companyId = companyService.getCompanyIdByUserId(userId);
        if (companyId == null) {
            throw AppException.badRequest("Chưa có hồ sơ công ty. Không thể thực hiện mua hàng.");
        }

        BigDecimal unitPrice = BigDecimal.ZERO;
        ServicePackage servicePackage = null;
        AddonPackage addonPackage = null;
        OrderItemType itemType;

        if (request.getType() == OrderType.SUBSCRIPTION) {
            itemType = OrderItemType.SUBSCRIPTION;
            servicePackage = servicePackageRepository.findById(request.getPackageId())
                    .orElseThrow(() -> AppException.notFound("Không tìm thấy gói dịch vụ (Subscription)."));
            if (servicePackage.getIsActive() == null || !servicePackage.getIsActive()) {
                 throw AppException.badRequest("Gói dịch vụ này không còn hoạt động.");
            }
            unitPrice = servicePackage.getPrice();
        } else {
            itemType = OrderItemType.ADDON;
            addonPackage = addonPackageRepository.findById(request.getPackageId())
                    .orElseThrow(() -> AppException.notFound("Không tìm thấy gói dịch vụ phụ (Addon)."));
            if (addonPackage.getIsActive() == null || !addonPackage.getIsActive()) {
                throw AppException.badRequest("Gói dịch vụ phụ này không còn hoạt động.");
            }
            unitPrice = addonPackage.getPrice();
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

        OrderItem item = OrderItem.builder()
                .order(order)
                .itemType(itemType)
                .servicePackageId(servicePackage != null ? servicePackage.getId() : null)
                .addonPackageId(addonPackage != null ? addonPackage.getId() : null)
                .quantity(request.getQuantity())
                .unitPrice(unitPrice)
                .totalPrice(totalAmount)
                .billingCycle(servicePackage != null ? servicePackage.getBillingCycle() : null)
                .durationDays(addonPackage != null ? addonPackage.getDurationDays() : null)
                .build();

        List<OrderItem> items = new ArrayList<>();
        items.add(item);
        order.setOrderItems(items);

        Order savedOrder = orderRepository.save(order);
        return mapToDTO(savedOrder);
    }

    @Override
    @Transactional(readOnly = true)
    public ResultPaginationDTO getMyOrders(Long userId, Pageable pageable) {
        Long companyId = companyService.getCompanyIdByUserId(userId);
        if (companyId == null) {
            throw AppException.badRequest("Chưa có hồ sơ công ty.");
        }

        Page<Order> page = orderRepository.findByCompanyIdOrderByCreatedAtDesc(companyId, pageable);

        ResultPaginationDTO.Meta meta = new ResultPaginationDTO.Meta();
        meta.setPage(pageable.getPageNumber() + 1);
        meta.setPageSize(pageable.getPageSize());
        meta.setPages(page.getTotalPages());
        meta.setTotals(page.getTotalElements());

        List<ResOrderDTO> results = page.getContent().stream()
                .map(this::mapToDTO)
                .collect(Collectors.toList());

        ResultPaginationDTO response = new ResultPaginationDTO();
        response.setMeta(meta);
        response.setResult(results);

        return response;
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
            throw AppException.badRequest("Chỉ có thể hủy hóa đơn đang trong trạng thái chờ thanh toán (PENDING).");
        }

        order.setStatus(OrderStatus.CANCELLED);
        Order updatedOrder = orderRepository.save(order);

        return mapToDTO(updatedOrder);
    }

    @Override
    @Transactional(readOnly = true)
    public ResultPaginationDTO getAllOrders(OrderStatus status, Pageable pageable) {
        Page<Order> page;
        if (status != null) {
            page = orderRepository.findByStatusOrderByCreatedAtDesc(status, pageable);
        } else {
            page = orderRepository.findAllByOrderByCreatedAtDesc(pageable);
        }

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
        Order updatedOrder = orderRepository.save(order);
        return mapToDTO(updatedOrder);
    }

    private ResOrderDTO mapToDTO(Order entity) {
        List<ResOrderItemDTO> itemDTOs = new ArrayList<>();
        if (entity.getOrderItems() != null) {
            itemDTOs = entity.getOrderItems().stream().map(item -> ResOrderItemDTO.builder()
                    .id(item.getId())
                    .itemType(item.getItemType())
                    .servicePackageId(item.getServicePackageId())
                    .addonPackageId(item.getAddonPackageId())
                    .quantity(item.getQuantity())
                    .unitPrice(item.getUnitPrice())
                    .totalPrice(item.getTotalPrice())
                    .billingCycle(item.getBillingCycle())
                    .durationDays(item.getDurationDays())
                    .build()
            ).collect(Collectors.toList());
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
                .build();
    }
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
    public List<ResAddonPackageDTO> getPublicActiveAddonPackages(AddonPackageGroup groupCode) {
        List<AddonPackage> packages;
        if (groupCode != null) {
            packages = addonPackageRepository.findByIsActiveTrueAndGroupCode(groupCode);
        } else {
            packages = addonPackageRepository.findByIsActiveTrue();
        }
        return packages.stream().map(this::mapToDTO).collect(Collectors.toList());
    }

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
