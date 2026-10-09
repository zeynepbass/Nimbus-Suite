"use client";

import { useState } from "react";
import { DetailActions, DetailPage } from "@/components/common/DetailPage";
import InfoCard from "@/components/common/InfoCard";
import StatusBadge from "@/components/common/StatusBadge";
import ProductEditSheet from "@/components/features/products/ProductEditSheet";
import usePrint from "@/hooks/usePrint";
import { formatCurrency, formatDate } from "@/lib/format";
import { downloadProductPDF } from "@/lib/pdf";
import { getProductRevenue } from "@/lib/products";

export default function ProductDetails({ product: initialProduct }) {
  const [product, setProduct] = useState(initialProduct);
  const { contentRef, print } = usePrint();

  const fields = [
    { label: "Ürün Adı", value: product.name },
    { label: "Kategori", value: product.category },
    { label: "Fiyat", value: formatCurrency(product.price) },
    { label: "Stok", value: product.stock },
    { label: "Kritik Stok", value: product.criticalStock },
    { label: "Satılan Ürün Sayısı", value: product.sold },
    { label: "Durum", value: <StatusBadge status={product.status} /> },
    { label: "Tarih", value: formatDate(product.createdAt) },
    { label: "Toplam", value: formatCurrency(getProductRevenue(product)) },
  ];

  return (
    <DetailPage>
      <div ref={contentRef}>
        <InfoCard title="Ürün Detayı" description={product.id} fields={fields} />
      </div>

      <DetailActions
        printLabel="Yazdır"
        onPrint={print}
        onDownload={() => downloadProductPDF(product)}
      >
        <ProductEditSheet product={product} onSave={setProduct} />
      </DetailActions>
    </DetailPage>
  );
}
