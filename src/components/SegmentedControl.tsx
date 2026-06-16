export interface SegmentedOption<T extends string | number> {
  label: string;
  value: T;
  ariaLabel?: string;
}

interface SegmentedControlProps<T extends string | number> {
  label: string;
  value: T;
  options: SegmentedOption<T>[];
  onChange: (value: T) => void;
  compact?: boolean;
}

export function SegmentedControl<T extends string | number>({ label, value, options, onChange, compact = false }: SegmentedControlProps<T>) {
  return (
    <div className="space-y-1">
      <span className="text-xs font-bold text-muted">{label}</span>
      <div className="grid rounded-app border border-hair bg-card p-1 shadow-sm" style={{ gridTemplateColumns: `repeat(${options.length}, minmax(0, 1fr))` }}>
        {options.map((option) => {
          const selected = option.value === value;
          return (
            <button
              key={option.value}
              type="button"
              aria-label={option.ariaLabel ?? option.label}
              aria-pressed={selected}
              onClick={() => onChange(option.value)}
              className={`min-h-11 rounded-[12px] px-2 text-sm font-bold transition ${compact ? "text-xs" : ""} ${
                selected ? "bg-ink text-white shadow-soft" : "text-muted hover:bg-paper"
              }`}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}
