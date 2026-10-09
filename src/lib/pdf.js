import { PAYMENT_LABELS, STATUS } from "@/constants/status";
import { formatDate } from "@/lib/format";

const UNSUPPORTED_CHARS = {
  ş: "s",
  Ş: "S",
  ğ: "g",
  Ğ: "G",
  ı: "i",
  İ: "I",
  "₺": "TL ",
  "⭐": "",
};

const toPdfText = (value) =>
  Array.isArray(value)
    ? value.map(toPdfText)
    : String(value).replace(/[şŞğĞıİ₺⭐]/g, (char) => UNSUPPORTED_CHARS[char]);

async function createDocument() {
  const [{ default: jsPDF }, { default: autoTable }] = await Promise.all([
    import("jspdf"),
    import("jspdf-autotable"),
  ]);

  const doc = new jsPDF();
  const writeText = doc.text.bind(doc);
  doc.text = (text, ...rest) => writeText(toPdfText(text), ...rest);

  return { doc, autoTable };
}

export const downloadOrderPDF = async (order) => {
  const { doc, autoTable } = await createDocument();

  doc.setFontSize(18);
  doc.text("Siparis Faturasi", 14, 20);

  doc.setFontSize(11);
  doc.text(`Siparis No: ${order.id}`, 14, 30);
  doc.text(`Müsteri: ${order.customerName}`, 14, 36);
  doc.text(`Tarih: ${formatDate(order.createdAt)}`, 14, 42);
  doc.text(`Ödeme: ${PAYMENT_LABELS[order.paymentMethod] ?? order.paymentMethod}`, 14, 48);
  const timeline = order.timeline || [];
  const lastStep = timeline[timeline.length - 1];
  doc.text(`Durum: ${lastStep ? lastStep.label : "Bilinmiyor"}`, 14, 54);

  autoTable(doc, {
    startY: 65,
    head: [["Ürün", "Fiyat", "Adet", "Toplam"]],
    body: order.items.map((item) => [
      item.name,
      `₺${item.price}`,
      item.quantity,
      `₺${item.price * item.quantity}`,
    ]),
  });

  const subTotal = order.items.reduce(
    (sum, i) => sum + i.price * i.quantity,
    0
  );

  const finalY = doc.lastAutoTable.finalY + 10;

  doc.text(`Genel Toplam: ₺${subTotal}`, 14, finalY);

  doc.save(`siparis-${order.id}.pdf`);
};

export const downloadProductPDF = async (order) => {
  const { doc, autoTable } = await createDocument();

  doc.setFontSize(18);
  doc.text("Ürün Raporu", 14, 20);

  doc.setFontSize(11);
  let y = 30;

  doc.text(`Ürün No: ${order.id}`, 14, y);
  y += 6;
  doc.text(`Ürün Adı: ${order.name}`, 14, y);
  y += 6;
  doc.text(`Kategori: ${order.category}`, 14, y);
  y += 6;
  doc.text(`Fiyat: ₺${order.price}`, 14, y);
  y += 6;
  doc.text(`Stok: ${order.stock}`, 14, y);
  y += 6;
  doc.text(`Kritik Stok: ${order.criticalStock}`, 14, y);
  y += 6;
  doc.text(`Satılan Ürün Sayısı: ${order.sold}`, 14, y);
  y += 6;
  doc.text(`Durum: ${STATUS[order.status]?.label ?? order.status}`, 14, y);
  y += 6;
  doc.text(`Oluşturulma Tarihi: ${formatDate(order.createdAt)}`, 14, y);

  autoTable(doc, {
    startY: y + 10,
    head: [
      [
        "Ürün No",
        "Ürün Adı",
        "Kategori",
        "Fiyat",
        "Satılan",
        "Toplam Tutar",
        "Durum",
      ],
    ],
    body: [
      [
        order.id,
        order.name,
        order.category,
        `₺${order.price}`,
        order.sold,
        `₺${order.price * order.sold}`,
        STATUS[order.status]?.label ?? order.status,
      ],
    ],
  });

  const finalY = doc.lastAutoTable.finalY + 10;
  const total = order.price * order.sold;

  doc.setFontSize(13);
  doc.text(`Genel Toplam: ₺${total}`, 14, finalY);

  doc.save(`urun-${order.id}.pdf`);
};

