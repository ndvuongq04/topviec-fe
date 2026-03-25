import { useAuthStore } from "@/stores/auth.store";
import { useCvsStore } from "@/stores/cvs.store";
import { useToast } from "@/composables/useToast";

export function useQuickApply() {
  const authStore = useAuthStore();
  const cvsStore = useCvsStore();
  const toast = useToast();

  const handleQuickApply = async (jobId: number | string, jobTitle: string) => {
    if (!authStore.isAuthenticated) {
      toast.info("Vui lòng đăng nhập để ứng tuyển nhanh");
      return;
    }

    if (cvsStore.cvs.length === 0) {
      await cvsStore.fetchMyCvs();
    }

    const defaultCv = cvsStore.cvs.find(cv => cv.isDefault);
    
    if (!defaultCv) {
      toast.warning(
        "Thiếu CV mặc định", 
        "Bạn cần thiết lập một CV làm mặc định để sử dụng chức năng ứng tuyển nhanh."
      );
      return;
    }

    // Mock application call
    try {
      // In real implementation: await applicationService.apply(jobId, defaultCv.id);
      console.log(`Quick Apply for Job ${jobId} using CV ${defaultCv.id}`);
      
      toast.success(
        "Ứng tuyển nhanh thành công!", 
        `Đã nộp hồ sơ "${defaultCv.title}" cho vị trí ${jobTitle}.`
      );
      
      return true;
    } catch (err) {
      toast.error("Lỗi", "Không thể thực hiện ứng tuyển nhanh. Vui lòng thử lại.");
      return false;
    }
  };

  return {
    handleQuickApply
  };
}
