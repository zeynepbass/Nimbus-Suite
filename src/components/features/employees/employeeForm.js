import { isBlank, isEmail } from "@/lib/validation";

export const EMPTY_EMPLOYEE = {
  firstName: "",
  lastName: "",
  department: "",
  position: "",
  email: "",
  phone: "",
  address: { city: "", district: "", fullAddress: "" },
  education: { university: "", faculty: "", degree: "" },
  employment: { startDate: "", contractType: "", workType: "" },
  status: "active",
  performanceScore: 0,
};

export const withFullName = (employee) => ({
  ...employee,
  fullName: `${employee.firstName.trim()} ${employee.lastName.trim()}`,
});

export function validateEmployee(employee) {
  if (isBlank(employee.firstName) || isBlank(employee.lastName)) {
    return "Ad ve soyad zorunlu";
  }
  if (isBlank(employee.department) || isBlank(employee.position)) {
    return "Departman ve pozisyon zorunlu";
  }
  if (!isBlank(employee.email) && !isEmail(employee.email)) {
    return "Geçerli bir e-posta girin";
  }
  if (isBlank(employee.employment?.startDate)) {
    return "İşe başlama tarihi zorunlu";
  }

  return null;
}
