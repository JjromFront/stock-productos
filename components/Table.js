import React, { useState } from 'react';
import Modal from 'react-modal';


const Table = () => {
    const [data, setData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formValues, setFormValues] = useState({
        info1: '',
        info2: '',
        info3: '',
        info4: '',
        info5: '',
        info6: '',
        info7: '',
        info8: '',
    });
    const [editMode, setEditMode] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [editedData, setEditedData] = useState({});



    const handleEdit = (item) => {
        setEditedData(item);
        setEditMode(true);
    };

    const handleSave = () => {
        const newData = data.map((item) => {
            if (item.id === editedData.id) {
                return editedData;
            }
            return item;
        });
        setData(newData);
        setEditMode(false);
        setEditedData({});
    };

    const handleCancel = () => {
        setEditMode(false);
        setEditedData({});
    };


    const handleDelete = (item) => {
        const newData = data.filter((dataItem) => dataItem !== item);
        setData(newData);
    };

    const handleAdd = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setEditMode(false);
        setEditItem(null);
        setFormValues({
            info1: '',
            info2: '',
            info3: '',
            info4: '',
            info5: '',
            info6: '',
            info7: '',
            info8: '',
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editMode && editItem) {
            const updatedData = data.map((item) => {
                if (item === editItem) {
                    return formValues;
                }
                return item;
            });
            setData(updatedData);
            setEditMode(false);
            setEditItem(null);
        } else {
            const newData = [...data, formValues];
            setData(newData);
        }
        setFormValues({
            info1: '',
            info2: '',
            info3: '',
            info4: '',
            info5: '',
            info6: '',
            info7: '',
            info8: '',
        });
        closeModal();
    };

    const handleInputChange = (e, key) => {
        const { name, value } = e.target;
        if (key) {
            setEditedData((prevData) => ({
                ...prevData,
                [key]: value,
            }));
        } else {
            setFormValues({ ...formValues, [name]: value });
        }
    };

    const links =[
        {},
        {}
    ]
    return (
        <div className="flex items-center justify-center mt-12">
            <main className="flex flex-col">
                {/* Button */}
                <div className="mb-4">
                    <button
                        className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-12 h-12 flex items-center justify-center"
                        onClick={handleAdd}
                    >
                        <span className="text-xl font-bold leading-none">+</span>
                    </button>
                </div>

                {/* Tabla */}
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-pink">
                        <tr className="bg-pink-500 text-white">
                            <th className="py-3 px-6 font-bold uppercase tracking-wider">Item 1</th>
                            <th className="py-3 px-6 font-bold uppercase tracking-wider">Item 2</th>
                            <th className="py-3 px-6 font-bold uppercase tracking-wider">Item 3</th>
                            <th className="py-3 px-6 font-bold uppercase tracking-wider">Item 4</th>
                            <th className="py-3 px-6 font-bold uppercase tracking-wider">Item 5</th>
                            <th className="py-3 px-6 font-bold uppercase tracking-wider">Item 6</th>
                            <th className="py-3 px-6 font-bold uppercase tracking-wider">Item 7</th>
                            {/* <th className="py-3 px-6 font-bold uppercase tracking-wider">Item 8</th> */}
                            <th className="py-3 px-6 font-bold uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.length > 0 ? (
                            data.map((item, index) => (
                                <tr key={index}>
                                    <td className="py-4 px-6">
                                        {editMode ? (
                                            <input
                                                type="text"
                                                value={editedData.info1 || ''}
                                                onChange={(e) => handleInputChange(e, 'info1')}
                                                className="input-edit w-20"
                                            />
                                        ) : (
                                            item.info1
                                        )}
                                    </td>
                                    <td className="py-4 px-6">
                                        {editMode ? (
                                            <input
                                                type="text"
                                                value={editedData.info2 || ''}
                                                onChange={(e) => handleInputChange(e, 'info2')}
                                                className="input-edit w-20"
                                            />
                                        ) : (
                                            item.info2
                                        )}
                                    </td>
                                    <td className="py-4 px-6">
                                        {editMode ? (
                                            <input
                                                type="text"
                                                value={editedData.info3 || ''}
                                                onChange={(e) => handleInputChange(e, 'info3')}
                                                className="input-edit w-20"
                                            />
                                        ) : (
                                            item.info3
                                        )}
                                    </td>
                                    <td className="py-4 px-6">
                                        {editMode ? (
                                            <input
                                                type="text"
                                                value={editedData.info4 || ''}
                                                onChange={(e) => handleInputChange(e, 'info4')}
                                                className="input-edit w-20"
                                            />
                                        ) : (
                                            item.info4
                                        )}
                                    </td>
                                    <td className="py-4 px-6">
                                        {editMode ? (
                                            <input
                                                type="text"
                                                value={editedData.info5 || ''}
                                                onChange={(e) => handleInputChange(e, 'info5')}
                                                className="input-edit w-20"
                                            />
                                        ) : (
                                            item.info5
                                        )}
                                    </td>
                                    <td className="py-4 px-6">
                                        {editMode ? (
                                            <input
                                                type="text"
                                                value={editedData.info6 || ''}
                                                onChange={(e) => handleInputChange(e, 'info6')}
                                                className="input-edit w-20"
                                            />
                                        ) : (
                                            item.info6
                                        )}
                                    </td>
                                    <td className="py-4 px-6">
                                        {editMode ? (
                                            <input
                                                type="text"
                                                value={editedData.info7 || ''}
                                                onChange={(e) => handleInputChange(e, 'info7')}
                                                className="input-edit w-20"
                                            />
                                        ) : (
                                            item.info7
                                        )}
                                    </td>
                                    {/* <td className="py-4 px-6">
                                        {editMode ? (
                                            <input
                                                type="text"
                                                value={editedData.info8 || ''}
                                                onChange={(e) => handleInputChange(e, 'info8')}
                                                className="input-edit w-20"
                                            />
                                        ) : (
                                            item.info8
                                        )}
                                    </td> */}
                                    <td className="py-4 px-6 space-x-3">
                                        {editMode ? (
                                            <>
                                                <button className="btn-save bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={handleSave}>
                                                    Listo
                                                </button>
                                                <button className="btn-cancel bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={handleCancel}>
                                                    Cancelar
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button className="btn-edit bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded" onClick={() => handleEdit(item)}>
                                                    Editar
                                                </button>
                                                <button className="btn-delete bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded" onClick={() => handleDelete(item)}>
                                                    Eliminar
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan="9" className="py-4 px-6 text-center">
                                    No hay datos disponibles
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>


                {/* Modal */}
                <Modal
                    isOpen={modalIsOpen}
                    onRequestClose={closeModal}
                    className="modal absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg rounded-lg w-96 max-w-full p-6"
                    overlayClassName="overlay fixed top-0 left-0 w-full h-full bg-black/50"
                >
                    <div className="flex flex-col">
                        <h2 className="text-xl font-bold mb-4">Añadir Información</h2>
                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label htmlFor="info1" className="font-bold">Info 1:</label>
                                    <input
                                        type="text"
                                        id="info1"
                                        name="info1"
                                        value={formValues.info1}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="info2" className="font-bold">Info 2:</label>
                                    <input
                                        type="text"
                                        id="info2"
                                        name="info2"
                                        value={formValues.info2}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="info3" className="font-bold">Info 3:</label>
                                    <input
                                        type="text"
                                        id="info3"
                                        name="info3"
                                        value={formValues.info3}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="info4" className="font-bold">Info 4:</label>
                                    <input
                                        type="text"
                                        id="info4"
                                        name="info4"
                                        value={formValues.info4}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="info5" className="font-bold">Info 5:</label>
                                    <input
                                        type="text"
                                        id="info5"
                                        name="info5"
                                        value={formValues.info5}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="info6" className="font-bold">Info 6:</label>
                                    <input
                                        type="text"
                                        id="info6"
                                        name="info6"
                                        value={formValues.info6}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <div>
                                    <label htmlFor="info7" className="font-bold">Info 7:</label>
                                    <input
                                        type="text"
                                        id="info7"
                                        name="info7"
                                        value={formValues.info7}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                {/* <div>
                                    <label htmlFor="info8" className="font-bold">Info 8:</label>
                                    <input
                                        type="text"
                                        id="info8"
                                        name="info8"
                                        value={formValues.info8}
                                        onChange={handleInputChange}
                                        className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                                    />
                                </div> */}
                            </div>
                            <div className="flex justify-center space-x-3">
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-md"
                                >
                                    Submit
                                </button>
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md mr-2"
                                    onClick={closeModal}
                                >
                                    Cerrar
                                </button>
                            </div>
                        </form>
                    </div>
                </Modal>
            </main>
        </div>
    )
}

export default Table;