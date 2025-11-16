
import type { Meta, StoryObj } from '@storybook/react';

import { toast } from 'sonner';
import { Button } from '../ui/button';
import { ThemeProvider } from 'next-themes';
import { Toaster } from './sonner';
import { CircleCheckIcon, OctagonXIcon, TriangleAlertIcon } from 'lucide-react';

const meta = {
  title: 'UI/Toaster',
  component: Toaster,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    position: {
      control: { type: 'select' },
      options: ['top-left', 'top-right', 'bottom-left', 'bottom-right', 'top-center', 'bottom-center'],
    },
    duration: {
      control: { type: 'number' },
    },
    richColors: {
      control: { type: 'boolean' },
      description: 'Activa los colores automáticos para cada tipo de toast',
    },
    closeButton: {
      control: { type: 'boolean' },
    },
    expand: {
      control: { type: 'boolean' },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider attribute="class" defaultTheme="light">
        <div className="p-8 space-y-4">
          <Story />
          <Toaster richColors />
        </div>
      </ThemeProvider>
    ),
  ],
} satisfies Meta<typeof Toaster>;


type Story = StoryObj<typeof meta>;


const ColorToastsDemonstrator = () => {
  return (
    <div className="flex flex-col gap-4">
      <div className="grid grid-cols-2 gap-3">
        <Button 
          onClick={() => toast.success('¡Operación exitosa!')}
          variant="outline"
          className="border-green-200 text-green-700 hover:bg-green-50"
        >
          Success (Verde)
        </Button>
        <Button 
          onClick={() => toast.error('Error crítico')}
          variant="outline"
          className="border-red-200 text-red-700 hover:bg-red-50"
        >
          Error (Rojo)
        </Button>
        <Button 
          onClick={() => toast.warning('Advertencia importante')}
          variant="outline"
          className="border-yellow-200 text-yellow-700 hover:bg-yellow-50"
        >
          Warning (Amarillo)
        </Button>
        <Button 
          onClick={() => toast.info('Información del sistema')}
          variant="outline"
          className="border-blue-200 text-blue-700 hover:bg-blue-50"
        >
          Info (Azul)
        </Button>
        <Button 
          onClick={() => toast.loading('Procesando...')}
          variant="outline"
          className="border-gray-200 text-gray-700 hover:bg-gray-50"
        >
          Loading (Gris)
        </Button>
        <Button 
          onClick={() => toast('Mensaje neutral')}
          variant="outline"
        >
          Default (Neutral)
        </Button>
      </div>

      <div className="p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold mb-2">Probar con y sin richColors:</h3>
        <div className="flex gap-2">
          <Button 
            onClick={() => {
              toast.success('Success con richColors');
            }}
            variant="default"
            size="sm"
          >
            Con richColors
          </Button>
          <Button 
            onClick={() => {
              toast('Mensaje sin colores', {
                description: 'Este toast usa los estilos por defecto'
              });
            }}
            variant="outline"
            size="sm"
          >
            Sin richColors
          </Button>
        </div>
      </div>
    </div>
  );
};

export const ColoredToasts: Story = {
  render: () => <ColorToastsDemonstrator />,
  name: 'Toasts con Colores',
};

// Story para probar el tema oscuro
const ThemeDemonstrator = () => {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 gap-3">
        <Button onClick={() => toast.success('Success en tema claro/oscuro')}>
          Success
        </Button>
        <Button onClick={() => toast.error('Error en tema claro/oscuro')}>
          Error
        </Button>
        <Button onClick={() => toast.warning('Warning en tema claro/oscuro')}>
          Warning
        </Button>
        <Button onClick={() => toast.info('Info en tema claro/oscuro')}>
          Info
        </Button>
      </div>
      
      <div className="text-sm text-gray-500 text-center">
        <p>Cambia entre tema claro y oscuro en los controles de Storybook para ver la diferencia</p>
      </div>
    </div>
  );
};

export const ThemeSupport: Story = {
  render: () => <ThemeDemonstrator />,
  parameters: {
    backgrounds: { default: 'dark' },
  },
};

// Story para comparar con y sin richColors
const RichColorsComparison = () => {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="text-center">
          <h4 className="font-semibold mb-2">Con richColors</h4>
          <Button 
            onClick={() => {
              toast.success('Success con colores');
              toast.error('Error con colores');
              toast.warning('Warning con colores');
            }}
            variant="default"
            size="sm"
          >
            Probar richColors
          </Button>
        </div>
        
        <div className="text-center">
          <h4 className="font-semibold mb-2">Sin richColors</h4>
          <Button 
            onClick={() => {
              toast('Success sin colores', { 
                icon: <CircleCheckIcon className="size-4" />
              });
              toast('Error sin colores', { 
                icon: <OctagonXIcon className="size-4" />
              });
              toast('Warning sin colores', { 
                icon: <TriangleAlertIcon className="size-4" />
              });
            }}
            variant="outline"
            size="sm"
          >
            Probar sin colores
          </Button>
        </div>
      </div>
    </div>
  );
};

export const RichColorsDemo: Story = {
  render: () => <RichColorsComparison />,
};

export default meta;