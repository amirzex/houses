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

  return (
    <div
      dir="rtl"
      className="min-h-screen bg-gradient-to-b from-[#0a2744] via-[#0d3b66] to-[#164e7a] flex flex-col items-center justify-center p-4"
    >
      <div className="w-full max-w-md">
        <div className="text-center mb-6 text-white">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 mb-3">
            <ShieldCheck className="w-8 h-8" />
          </div>
          <h1 className="text-xl font-bold tracking-wide">درگاه پرداخت آزمایشی</h1>
          <p className="text-sm text-white/70 mt-1">Fake Payment Gateway — فقط برای دمو</p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-[#f4f7fb] px-6 py-4 border-b flex items-center justify-between">
            <div>
              <p className="text-xs text-gray-500">مبلغ قابل پرداخت</p>
              <p className="text-2xl font-bold text-[#0d3b66]">
                {formattedAmount}
                <span className="text-sm font-medium text-gray-500 mr-1">تومان</span>
              </p>
            </div>
            <div className="text-left text-xs text-gray-500">
              <p>شناسه پرداخت</p>
              <p className="font-mono text-sm text-gray-800" dir="ltr">
                {paymentId || "—"}
              </p>
            </div>
          </div>

          <form onSubmit={handlePay} className="p-6 flex flex-col gap-4">
            <div className="flex items-center gap-2 text-xs text-emerald-700 bg-emerald-50 rounded-xl px-3 py-2">
              <Lock className="w-3.5 h-3.5 shrink-0" />
              اتصال امن شبیه‌سازی‌شده — هیچ مبلغ واقعی کسر نمی‌شود
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm text-gray-600">شماره کارت</span>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input
                  dir="ltr"
                  inputMode="numeric"
                  placeholder="6037-****-****-****"
                  value={cardNumber}
                  onChange={(e) => setCardNumber(formatCard(e.target.value))}
                  className="w-full border rounded-xl px-3 py-2.5 pl-10 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d3b66]/30"
                />
              </div>
            </label>

            <div className="grid grid-cols-3 gap-3">
              <label className="flex flex-col gap-1.5 col-span-1">
                <span className="text-sm text-gray-600">CVV2</span>
                <input
                  dir="ltr"
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="***"
                  value={cvv2}
                  onChange={(e) => setCvv2(e.target.value.replace(/\D/g, "").slice(0, 4))}
                  className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d3b66]/30"
                />
              </label>
              <label className="flex flex-col gap-1.5 col-span-2">
                <span className="text-sm text-gray-600">تاریخ انقضا</span>
                <div className="flex gap-2" dir="ltr">
                  <input
                    inputMode="numeric"
                    maxLength={2}
                    placeholder="ماه"
                    value={expMonth}
                    onChange={(e) => setExpMonth(e.target.value.replace(/\D/g, "").slice(0, 2))}
                    className="w-full border rounded-xl px-3 py-2.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#0d3b66]/30"
                  />
                  <span className="self-center text-gray-400">/</span>
                  <input
                    inputMode="numeric"
                    maxLength={2}
                    placeholder="سال"
                    value={expYear}
                    onChange={(e) => setExpYear(e.target.value.replace(/\D/g, "").slice(0, 2))}
                    className="w-full border rounded-xl px-3 py-2.5 text-sm text-center focus:outline-none focus:ring-2 focus:ring-[#0d3b66]/30"
                  />
                </div>
              </label>
            </div>

            <label className="flex flex-col gap-1.5">
              <span className="text-sm text-gray-600">رمز دوم (اینترنتی)</span>
              <input
                dir="ltr"
                type="password"
                inputMode="numeric"
                maxLength={8}
                placeholder="****"
                value={pin}
                onChange={(e) => setPin(e.target.value.replace(/\D/g, "").slice(0, 8))}
                className="w-full border rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-[#0d3b66]/30"
              />
            </label>

            {error && (
              <p className="text-sm text-red-600 bg-red-50 rounded-xl px-3 py-2">{error}</p>
            )}

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-[#0d3b66] hover:bg-[#0a2f52] disabled:bg-gray-400 text-white rounded-full py-3 font-semibold transition mt-2"
            >
              {isSubmitting ? "در حال پردازش..." : "پرداخت"}
            </button>

            <button
              type="button"
              disabled={isSubmitting}
              onClick={() => verifyAndRedirect("failed")}
              className="w-full border border-gray-300 text-gray-600 hover:bg-gray-50 disabled:opacity-50 rounded-full py-3 font-medium transition"
            >
              انصراف از پرداخت
            </button>
          </form>
        </div>

        <p className="text-center text-white/50 text-xs mt-4">
          این صفحه یک شبیه‌ساز است و به بانک واقعی متصل نیست
        </p>
      </div>
    </div>
  );
}

export default function FakeGatewayPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-[#0d3b66] text-white">
          در حال بارگذاری درگاه...
        </div>
      }
    >
      <FakeGatewayContent />
    </Suspense>
  );
}
