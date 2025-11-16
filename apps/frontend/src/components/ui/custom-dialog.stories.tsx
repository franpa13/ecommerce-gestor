// CustomDialog.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';


import { CustomDialog } from './custom-dialog';

const meta = {
  title: 'UI/CustomDialog',
  component: CustomDialog,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: {
        type: 'select',
        options: ['sm', 'md', 'lg', 'xl', 'full', 'custom'],
      },
    },
    width: {
      control: 'text',
      if: { arg: 'size', eq: 'custom' }
    },
    className: {
      control: 'text',
    },
  },
} satisfies Meta<typeof CustomDialog>;

export default meta;
type Story = StoryObj<typeof meta>;

// Story básico
export const Default: Story = {
  args: {
    trigger: "Abrir Dialog",
    title: "Título del Dialog",
    description: "Esta es una descripción del dialog de ejemplo.",
    children: (
      <div className="py-4">
        <p>Contenido personalizado del dialog. Puede incluir cualquier componente React.</p>
        <div className="mt-4 flex gap-2 justify-end">
          <button className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Aceptar</button>
        </div>
      </div>
    ),
    size: "md",
  },
};

// Dialog con formulario
export const WithForm: Story = {
  args: {
    trigger: "Abrir Formulario",
    title: "Registro de Usuario",
    description: "Complete el formulario para registrar un nuevo usuario.",
    children: (
      <div className="py-4 space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Nombre</label>
          <input 
            type="text" 
            className="w-full p-2 border rounded"
            placeholder="Ingrese su nombre"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-1">Email</label>
          <input 
            type="email" 
            className="w-full p-2 border rounded"
            placeholder="Ingrese su email"
          />
        </div>
        <div className="flex gap-2 justify-end mt-6">
          <button className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Registrar</button>
        </div>
      </div>
    ),
    size: "md",
  },
};

// Dialog sin título ni descripción
export const Minimal: Story = {
  args: {
    trigger: "Dialog Minimal",
    children: (
      <div className="py-4">
        <p>Este es un dialog minimalista sin título ni descripción.</p>
        <div className="mt-4 flex gap-2 justify-end">
          <button className="px-4 py-2 bg-gray-300 rounded">Cerrar</button>
        </div>
      </div>
    ),
    size: "sm",
  },
};

// Dialog con trigger personalizado
export const CustomTrigger: Story = {
  args: {
    trigger: (
      <button className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600">
        Trigger Personalizado
      </button>
    ),
    title: "Trigger Custom",
    children: (
      <div className="py-4">
        <p>Este dialog usa un trigger personalizado en lugar del botón por defecto.</p>
      </div>
    ),
    size: "md",
  },
};

// Componente para demostrar los diferentes tamaños
const SizeDemonstrator = () => {
  const sizes = ['sm', 'md', 'lg', 'xl', 'full'] as const;
  
  return (
    <div className="space-y-4">
      {sizes.map((size) => (
        <div key={size} className="flex items-center gap-4">
          <CustomDialog
            trigger={`Abrir ${size.toUpperCase()}`}
            title={`Dialog ${size.toUpperCase()}`}
            description={`Este es un dialog de tamaño ${size}`}
            size={size}
          >
            <div className="py-4">
              <p>Contenido del dialog {size}. Ancho: {size === 'sm' ? '400px' : 
                 size === 'md' ? '500px' : 
                 size === 'lg' ? '600px' : 
                 size === 'xl' ? '900px' : '95vw'}</p>
              <div className="mt-4 flex gap-2 justify-end">
                <button className="px-4 py-2 bg-gray-300 rounded">Cerrar</button>
              </div>
            </div>
          </CustomDialog>
          <span className="text-sm text-gray-600">
            {size === 'sm' ? '400px' : 
             size === 'md' ? '500px' : 
             size === 'lg' ? '600px' : 
             size === 'xl' ? '900px' : '95vw'}
          </span>
        </div>
      ))}
    </div>
  );
};

export const AllSizes: Story = {
  render: () => <SizeDemonstrator />,
};

