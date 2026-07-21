import { Minus, Plus, Loader2 } from "../common/Icons";

export default function QuantitySelector({ value, onIncrement, onDecrement, disabled, min = 1 }) {
    return (
        <div className="flex items-center border border-ink/15 rounded-lg w-fit">
            <button
                onClick={onDecrement}
                disabled={disabled || value <= min}
                className="w-9 h-9 flex items-center justify-center text-ink/60 hover:text-ink transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <Minus size={14} />
            </button>
            <span className="w-10 flex items-center justify-center text-sm font-medium">
                {disabled ? <Loader2 size={13} className="animate-spin text-ink/40" /> : value}
            </span>
            <button
                onClick={onIncrement}
                disabled={disabled}
                className="w-9 h-9 flex items-center justify-center text-ink/60 hover:text-ink transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
                <Plus size={14} />
            </button>
        </div>
    );
};