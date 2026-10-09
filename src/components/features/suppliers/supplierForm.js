import { isBlank, isEmail } from "@/lib/validation";

export const EMPTY_SUPPLIER = {
  name: "",
  companyType: "",
  contact: { person: "", email: "", phone: "" },
  address: { city: "", district: "", fullAddress: "" },
  products: [],
  rating: 0,
  status: "active",
};

export function validateSupplier(supplier) {
  if (isBlank(supplier.name)) return "Firma adı zorunlu";
  if (isBlank(supplier.contact?.person)) return "Yetkili kişi zorunlu";
  if (!isBlank(supplier.contact?.email) && !isEmail(supplier.contact.email)) {
    return "Geçerli bir e-posta girin";
  }

  return null;
}
