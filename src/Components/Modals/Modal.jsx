import React, { useState } from 'react';
import Modal from 'react-modal';

const ExampleApp = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [data, setData] = useState([
        { id: 1, title: 'Ma\'lumot 1' },
        { id: 2, title: 'Ma\'lumot 2' },
        // Yana ma'lumotlar...
    ]);

    const openModal = () => setIsOpen(true);
    const closeModal = () => setIsOpen(false);

    return (
        <div>
            <button onClick={openModal}>Modalni Ochish</button>
            {data.map(item => (
                <Modal
                    key={item.id}
                    isOpen={isOpen}
                    onRequestClose={closeModal}
                >
                    <h2>{item.title}</h2>
                    <button onClick={closeModal}>Modalni Yopish</button>
                </Modal>
            ))}
        </div>
    );
}

export default ExampleApp;
