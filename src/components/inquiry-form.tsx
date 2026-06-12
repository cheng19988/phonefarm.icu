import { InquiryFormClient } from "@/components/inquiry-form-client";

type InquiryFormProps = {
  sourcePage: string;
  submitLabel?: string;
  className?: string;
  defaultProductInterest?: string;
  defaultMessage?: string;
};

/** Server-rendered inquiry shell — form HTML is in first paint (no Suspense loading state). */
export function InquiryForm({
  defaultProductInterest = "",
  defaultMessage = "",
  ...props
}: InquiryFormProps) {
  return (
    <InquiryFormClient
      {...props}
      defaultProductInterest={defaultProductInterest}
      defaultMessage={defaultMessage}
    />
  );
}
