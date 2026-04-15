<template>
  <div class="summary">
    <div class="summary__rows">
      <div class="summary__row">
        <span class="summary__label">Tạm tính</span>
        <span class="summary__value">11.880.000đ</span>
      </div>
      <div class="summary__row">
        <span class="summary__label">Giảm giá (20%)</span>
        <span class="summary__value summary__value--discount">-2.376.000đ</span>
      </div>
    </div>

    <div class="summary__total">
      <span class="summary__total-label">Tổng cộng</span>
      <div class="summary__total-right">
        <span class="summary__total-amount">9.504.000đ</span>
        <p class="summary__total-vat">Đã bao gồm 10% thuế giá trị gia tăng (VAT)</p>
      </div>
    </div>

    <div class="summary__actions">
      <button class="summary__btn-submit">Tiến hành thanh toán</button>
      <a href="#" class="summary__btn-back">Quay lại</a>
    </div>

    <div class="summary__security">
      <span class="material-symbols-outlined summary__security-icon">security</span>
      <p class="summary__security-text">
        Thông tin thanh toán của bạn được mã hóa và bảo mật tuyệt đối theo tiêu chuẩn quốc tế PCI DSS.
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
// Props nếu sau này muốn truyền dynamic
// defineProps<{ subtotal: number; discount: number; total: number }>()
</script>

<style scoped>
.summary { display: flex; flex-direction: column; gap: 1.5rem; }

.summary__rows {
  display: flex; flex-direction: column; gap: 1rem;
  padding-top: 1.5rem;
  border-top: 1px solid #e2e8f0;
}
.summary__row { display: flex; justify-content: space-between; align-items: center; font-size: 0.875rem; }
.summary__label { color: #64748b; font-weight: 500; }
.summary__value { font-weight: 700; color: #0f172a; }
.summary__value--discount { color: #059669; }

.summary__total {
  display: flex; justify-content: space-between; align-items: center;
  padding-top: 1rem;
  border-top: 1px dashed #e2e8f0;
}
.summary__total-label { font-size: 1.125rem; font-weight: 800; }
.summary__total-right { text-align: right; }
.summary__total-amount { font-size: 1.5rem; font-weight: 800; color: #4B9AF6; }
.summary__total-vat { font-size: 0.75rem; color: #64748b; margin-top: 4px; }

.summary__actions { display: flex; flex-direction: column; gap: 1rem; }
.summary__btn-submit {
  width: 100%;
  background: #4B9AF6;
  color: #fff;
  font-weight: 800;
  font-size: 1rem;
  padding: 1rem 0;
  border: none;
  border-radius: 0.75rem;
  cursor: pointer;
  box-shadow: 0 4px 12px rgba(75,154,246,0.25);
  transition: background 0.2s, transform 0.1s;
}
.summary__btn-submit:hover { background: #2563eb; }
.summary__btn-submit:active { transform: scale(0.98); }

.summary__btn-back {
  display: block;
  text-align: center;
  font-size: 0.875rem;
  font-weight: 700;
  color: #64748b;
  text-decoration: none;
  transition: color 0.2s;
}
.summary__btn-back:hover { color: #4B9AF6; }

.summary__security {
  display: flex; align-items: flex-start; gap: 12px;
  padding: 1rem;
  background: #f8fafd;
  border-radius: 0.75rem;
}
.summary__security-icon { color: #64748b; font-size: 1rem; flex-shrink: 0; }
.summary__security-text { font-size: 0.75rem; line-height: 1.6; color: #64748b; }
</style>