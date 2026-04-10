import type { CartItem } from "@/lib/types";

export const buildWhatsAppUrl = (
  phone: string,
  items: CartItem[],
  customIntro = "Hola, quiero pedir:"
) => {
  const total = items.reduce((acc, item) => acc + item.price * item.qty, 0);
  const lines = items.flatMap((item) =>
    Array.from({ length: item.qty }, () => `* ${item.name} ($${item.price})`)
  );

  const message = `${customIntro}\n\n${lines.join("\n")}\nTotal: $${total.toFixed(2)}`;
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
};
