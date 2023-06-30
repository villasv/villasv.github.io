import { TelescopicText as T } from "@/components/telescopic";

export default function Page() {
  return (
    <div>
      <p>
        I want{" "}
        <T wrap="to be happy">
          to live a <T wrap="fulfilling">full</T> and
          cheerful life
        </T>
      </p>
    </div>
  );
}
