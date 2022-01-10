import React from 'react';


interface ITransferFieldProps {
    label: string,
    onChange: (value: number) => void
    onClick: () =>  void
    value: number
}

export const TransferField: React.FC<ITransferFieldProps> = ({ label, onClick, onChange, value: initialValue = 0 }) => {
    const [value, setValue] = React.useState(initialValue)

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value)
        setValue(value)
        onChange(value)
    }

    return (
        <div style={{ display: 'flex', border: '1px solid black', justifyContent: 'space-between',padding: 8 }}>
            <input onChange={handleInputChange} value={value} />
            <button onClick={onClick}>
                {label}
            </button>
        </div>
    );
}