// Componente para demostrar tamaños personalizados
const CustomSizesDemonstrator = () => {
  const customSizes = [
    { label: "300px", value: "300px" },
    { label: "700px", value: "700px" },
    { label: "80%", value: "80%" },
    { label: "50vw", value: "50vw" },
    { label: "Tailwind: max-w-2xl", value: "max-w-2xl" },
    { label: "Tailwind: max-w-[800px]", value: "max-w-[800px]" },
  ];
  
  return (
    <div className="space-y-4">
      {customSizes.map((size) => (
        <div key={size.label} className="flex items-center gap-4">
          <CustomDialog
            trigger={`Abrir ${size.label}`}
            title={`Dialog Personalizado`}
            description={`Tamaño: ${size.label}`}
            size={size.value}
          >
            <div className="py-4">
              <p>Este dialog usa un tamaño personalizado: <strong>{size.label}</strong></p>
              <div className="mt-4 flex gap-2 justify-end">
                <button className="px-4 py-2 bg-gray-300 rounded">Cerrar</button>
              </div>
            </div>
          </CustomDialog>
        </div>
      ))}
    </div>
  );
};

export const CustomWidths: Story = {
  render: () => <CustomSizesDemonstrator />,
};

// Dialog con contenido largo para probar scroll
export const WithLongContent: Story = {
  args: {
    trigger: "Contenido Largo",
    title: "Dialog con Contenido Extenso",
    description: "Este dialog contiene mucho contenido para demostrar el scroll.",
    size: "lg",
    children: (
      <div className="py-4 max-h-80 overflow-y-auto">
        <h3 className="font-semibold mb-2">Sección 1</h3>
        <p className="mb-4">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor 
          incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis 
          nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
        </p>
        
        <h3 className="font-semibold mb-2">Sección 2</h3>
        <p className="mb-4">
          Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore 
          eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, 
          sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>
        
        <h3 className="font-semibold mb-2">Sección 3</h3>
        <p className="mb-4">
          Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium 
          doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore 
          veritatis et quasi architecto beatae vitae dicta sunt explicabo.
        </p>
        
        <h3 className="font-semibold mb-2">Sección 4</h3>
        <p className="mb-4">
          Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, 
          sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.
        </p>
        
        <div className="mt-4 flex gap-2 justify-end">
          <button className="px-4 py-2 bg-gray-300 rounded">Cancelar</button>
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Aceptar</button>
        </div>
      </div>
    ),
  },
};

// Dialog con className personalizado
export const WithCustomClass: Story = {
  args: {
    trigger: "Con Clase Personalizada",
    title: "Dialog con Estilos Custom",
    description: "Este dialog usa className personalizado para estilos adicionales.",
    className: "bg-gradient-to-br from-blue-50 to-purple-50 border-2 border-blue-300",
    children: (
      <div className="py-4">
        <p>Dialog con fondo gradiente y borde personalizado.</p>
        <div className="mt-4 flex gap-2 justify-end">
          <button className="px-4 py-2 bg-gray-300 rounded">Cerrar</button>
        </div>
      </div>
    ),
    size: "md",
  },
};

// // Ejemplo interactivo con estado
// const InteractiveExample = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const [inputValue, setInputValue] = useState('');
  
//   return (
//     <div className="space-y-4">
//       <button 
//         onClick={() => setIsOpen(true)}
//         className="px-4 py-2 bg-purple-500 text-white rounded"
//       >
//         Abrir Dialog Interactivo
//       </button>
      
//       <CustomDialog
//         trigger={<span style={{ display: 'none' }}>Hidden</span>}
//         open={isOpen}
//         onOpenChange={setIsOpen}
//         title="Dialog Interactivo"
//         description="Este dialog maneja estado externo."
//       >
//         <div className="py-4 space-y-4">
//           <div>
//             <label className="block text-sm font-medium mb-1">Valor:</label>
//             <input 
//               type="text" 
//               value={inputValue}
//               onChange={(e) => setInputValue(e.target.value)}
//               className="w-full p-2 border rounded"
//               placeholder="Escribe algo..."
//             />
//           </div>
//           <p>Valor actual: <strong>{inputValue || '(vacío)'}</strong></p>
//           <div className="flex gap-2 justify-end">
//             <button 
//               onClick={() => setIsOpen(false)}
//               className="px-4 py-2 bg-gray-300 rounded"
//             >
//               Cerrar
//             </button>
//             <button 
//               onClick={() => {
//                 alert(`Valor guardado: ${inputValue}`);
//                 setIsOpen(false);
//               }}
//               className="px-4 py-2 bg-purple-500 text-white rounded"
//             >
//               Guardar
//             </button>
//           </div>
//         </div>
//       </CustomDialog>
//     </div>
//   );
// };

// export const Interactive: Story = {
//   render: () => <InteractiveExample />,
// };