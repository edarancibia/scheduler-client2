import { useEffect, useState } from "react";
import { ModalProps } from "../../interfaces/ModalProps.interface";
import CreateCustomerModal from "../CreateCustomer.modal";
import { Customer } from "../../interfaces/Customer.interface";

const Modal: React.FC<ModalProps> = ({ data, onClose, onSave, onDelete }) => {
  const formatDateTime = (date: Date | string | undefined) => {
    if (!date) return "";
    const d = new Date(date);
    const year = d.getFullYear();
    const month = String(d.getMonth() + 1).padStart(2, "0");
    const day = String(d.getDate()).padStart(2, "0");
    const hours = String(d.getHours()).padStart(2, "0");
    const minutes = String(d.getMinutes()).padStart(2, "0");
    return `${year}-${month}-${day} ${hours}:${minutes}`;
  };

  const apiUrl = import.meta.env.VITE_API_URL;

  const isDateRange = (
    date: unknown
  ): date is { start: string; end: string } => {
    return (
      typeof date === "object" &&
      date !== null &&
      "start" in date &&
      "end" in date
    );
  };

  const defaultEndDate = formatDateTime(
    data.type === "create" && isDateRange(data.date)
      ? data.date.end
      : data.event?.end
  );

  const [formData, setFormData] = useState<{
    title: string;
    date: string;
    endDate: string;
    customer: string;
    customerId: number;
  }>({
    title: "",
    date: "",
    endDate: "",
    customer: "",
    customerId: 0,
  });

  const [filteredCustomers, setFilteredCustomers] = useState<Customer[]>([]);
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [customerSelected, setCustomerSelected] = useState(false);

  useEffect(() => {
    if (data.date && typeof data.date !== "string") {
      setFormData({
        title: "",
        date: formatDateTime(data.date.start),
        endDate: formatDateTime(defaultEndDate),
        customer: "",
        customerId: 0,
      });
    }
  }, [data]);

  const fetchCustomers = async (term: string) => {
    try {
      const businessId = localStorage.getItem("businessId");
      const token = localStorage.getItem("token");

      if (!businessId || !token) return;

      const response = await fetch(
        `${apiUrl}customers/search?businessId=${businessId}&q=${term}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) throw new Error("Error buscando clientes");

      const results: Customer[] = await response.json();
      setFilteredCustomers(results);
    } catch (error) {
      setFilteredCustomers([]);
    }
  };

  useEffect(() => {
    const delay = setTimeout(() => {
      if (searchTerm.length >= 2) {
        fetchCustomers(searchTerm);
      } else {
        setFilteredCustomers([]);
      }
    }, 300);

    return () => clearTimeout(delay);
  }, [searchTerm]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    if (name === "customer") {
      setSearchTerm(value);
      setCustomerSelected(false);
    }
  };

  const handleSelectCustomer = (customer: Customer) => {
    setFormData({
      ...formData,
      customer: `${customer.name} ${customer.lastname}`,
      customerId: Number(customer.id),
    });
    setFilteredCustomers([]);
    setCustomerSelected(true);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fullDateTime = formData.date;

    onSave({
      id: Date.now(),
      title: formData.title,
      date: fullDateTime,
      endDate: formData.endDate,
      customerId: Number(formData.customerId),
    });

    onClose();
  };

  const handleCustomerSave = (newCustomer: Customer) => {
    const customerId = newCustomer.id;

    setFormData((prevFormData) => ({
      ...prevFormData,
      customer: `${newCustomer.name} ${newCustomer.lastname}`,
      customerId: Number(customerId),
    }));

    setIsCustomerModalOpen(false);
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-opacity-50 z-50">
      <div className="bg-white bg-opacity-90 p-6 rounded-lg shadow-lg w-96 max-w-sm mx-4">
        <form onSubmit={handleSubmit}>
          <h2 className="text-xl font-semibold text-gray-800 mb-6 text-center">
            {data.type === "create" ? "Agendar cita" : "Editar cita"}
          </h2>
          <div className="mb-4 relative">
            <label className="block text-gray-600 font-medium mb-2">
              Cliente
            </label>
            <input
              type="text"
              name="customer"
              value={formData.customer}
              onChange={handleChange}
              placeholder="Buscar cliente"
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            {/* Mostrar lista de clientes filtrados */}
            {formData.customer.length >= 2 && !customerSelected && (
              <ul className="absolute bg-white border border-gray-300 rounded-lg shadow-md w-full mt-1 z-10">
                {filteredCustomers.length > 0 ? (
                  filteredCustomers.map((customer) => (
                    <li
                      key={customer.id}
                      onClick={() => handleSelectCustomer(customer)}
                      className="p-2 hover:bg-gray-200 cursor-pointer"
                    >
                      {customer.name} {customer.lastname}
                    </li>
                  ))
                ) : (
                  <li className="p-2 text-gray-500">
                    No se encontró el cliente
                  </li>
                )}
              </ul>
            )}

            {/* Mostrar el botón para agregar nuevo cliente si no hay resultados */}
            {/*{filteredCustomers.length === 0 && formData.customer.length > 0 && (*/}
            <button
              onClick={() => {
                setIsCustomerModalOpen(true);
              }}
              className="mt-2 text-blue-600 hover:underline"
            >
              Agregar nuevo cliente
            </button>
            {/*})*/}
          </div>

          {/* Resto de campos de formulario */}
          <div className="mb-4">
            <input
              type="hidden"
              name="customerId"
              value={formData.customerId || ""}
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">
              Titulo
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleChange}
              placeholder="Titulo"
              required
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-600 font-medium mb-2">
              Fecha y hora
            </label>
            <input
              type="text"
              name="date"
              value={formData.date}
              onChange={handleChange}
              placeholder="YYYY-MM-DD HH:MM"
              required
              readOnly
              className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            type="submit"
            className="w-full py-3 mb-4 text-white bg-blue-600 hover:bg-blue-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {data.type === "create" ? "Guardar" : "Actualizar"}
          </button>
          {data.type === "edit" && onDelete && (
            <button type="button" onClick={() => onDelete?.(data.event!.id)}>
              Eliminar
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="w-full py-3 text-gray-600 bg-gray-300 hover:bg-gray-400 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-500"
          >
            Cancelar
          </button>
        </form>
      </div>

      {/* Modal para crear un cliente */}
      {isCustomerModalOpen && (
        <CreateCustomerModal
          onClose={() => setIsCustomerModalOpen(false)}
          onSave={handleCustomerSave}
        />
      )}
    </div>
  );
};

export default Modal;
