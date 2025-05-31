import React from "react";
import Typography from "../atoms/Typography";

interface TableProps {
  data: { id: number; value: string }[];
  onDelete?: (id: number) => void;
  className?: string;
}

const Table = ({ data, onDelete, className }: TableProps) => {
  return (
    <div className={`overflow-x-auto rounded-xl shadow bg-white ${className}`}>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="px-4 py-2 text-left">
              <Typography variant="span" color="gray">
                ID
              </Typography>
            </th>
            <th className="px-4 py-2 text-left">
              <Typography variant="span" color="gray">
                Valor
              </Typography>
            </th>
            {onDelete && (
              <th className="px-4 py-2 text-left">
                <Typography variant="span" color="gray">
                  Acciones
                </Typography>
              </th>
            )}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={onDelete ? 3 : 2} className="px-4 py-4 text-center">
                <Typography variant="span" color="gray">
                  Sin datos para mostrar
                </Typography>
              </td>
            </tr>
          ) : (
            data.map(item => (
              <tr key={item.id} className="border-t">
                <td className="px-4 py-2">{item.id}</td>
                <td className="px-4 py-2">{item.value}</td>
                {onDelete && (
                  <td className="px-4 py-2">
                    <button
                      onClick={() => onDelete(item.id)}
                      className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                    >
                      Eliminar
                    </button>
                  </td>
                )}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