export const downloadSupplierPDF = async (supplier) => {
  if (!supplier) return;

  const { doc } = await createDocument();

  let y = 10;

  doc.setFontSize(16);
  doc.text("Tedarikçi Bilgileri", 10, y);
  y += 10;

  doc.setFontSize(10);
  doc.text(`Oluşturulma Tarihi: ${new Date().toLocaleString("tr-TR")}`, 10, y);
  y += 10;

  doc.setFontSize(12);
  doc.text("Genel Bilgiler", 10, y);
  y += 6;

  doc.setFontSize(10);
  doc.text(`ID: ${supplier.id}`, 10, y);
  y += 5;
  doc.text(`Firma Adı: ${supplier.name}`, 10, y);
  y += 5;
  doc.text(`Firma Türü: ${supplier.companyType}`, 10, y);
  y += 5;
  doc.text(`Durum: ${STATUS[supplier.status]?.label ?? supplier.status}`, 10, y);
  y += 5;
  doc.text(`Puan: ${supplier.rating}`, 10, y);
  y += 10;

  doc.setFontSize(12);
  doc.text("İletişim Bilgileri", 10, y);
  y += 6;

  doc.setFontSize(10);
  doc.text(`Yetkili: ${supplier.contact?.person}`, 10, y);
  y += 5;
  doc.text(`Email: ${supplier.contact?.email}`, 10, y);
  y += 5;
  doc.text(`Telefon: ${supplier.contact?.phone}`, 10, y);
  y += 10;

  doc.setFontSize(12);
  doc.text("Adres", 10, y);
  y += 6;

  doc.setFontSize(10);
  doc.text(`Şehir: ${supplier.address?.city}`, 10, y);
  y += 5;
  doc.text(`İlçe: ${supplier.address?.district}`, 10, y);
  y += 5;
  doc.text(`Adres: ${supplier.address?.fullAddress}`, 10, y);
  y += 10;

  doc.setFontSize(12);
  doc.text("Tedarik Edilen Ürünler", 10, y);
  y += 6;

  doc.setFontSize(10);

  supplier.products?.forEach((product, index) => {
    doc.text(`${index + 1}. ${product.name} (ID: ${product.productId})`, 10, y);
    y += 5;

    doc.text(`   Birim Fiyat: ₺${product.supplyPrice}`, 10, y);
    y += 5;
    doc.text(`   Minimum Sipariş: ${product.minOrder}`, 10, y);
    y += 5;
    doc.text(`   Teslim Süresi: ${product.leadTimeDays} gün`, 10, y);
    y += 8;

    if (y > 270) {
      doc.addPage();
      y = 10;
    }
  });

  doc.setFontSize(8);
  doc.text("Bu belge sistem tarafından otomatik oluşturulmuştur.", 10, 290);

  doc.save(`supplier-${supplier.id}.pdf`);
};

export const downloadEmployeePDF = async (user) => {
  const { doc, autoTable } = await createDocument();

  doc.setFontSize(18);
  doc.text("Personel Detay Bilgileri", 14, 20);

  doc.setFontSize(11);
  doc.text(`Ad Soyad: ${user.firstName} ${user.lastName}`, 14, 35);
  doc.text(`Departman: ${user.department}`, 14, 42);
  doc.text(`Pozisyon: ${user.position}`, 14, 49);
  doc.text(`E-posta: ${user.email}`, 14, 56);
  doc.text(`Telefon: ${user.phone}`, 14, 63);

  doc.text(
    `Adres: ${user.address.fullAddress}`,
    14,
    72,
    { maxWidth: 180 }
  );

  doc.text(
    `Üniversite: ${user.education.university} / ${user.education.faculty}`,
    14,
    84
  );

  doc.text(
    `İşe Giriş Tarihi: ${formatDate(user.employment.startDate)}`,
    14,
    92
  );

  doc.text(
    `Çalışma Tipi: ${user.employment.workType}`,
    14,
    100
  );

  doc.text(
    `Performans Puanı: ⭐ ${user.performanceScore}`,
    14,
    108
  );

  if (user.leaveDates?.length > 0) {
    doc.text("İzin Geçmişi", 14, 122);

    autoTable(doc, {
      startY: 128,
      head: [["Başlangıç", "Bitiş", "İzin Türü"]],
      body: user.leaveDates.map((leave) => [
        formatDate(leave.from),
        formatDate(leave.to),
        leave.type,
      ]),
    });
  }

  doc.save(
    `${user.firstName}-${user.lastName}-personel-bilgileri.pdf`
  );
};
