"use client";

import { useMemo, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { CreditCard, Lock, ShieldCheck } from "lucide-react";

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

  /* Compact inputs so the form fits ≤768px height without scroll */
  const inputClass =
    "w-full h-9 min-[900px]:h-10 border border-gray-200 rounded-lg px-2.5 text-[13px] min-[900px]:text-sm bg-white focus:outline-none focus:ring-2 focus:ring-[#0d3b66]/30 focus:border-[#0d3b66]/40 transition";

  return (
    <div
      dir="rtl"
      className="h-dvh max-h-dvh w-full overflow-hidden bg-gradient-to-b from-[#0a2744] via-[#0d3b66] to-[#164e7a] flex flex-col"
    >
      <header className="shrink-0 px-3 sm:px-5 py-2 flex items-center justify-between gap-2 text-white/90 border-b border-white/10">
        <div className="flex items-center gap-1.5 min-w-0">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span className="text-xs sm:text-sm font-semibold truncate">
            درگاه پرداخت آزمایشی
          </span>
        </div>
        <span className="text-[10px] text-white/45 shrink-0 tracking-wide">
          DEMO ONLY
        </span>
      </header>

      <main className="flex-1 min-h-0 w-full overflow-y-auto overscroll-contain flex items-center justify-center px-3 py-2 sm:px-5 sm:py-3">
        {/* Wide enough on 1366, still centered; tighter vertical rhythm */}
        <div className="w-full max-w-[22rem] sm:max-w-[26rem] min-[1100px]:max-w-[28rem]">
          <div className="bg-white rounded-xl sm:rounded-2xl shadow-xl shadow-black/25 overflow-hidden">
            {/* Amount + secure note in one compact header row */}
            <div className="bg-[#f4f7fb] px-3.5 sm:px-5 py-2.5 sm:py-3 border-b border-gray-100">
              <div className="flex items-end justify-between gap-3">
                <div className="min-w-0">
                  <p className="text-[10px] sm:text-xs text-gray-500 mb-0.5">
                    مبلغ قابل پرداخت
                  </p>
                  <p className="text-xl sm:text-2xl font-bold text-[#0d3b66] tabular-nums leading-none">
                    {formattedAmount}
                    <span className="text-xs sm:text-sm font-medium text-gray-500 mr-1">
                      تومان
                    </span>
                  </p>
                </div>
                <div className="text-left shrink-0" dir="ltr">
                  <p className="text-[10px] text-gray-400">Payment ID</p>
                  <p className="font-mono text-xs text-gray-700">{paymentId || "—"}</p>
                </div>
              </div>
              <div className="mt-2 flex items-center gap-1.5 text-[10px] sm:text-[11px] text-emerald-700 bg-emerald-50/80 rounded-md px-2 py-1">
                <Lock className="w-3 h-3 shrink-0" />
                <span className="leading-tight truncate">
                  اتصال امن شبیه‌سازی‌شده — هیچ مبلغ واقعی کسر نمی‌شود
                </span>
              </div>
            </div>

            <form
              onSubmit={handlePay}
              className="px-3.5 sm:px-5 py-3 sm:py-3.5 flex flex-col gap-2 sm:gap-2.5"
            >
              <label className="flex flex-col gap-1">
                <span className="text-[11px] sm:text-xs text-gray-600">شماره کارت</span>
                <div className="relative">
                  <CreditCard className="absolute left-2.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
                  <input
                    dir="ltr"
                    inputMode="numeric"
                    autoComplete="cc-number"
                    placeholder="6037-****-****-****"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(formatCard(e.target.value))}
                    className={`${inputClass} pl-9 tracking-wider`}
                  />
                </div>
              </label>

              <div className="grid grid-cols-5 gap-2">
                <label className="flex flex-col gap-1 col-span-2">
                  <span className="text-[11px] sm:text-xs text-gray-600">CVV2</span>
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
                <label className="flex flex-col gap-1 col-span-3">
                  <span className="text-[11px] sm:text-xs text-gray-600">تاریخ انقضا</span>
                  <div className="flex gap-1.5 items-center" dir="ltr">
                    <input
                      inputMode="numeric"
                      autoComplete="cc-exp-month"
                      maxLength={2}
                      placeholder="ماه"
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
                      placeholder="سال"
                      value={expYear}
                      onChange={(e) =>
                        setExpYear(e.target.value.replace(/\D/g, "").slice(0, 2))
                      }
                      className={`${inputClass} text-center`}
                    />
                  </div>
                </label>
              </div>

              <label className="flex flex-col gap-1">
                <span className="text-[11px] sm:text-xs text-gray-600">رمز دوم (اینترنتی)</span>
                <input
                  dir="ltr"
                  type="password"
                  inputMode="numeric"
                  autoComplete="off"
                  maxLength={8}
                  placeholder="****"
                  value={pin}
                  onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 8))}
                  className={`${inputClass} text-center tracking-[0.3em]`}
                />
              </label>

              {error && (
                <p className="text-[11px] sm:text-xs text-red-600 bg-red-50 rounded-lg px-2.5 py-1.5 leading-snug">
                  {error}
                </p>
              )}

              {/* Side-by-side actions save height on laptop / landscape */}
              <div className="grid grid-cols-1 min-[420px]:grid-cols-2 gap-2 mt-0.5">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-9 min-[900px]:h-10 order-1 min-[420px]:order-2 bg-[#0d3b66] hover:bg-[#0a2f52] active:scale-[0.99] disabled:bg-gray-400 text-white rounded-full text-[13px] sm:text-sm font-semibold transition touch-manipulation"
                >
                  {isSubmitting ? "در حال پردازش..." : "پرداخت"}
                </button>

                <button
                  type="button"
                  disabled={isSubmitting}
                  onClick={() => verifyAndRedirect("failed")}
                  className="w-full h-9 min-[900px]:h-10 order-2 min-[420px]:order-1 border border-gray-300 text-gray-600 hover:bg-gray-50 active:bg-gray-100 disabled:opacity-50 rounded-full text-[13px] sm:text-sm font-medium transition touch-manipulation"
                >
                  انصراف
                </button>
              </div>
            </form>
          </div>

          <p className="text-center text-white/40 text-[10px] mt-2 leading-tight">
            این صفحه یک شبیه‌ساز است و به بانک واقعی متصل نیست
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
        <div className="h-dvh flex items-center justify-center bg-[#0d3b66] text-white text-sm px-4">
          در حال بارگذاری درگاه...
        </div>
      }
    >
      <FakeGatewayContent />
    </Suspense>
  );
}
