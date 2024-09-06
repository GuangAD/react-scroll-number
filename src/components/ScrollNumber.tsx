import ScrollNumberItem from "./ScrollNumberItem.tsx";
import style from "./ScrollNumber.module.css";
interface IScrollNumberProps {
  value: number;
  transformDuration?: number;
  fractionDigits?: number;
  prefix?: string;
  infix?: string;
  suffix?: string;
  thousandSeparator?: string;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function isNumber(x: any): x is number {
  return !Number.isNaN(+x);
}

type FormatNumbersReturn = [Array<string>, number];

export default function ScrollNumber({
  value,
  transformDuration = 1500,
  fractionDigits = 0,
  prefix = "",
  infix = "",
  suffix = "",
  thousandSeparator = ",",
}: IScrollNumberProps) {
  function formatNumbers(
    value: number,
    fractionDigits: number,
    prefix: string,
    infix: string,
    suffix: string,
    thousandSeparator: string
  ): FormatNumbersReturn {
    // 分隔
    const isNegative = value < 0;
    const digits: Array<string> = value.toFixed(fractionDigits).split("");
    const numberLength =
      fractionDigits <= 0 ? digits.length : digits.length - 1;
    // 千分位符
    if (thousandSeparator) {
      let counter = 0;
      const target = isNegative ? 1 : 0;
      for (let i = digits.length - fractionDigits - 2; i > target; i--) {
        counter++;
        if (counter > 0 && counter % 3 == 0) {
          digits.splice(i, 0, thousandSeparator);
        }
      }
    }
    // 后缀
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    suffix && digits.push(suffix);
    // 前缀2
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    infix && (value < 0 ? digits.splice(1, 0, infix) : digits.unshift(infix));
    // 前缀1
    // eslint-disable-next-line @typescript-eslint/no-unused-expressions
    prefix && digits.unshift(prefix);
    return [digits, numberLength];
  }

  const [numbers, numberLength] = formatNumbers(
    value,
    fractionDigits,
    prefix,
    infix,
    suffix,
    thousandSeparator
  );
  console.log("🚀 ~ numbers:", numbers);
  return (
    <div className={style["scroll-number-wrapper"]}>
      {numbers.map((it, index) => {
        return isNumber(it) ? (
          <ScrollNumberItem
            key={numberLength - index}
            value={Number(it)}
            transformDuration={transformDuration}
          />
        ) : (
          <span key={it}>{it}</span>
        );
      })}
    </div>
  );
}
