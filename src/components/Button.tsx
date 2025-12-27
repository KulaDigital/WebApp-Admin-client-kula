
interface buttonProps {
color: 'primary' | 'secondary';
onClick: () => void;
}

export default function Button({ color, onClick }: buttonProps) {

    return (
        <button color={color} onClick={onClick} />
    )
}