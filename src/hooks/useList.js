"use client";

import { useState } from "react";
import { toast } from "sonner";

export default function useList(initialItems, { removeMessage = "İptal edildi" } = {}) {
  const [items, setItems] = useState(initialItems);

  const add = (item) => setItems((prev) => [...prev, item]);

  const update = (id, changes) =>
    setItems((prev) =>
      prev.map((item) => (item.id === id ? { ...item, ...changes } : item))
    );

  const remove = (id) => {
    setItems((prev) => prev.filter((item) => item.id !== id));
    toast.success(removeMessage);
  };

  return { items, add, update, remove };
}
