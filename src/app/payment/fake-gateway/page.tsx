"use client";

import { useMemo, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { CreditCard, Lock, ShieldCheck, Landmark } from "lucide-react";

function FakeGatewayContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [cardNumber, setCardNumber] = useState("");
  const [cvv2, setCvv2] = useState("");
  const [expMonth, setExpMonth] = useState("");
  const [expYear, setExpYear] = useState("");
  const [pin, setPin] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  const paymentId = searchParams.get("paymentId") || "";
  const amount = Number(searchParams.get("amount") || 0);
  const callback = searchParams.get("callback") || "/";

  const formattedAmount = useMemo(
    () => amount.toLocaleString("fa-IR"),
    [amount],
  );

  const formatCard = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 16);
    return digits.replace(/(\d{4})(?=\d)/g, "$1-");
  };

  const buildReturnUrl = (status: "success" | "failed") => {
    try {
      const url = new URL(callback, window.location.origin);
      url.searchParams.set("status", status);
      url.searchParams.set("paymentId", paymentId);
      return url.pathname + url.search;
    } catch {
      return `/fast-reserve?status=${status}&paymentId=${paymentId}`;
    }
  };

  const verifyAndRedirect = async (status: "success" | "failed") => {
    setIsSubmitting(true);
    setError("");
    try {
      if (paymentId) {
        await axios.post("/api/payments/verify", {
          paymentId: Number(paymentId),
          status,
        });
      }
      router.push(buildReturnUrl(status));
    } catch {
      setError("خطا در ثبت نتیجه پرداخت. دوباره تلاش کنید.");
      setIsSubmitting(false);
    }
  };

  const handlePay = async (e: React.FormEvent) => {
    e.preventDefault();
    const digits = cardNumber.replace(/\D/g, "");
    if (digits.length < 16 || cvv2.length < 3 || !expMonth || !expYear || pin.length < 4) {
      setError("اطلاعات کارت را کامل وارد کنید.");
      return;
    }
    await verifyAndRedirect("success");
  };

  const inputClass =
    "w-full h-10 sm:h-11 border border-gray-200 rounded-xl px-3 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0d3b66]/30 focus:border-[#0d3b66]/40 transition placeholder:text-gray-300";

  return (
    <div
      dir="rtl"
      className="min-h-dvh w-full bg-gradient-to-b from-[#071a2e] via-[#0d3b66] to-[#1a5f8a] flex flex-col"
    >
      <header className="shrink-0 px-4 sm:px-6 py-3 sm:py-4 flex items-center justify-between gap-3 text-white border-b border-white/10 backdrop-blur-sm">
        <div className="flex items-center gap-3 min-w-0">
          <div className="flex h-10 w-10 sm:h-11 sm:w-11 shrink-0 items-center justify-center rounded-xl bg-white/15 ring-1 ring-white/20 shadow-lg">
            <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6 text-emerald-300" strokeWidth={2.25} />
          </div>
          <div className="min-w-0">
            <p className="text-sm sm:text-base font-bold truncate leading-tight">
              درگاه پرداخت آزمایشی
            </p>
            <p className="text-[10px] sm:text-xs text-white/55 truncate">
              شبیه‌ساز بانکی — بدون تراکنش واقعی
            </p>
          </div>
        </div>
        <span className="shrink-0 rounded-full bg-amber-400/15 px-2.5 py-1 text-[10px] sm:text-xs font-semibold text-amber-200 ring-1 ring-amber-300/25 tracking-wide">
          DEMO
        </span>
      </header>

      <main className="flex-1 w-full flex items-start sm:items-center justify-center px-4 py-4 sm:py-8">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl sm:rounded-3xl shadow-2xl shadow-black/30 overflow-hidden ring-1 ring-black/5">
            <div className="relative bg-gradient-to-l from-[#0d3b66] to-[#164e7a] px-5 py-5 sm:py-6 text-white overflow-hidden">
              <div className="absolute -left-8 -top-8 h-32 w-32 rounded-full bg-white/5" />
              <div className="absolute -right-4 bottom-0 h-20 w-20 rounded-full bg-white/5" />
              <div className="relative flex items-start justify-between gap-4">
                <div className="min-w-0">
                  <div className="flex items-center gap-2 mb-3">
                    <Landmark className="w-4 h-4 text-white/70 shrink-0" />
                    <span className="text-xs text-white/70">بانک آزمایشی</span>
                  </div>
                  <p className="text-xs text-white/60 mb-1">مبلغ قابل پرداخت</p>
                  <p className="text-2xl sm:text-3xl font-bold tabular-nums leading-none">
                    {formattedAmount}
                    <span className="text-sm font-medium text-white/70 mr-1.5">تومان</span>
                  </p>
                </div>
                <div className="shrink-0 text-left" dir="ltr">
                  <p className="text-[10px] text-white/50 uppercase tracking-wider">Payment ID</p>
                  <p className="font-mono text-sm text-white/90 mt-0.5">{paymentId || "—"}</p>
                </div>
              </div>
            </div>

            <div className="mx-5 -mt-3 relative z-10 rounded-xl bg-gradient-to-br from-slate-700 via-slate-800 to-slate-900 p-4 text-white shadow-lg">
              <div className="flex items-center justify-between mb-6">
                <div className="h-7 w-10 rounded-md bg-gradient-to-br from-amber-300 to-amber-500 opacity-90" />
                <CreditCard className="w-7 h-7 text-white/40" strokeWidth={1.5} />
              </div>
              <p dir="ltr" className="font-mono text-base sm:text-lg tracking-[0.2em] text-white/90 text-center">
                {cardNumber || "6037 •••• •••• ••••"}
              </p>
              <div className="mt-4 flex justify-between text-[10px] text-white/50">
                <span>VALID THRU</span>
                <span>CVV2</span>
              </div>
            </div>

            <div className="px-5 pt-3 pb-1">
              <div className="flex items-center gap-2 text-[11px] sm:text-xs text-emerald-700 bg-emerald-50 rounded-lg px-3 py-2 ring-1 ring-emerald-100">
                <Lock className="w-4 h-4 shrink-0 text-emerald-600" />
                <span className="leading-snug">
                  اتصال امن شبیه‌سازی‌شده — هیچ مبلغ واقعی کسر نمی‌شود
                </span>
              </div>
            </div>

            <form
              onSubmit={handlePay}
              className="px-5 pb-5 pt-3 flex flex-col gap-3 sm:gap-3.5"
            >
              <label className="flex flex-col gap-1.5">
                <span className="text-xs sm:text-sm text-gray-600 font-medium">شماره کارت</span>
                <div className="relative">
                  <CreditCard className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 sm:w-5 sm:h-5 text-gray-400 pointer-events-none" />
                  <input
                    dir="ltr"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="6037-****-****-****"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCard(e.target.value))}
                    className={`${inputClass} pr-10 pl-3 tracking-wider text-center sm:text-left`}
                  />
                </div>
              </label>

              <div className="grid grid-cols-5 gap-2.5">
                <label className="flex flex-col gap-1.5 col-span-2">
                  <span className="text-xs sm:text-sm text-gray-600 font-medium">CVV2</span>
                  <input
                    dir="ltr"
                    inputMode="numeric"
                    autoComplete="cc-csc"
                    maxLength={4}
                    placeholder="***"
                    value={cvv2}
                    onChange={(e) => setCvv2(e.target.value.replace(/\D/g, "").slice(0, 4))}
                    className={`${inputClass} text-center`}
                  />
                </label>
                <label className="flex flex-col gap-1.5 col-span-3">
                  <span className="text-xs sm:text-sm text-gray-600 font-medium">تاریخ انقضا</span>
                  <div className="flex gap-2 items-center" dir="ltr">
                    <input
                      inputMode="numeric"
                      autoComplete="cc-exp-month"
                      maxLength={2}
                      placeholder="MM"
                      value={expMonth}
                      onChange={(e) =>
                        setExpMonth(e.target.value.replace(/\D/g, "").slice(0, 2))
                      }
                      className={`${inputClass} text-center`}
                    />
                    <span className="text-gray-400 text-sm shrink-0">/</span>
                    <input
                      inputMode="numeric"
                      autoComplete="cc-exp-year"
                      maxLength={2}
                      placeholder="YY"
                      value={expYear}
                      onChange={(e) =>
                        setExpYear(e.target.value.replace(/\D/g, "").slice(0, 2))
                      }
                      className={`${inputClass} text-center`}
                    />
                  </div>
                </label>
              </div>

              <label className="flex flex-col gap-1.5">
                <span className="text-xs sm:text-sm text-gray-600 font-medium">رمز دوم (اینترنتی)</span>
                <input
                  dir="ltr"
                  type="password"
                  inputMode="numeric"
                  autoComplete="off"
                  maxLength={8}
                  placeholder="••••••"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 8))}
                  className={`${inputClass} text-center tracking-[0.35em]`}
                />
              </label>

              {error && (
                <p className="text-xs sm:text-sm text-red-600 bg-red-50 rounded-xl px-3 py-2 leading-snug ring-1 ring-red-100">
                  {error}
                </p>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mt-1">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 sm:h-12 order-1 sm:order-2 bg-[#0d3b66] hover:bg-[#0a2f52] active:scale-[0.99] disabled:bg-gray-400 text-white rounded-full text-sm font-semibold transition shadow-md shadow-[#0d3b66]/20 touch-manipulation"
                >
                  {isSubmitting ? "در حال پردازش..." : "پرداخت"}
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => verifyAndRedirect("failed")}
                  className="w-full h-11 sm:h-12 order-2 sm:order-1 border border-gray-200 text-gray-600 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 rounded-full text-sm font-medium transition touch-manipulation"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>

          <p className="text-center text-white/40 text-[11px] sm:text-xs mt-4 leading-relaxed px-2">
            این صفحه یک شبیه‌ساز است و به بانک واقعی متصل نیست.
            <br className="sm:hidden" />
            {" "}برای تست جریان رزرو روی Vercel استفاده می‌شود.
          </p>
        </div>
      </main>
    </div>
  );
}

export default function FakeGatewayPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-dvh flex flex-col items-center justify-center gap-3 bg-gradient-to-b from-[#071a2e] to-[#0d3b66] text-white px-4">
          <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-white/10 ring-1 ring-white/20">
            <ShieldCheck className="w-7 h-7 text-emerald-300 animate-pulse" />
          </div>
          <p className="text-sm">در حال بارگذاری درگاه...</p>
        </div>
      }
    >
      <FakeGatewayContent />
    </Suspense>
  );
}
