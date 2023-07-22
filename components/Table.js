import React, { useState, useEffect, useContext } from 'react';
import Modal from 'react-modal';
import { TableContext } from "../context/TableContext";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



const Table = () => {
    const [data, setData] = useState([]);
    const [modalIsOpen, setModalIsOpen] = useState(false);
    const [formValues, setFormValues] = useState({});
    const [codigosPostales, setCodigosPostales] = useState([]);
    const [editMode, setEditMode] = useState(false);
    const [editItem, setEditItem] = useState(null);
    const [editedData, setEditedData] = useState({});
    const { selectedTable } = useContext(TableContext);

    const getBaseUrl = () => {
        return `http://localhost:4000/api/${selectedTable}`;
    };

    const baseUrl = getBaseUrl();
    const text = ""

    useEffect(() => {
        console.log(baseUrl)
        fetch(getBaseUrl())
            .then((response) => response.json())
            .then((data) => {
                setData(data);
            })
            .catch((error) => {
                console.error("Error al obtener datos:", error);
            });

        fetch('http://localhost:4000/api/codigospostales/informacion')
            .then((response) => response.json())
            .then((data) => {
                setCodigosPostales(data);
            })
            .catch((error) => {
                console.error('Error al obtener códigos postales:', error);
            });
    }, [selectedTable]);

    const columnNames = data.length > 0 ? Object.keys(data[0]) : [];

    const handleSave = () => {
        const baseUrl = getBaseUrl();

        fetch(`${baseUrl}/${editedData.venta_id || editedData.dni || editedData.proveedor_id || editedData.id_producto || editedData.codigo_postal}`, {
            method: 'PUT', // Utiliza el método PUT para actualizar el elemento
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(editedData),
        })
            .then((response) => response.json())
            .then((data) => {
                // Muestra una notificación o mensaje de éxito si lo deseas
                console.log(data);

                // Actualiza el estado de "data" para reflejar los cambios en la tabla
                setData((prevData) =>
                    prevData.map((item) =>
                        item.dni === editedData.dni ? { ...item, ...editedData } : item
                    )
                );

                // Finaliza el modo de edición y limpia los datos editados
                setEditMode(false);
                setEditedData({});
            })
            .catch((error) => {
                console.error('Error al actualizar el elemento:', error);
            });
    };

    const handleDelete = (item) => {
        // Obtenemos la URL base de la API según la tabla seleccionada
        const baseUrl = getBaseUrl();

        // Obtenemos el ID del elemento a eliminar
        const idToDelete = item?.venta_id || item?.dni || item?.proveedor_id || item?.id_producto || item?.codigo_postal;

        // Realiza la solicitud DELETE al backend para eliminar el elemento
        fetch(`${baseUrl}/${idToDelete}`, {
            method: 'DELETE', // Utiliza el método DELETE para eliminar el elemento
        })
            .then((response) => response.json())
            .then((data) => {
                // Actualiza el estado eliminando el elemento de la lista
                setData((prevData) => prevData.filter((el) => el.id !== idToDelete));

                // Si la eliminación fue exitosa y el elemento era un código postal, actualizamos los clientes
                if (item?.codigo_postal && data.success) {
                    updateClientesWithCodigoPostal(idToDelete);
                }
            })
            .catch((error) => {
                console.error('Ocurrió un error al eliminar el codigo postal, revise la tabla clientes y actualize los codigos postales de los clientes que esten utilizando el codigo postal el cual usted desea eliminar luego intentelo de nuevo, informacion mas detallada del erorr:', error);

            });
            window.location.reload()
    };


    const handleSubmit = (e) => {
        e.preventDefault();


        // Crea un objeto con los datos del formulario
        const newElement = { ...formValues };

        // Realiza la solicitud POST al backend
        fetch(getBaseUrl(), {
            method: 'POST', // Utiliza el método POST para agregar un nuevo elemento
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newElement),
        })
            .then((response) => response.json())
            .then((data) => {
                // Actualiza el estado con los datos devueltos por el backend
                setData((prevData) => [...prevData, data]);

                // Cierra el modal

            })
            .catch((error) => {
                console.error('Error al agregar un nuevo elemento:', error);
            });
        window.location.reload();
    };
    const handleCancel = () => {
        setEditMode(false);
        setEditedData({});
    };

    const handleAdd = () => {
        setModalIsOpen(true);
    };

    const closeModal = () => {
        setModalIsOpen(false);
        setEditMode(false);
        setEditItem(null);
        setFormValues({});
    };

    const handleEdit = (item) => {
        setEditItem(item); // Establecer el elemento seleccionado en el estado local
        setEditedData({ ...item }); // Establecer los datos editados para el elemento seleccionado
        setEditMode(true);
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
                            {columnNames.map((columnName, index) => (
                                <th key={index} className="py-3 px-6 font-bold uppercase tracking-wider">
                                    {columnName}
                                </th>
                            ))}
                            <th className="py-3 px-6 font-bold uppercase tracking-wider">Acciones</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {data.length > 0 ? (
                            data.map((item, index) => (
                                <tr key={index}>
                                    {columnNames.map((columnName, colIndex) => (
                                        <td key={colIndex} className="py-4 px-6">
                                            {editMode && editItem?.dni === item?.dni ? ( // Verifica si estamos en modo de edición y el dni coincide
                                                <input
                                                    type="text"
                                                    value={editedData[columnName] || ''}
                                                    onChange={(e) => handleInputChange(e, columnName)}
                                                    className="input-edit w-20"
                                                />
                                            ) : (
                                                item[columnName]
                                            )}
                                        </td>
                                    ))}
                                    <td className="py-4 px-6 space-x-3">
                                        {editMode && editItem && editItem.dni === item.dni ? (
                                            <>
                                                <button
                                                    className="btn-save bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                                    onClick={handleSave}
                                                >
                                                    Listo
                                                </button>
                                                <button
                                                    className="btn-cancel bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                                                    onClick={handleCancel}
                                                >
                                                    Cancelar
                                                </button>
                                            </>
                                        ) : (
                                            <>
                                                <button
                                                    className="btn-edit bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                                                    onClick={() => handleEdit(item)}
                                                >
                                                    Editar
                                                </button>
                                                <button
                                                    className="btn-delete bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded"
                                                    onClick={() => handleDelete(item)}
                                                >
                                                    Eliminar
                                                </button>
                                            </>
                                        )}
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td colSpan={columnNames.length + 1} className="py-4 px-6 text-center">
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
                                {columnNames.map((columnName, index) => {
                                    // Omitir la generación del campo "Código Postal" dentro del .map
                                    if (columnName === "codigo_postal" && baseUrl === "http://localhost:4000/api/clientes") {
                                        return (
                                            <div>
                                                <label htmlFor="codigo_postal" className="font-bold">
                                                    Código Postal:
                                                </label>
                                                <select
                                                    id="codigo_postal"
                                                    name="codigo_postal"
                                                    value={formValues.codigo_postal || ''}
                                                    onChange={handleInputChange}
                                                    className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                                                >
                                                    <option value="">Seleccionar Código Postal</option>
                                                    {codigosPostales.map((codigoPostal) => (
                                                        <option key={codigoPostal.codigo_postal} value={codigoPostal.codigo_postal}>
                                                            {codigoPostal.codigo_postal}
                                                        </option>
                                                    ))}
                                                </select>
                                            </div>
                                        )
                                    }

                                    return (
                                        <div key={index}>
                                            <label htmlFor={columnName} className="font-bold">
                                                {columnName}:
                                            </label>
                                            <input
                                                type="text"
                                                id={columnName}
                                                name={columnName}
                                                value={formValues[columnName] || ''}
                                                onChange={handleInputChange}
                                                className="border border-gray-300 rounded-md px-4 py-2 w-full focus:outline-none focus:border-blue-500"
                                            />
                                        </div>
                                    );
                                })}
                                {/* Mostrar el campo "Código Postal" por separado fuera del .map */}
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
                <ToastContainer/>
            </main>
        </div>
    );
};

export default Table;
