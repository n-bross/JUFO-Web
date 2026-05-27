import bearWatermark from '@/assets/images/jufo-bear-watermark.svg';

const toneClass = {
  dark: 'text-black',
  light: 'text-white',
} as const;

type BrandWatermarkProps = {
  className?: string;
  tone?: keyof typeof toneClass;
};

export function BrandWatermark({ className = '', tone = 'dark' }: BrandWatermarkProps) {
  return (
    <div
      aria-hidden="true"
      className={`brand-watermark ${toneClass[tone]} ${className}`}
      style={{ backgroundImage: `url(${bearWatermark})` }}
    />
  );
}
