import React from 'react';


interface IInputFieldProps {
    label: string,
    onChange: (value: number) => void
    onClick: () =>  void
    value: number
    placeholder?: string
}

export const InputField: React.FC<IInputFieldProps> = ({ label, onClick, onChange, value, placeholder }) => {

    const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const value = Number(event.target.value)
        onChange(value)
    }

    return (
        <div style={{ display: 'flex', border: '1px solid black', justifyContent: 'space-between',padding: 8 }}>
            <input onChange={handleInputChange} value={value} placeholder={placeholder} />
            <button onClick={onClick}>
                {label}
            </button>
        </div>
    );
}