import React, { useState } from 'react';

export default function Bai1() {
    const [name, setName] = useState<string>('Tên của bạn');

    return (
        <div>
            <h1>Hello, {name}!</h1> 
        </div>
    );
}
