
interface buttonProps {
    color?: 'primary' | 'secondary';
    onClick: () => void;
    label: string;
    disabled?: boolean;
}

export default function Button({ color = 'primary', onClick, label, disabled = false }: buttonProps) {

    return (
        <button 
            color={color} 
            onClick={onClick}
            disabled={disabled}
            className={disabled ? 'opacity-50 cursor-not-allowed' : ''}
        >
            {label}
        </button>
    )
}