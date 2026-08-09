import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";
import { ShoppingCart, ArrowRight, Trash2 } from "lucide-react";

export const metadata: Metadata = {
  title: "Cart",
  description: `Your shopping cart on ${site.brand}.`,
};

export default function CartPage() {
  return (
    <>
      <section className="bg-[#121619] py-16 border-b border-[#2c3237]">
        <div className="mx-auto max-w-5xl px-5">
          <p className="eyebrow text-[#198754]">Express Checkout</p>
          <h1 className="mt-2 text-[32px] font-bold tracking-[-0.02em] text-white sm:text-[40px]">
            Cart
          </h1>
          <div className="mt-3 flex items-center gap-2 text-[13.5px] text-[#adb5bd]">
            <Link href="/" className="hover:text-white">Home</Link>
            <span>&raquo;</span>
            <span className="text-white font-semibold">Cart</span>
          </div>
        </div>
      </section>

      <section className="bg-[#f8f9fa] py-16">
        <div className="mx-auto max-w-5xl px-5">
          <div className="grid gap-8 lg:grid-cols-[1.5fr_1fr]">
            {/* Cart Table */}
            <div className="rounded-xl border border-[#e2e8f0] bg-white overflow-hidden shadow-modern-soft">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-[#1c2126] text-white text-[13px] font-bold uppercase tracking-[0.05em]">
                      <th className="py-4 px-6">Product</th>
                      <th className="py-4 px-6">Details</th>
                      <th className="py-4 px-6 text-right">Total</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#e2e8f0] text-[14.5px]">
                    <tr>
                      <td className="py-6 px-6">
                        <div className="flex items-center gap-4">
                          <div className="w-14 h-14 bg-[#f8f9fa] border border-[#e2e8f0] rounded-lg flex items-center justify-center text-[#64748b]">
                            <ShoppingCart size={24} />
                          </div>
                          <div>
                            <p className="font-bold text-[#121619]">Boat Standard Package</p>
                            <p className="text-[12.5px] text-[#64748b]">VIN Report &bull; 12-hour delivery</p>
                          </div>
                        </div>
                      </td>
                      <td className="py-6 px-6 text-[#495057]">
                        $89.99
                      </td>
                      <td className="py-6 px-6 text-right font-bold text-[#121619]">
                        $89.99
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="p-6 bg-[#f8f9fa] border-t border-[#e2e8f0] flex items-center justify-between">
                <span className="text-[13.5px] text-[#64748b]">Quantity: 1</span>
                <Link
                  href="/pricing?type=boat"
                  className="text-[13.5px] font-semibold text-[#198754] hover:underline"
                >
                  Continue shopping
                </Link>
              </div>
            </div>

            {/* Cart Totals */}
            <div className="rounded-xl border border-[#e2e8f0] bg-white p-8 shadow-modern-soft self-start">
              <h2 className="text-[18px] font-bold text-[#121619]">Cart Totals</h2>

              <div className="mt-6 divide-y divide-[#e2e8f0] text-[14.5px]">
                <div className="flex justify-between py-3 text-[#495057]">
                  <span>Subtotal</span>
                  <span className="font-semibold text-[#121619]">$89.99</span>
                </div>
                <div className="flex justify-between py-4 text-[16px] font-bold text-[#121619]">
                  <span>Estimated total</span>
                  <span className="text-[#198754]">$89.99</span>
                </div>
              </div>

              <Link
                href="/checkout?type=boat&tier=standard"
                className="mt-6 flex w-full items-center justify-center gap-2 rounded-md bg-[#198754] hover:bg-[#157347] px-6 py-4 text-[13px] font-bold uppercase tracking-[0.1em] text-white transition shadow-sm"
              >
                Proceed to Checkout <ArrowRight size={16} />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
