
interface buttonProps {
    color: 'primary' | 'secondary';
    onClick: () => void;
    label: string;
}

export default function Button({ color, onClick, label }: buttonProps) {

    return (
        <button color={color} label={label} onClick={onClick} />
    )
}