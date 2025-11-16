// CustomSelect.stories.tsx
import type { Meta, StoryObj } from '@storybook/react';

import { 
  SunIcon, 
  MoonIcon, 
  MonitorIcon,
  UserIcon,
  SettingsIcon,
  ShieldIcon,
  MailIcon,
  BellIcon,
  AlertCircleIcon,
  CheckCircleIcon,
} from 'lucide-react';
import { useState } from 'react';
import { CustomSelect, type SelectGroup, type SelectOption } from './custom-select';

const meta = {
  title: 'UI/CustomSelect',
  component: CustomSelect,
  parameters: {
    layout: 'centered',
  },
  tags: ['autodocs'],
  argTypes: {
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg'],
    },
    variant: {
      control: { type: 'select' },
      options: ['default', 'outline', 'ghost'],
    },
    disabled: {
      control: { type: 'boolean' },
    },
    error: {
      control: { type: 'boolean' },
    },
    success: {
      control: { type: 'boolean' },
    },
    required: {
      control: { type: 'boolean' },
    },
  },
} satisfies Meta<typeof CustomSelect>;


type Story = StoryObj<typeof CustomSelect>;

// Opciones básicas
const basicOptions: SelectOption[] = [
  { value: 'light', label: 'Light' },
  { value: 'dark', label: 'Dark' },
  { value: 'system', label: 'System' },
];

// Opciones con iconos
const iconOptions: SelectOption[] = [
  { value: 'light', label: 'Light', icon: <SunIcon className="w-4 h-4" /> },
  { value: 'dark', label: 'Dark', icon: <MoonIcon className="w-4 h-4" /> },
  { value: 'system', label: 'System', icon: <MonitorIcon className="w-4 h-4" /> },
];

// Grupos de opciones
const groupedOptions: SelectGroup[] = [
  {
    label: 'Personal',
    options: [
      { value: 'profile', label: 'Profile', icon: <UserIcon className="w-4 h-4" /> },
      { value: 'settings', label: 'Settings', icon: <SettingsIcon className="w-4 h-4" /> },
    ],
  },
  {
    label: 'System',
    options: [
      { value: 'security', label: 'Security', icon: <ShieldIcon className="w-4 h-4" /> },
      { value: 'notifications', label: 'Notifications', icon: <BellIcon className="w-4 h-4" /> },
      { value: 'email', label: 'Email', icon: <MailIcon className="w-4 h-4" /> },
    ],
  },
];

// Opciones deshabilitadas
const disabledOptions: SelectOption[] = [
  { value: 'active', label: 'Active' },
  { value: 'inactive', label: 'Inactive', disabled: true },
  { value: 'pending', label: 'Pending', disabled: true },
  { value: 'approved', label: 'Approved' },
];

// Story básica
export const Basic: Story = {
  args: {
    placeholder: 'Select a theme',
    options: basicOptions,
  },
};

// Con label y helper text
export const WithLabel: Story = {
  args: {
    label: 'Theme',
    helperText: 'Choose your preferred theme',
    placeholder: 'Select a theme',
    options: basicOptions,
  },
};

// Con iconos
export const WithIcons: Story = {
  args: {
    label: 'Theme',
    placeholder: 'Select a theme',
    options: iconOptions,
  },
};

// Con grupos
export const WithGroups: Story = {
  args: {
    label: 'Settings',
    placeholder: 'Select a setting',
    groups: groupedOptions,
  },
};

// Con estado de error
export const WithError: Story = {
  args: {
    label: 'Theme',
    placeholder: 'Select a theme',
    options: basicOptions,
    error: true,
    errorMessage: 'This field is required',
  },
};

// Con estado de éxito
export const WithSuccess: Story = {
  args: {
    label: 'Theme',
    placeholder: 'Select a theme',
    options: basicOptions,
    success: true,
    helperText: 'Theme selected successfully',
  },
};

// Deshabilitado
export const Disabled: Story = {
  args: {
    label: 'Theme',
    placeholder: 'Select a theme',
    options: basicOptions,
    disabled: true,
    helperText: 'This field is disabled',
  },
};

// Con opciones deshabilitadas
export const WithDisabledOptions: Story = {
  args: {
    label: 'Status',
    placeholder: 'Select status',
    options: disabledOptions,
  },
};

// Diferentes tamaños
export const Sizes: Story = {
  render: () => (
    <div className="space-y-4">
      <CustomSelect
        size="sm"
        placeholder="Small select"
        options={basicOptions}
      />
      <CustomSelect
        size="md"
        placeholder="Medium select"
        options={basicOptions}
      />
      <CustomSelect
        size="lg"
        placeholder="Large select"
        options={basicOptions}
      />
    </div>
  ),
};

// Diferentes variantes
export const Variants: Story = {
  render: () => (
    <div className="space-y-4">
      <CustomSelect
        variant="default"
        placeholder="Default variant"
        options={basicOptions}
      />
      <CustomSelect
        variant="outline"
        placeholder="Outline variant"
        options={basicOptions}
      />
      <CustomSelect
        variant="ghost"
        placeholder="Ghost variant"
        options={basicOptions}
      />
    </div>
  ),
};

// Con iconos personalizados en el trigger
export const WithTriggerIcons: Story = {
  render: () => (
    <div className="space-y-4">
      <CustomSelect
        label="With start icon"
        startIcon={<SunIcon className="w-4 h-4" />}
        placeholder="Select theme"
        options={iconOptions}
      />
      <CustomSelect
        label="With end icon"
        endIcon={<SettingsIcon className="w-4 h-4" />}
        placeholder="Select option"
        options={basicOptions}
      />
    </div>
  ),
};

// Ejemplo interactivo con estado
export const Interactive: Story = {
  render: function Render() {
    const [value, setValue] = useState('');
    
    const statusOptions: SelectOption[] = [
      { value: 'active', label: 'Active', icon: <CheckCircleIcon className="w-4 h-4 text-green-500" /> },
      { value: 'inactive', label: 'Inactive', icon: <MoonIcon className="w-4 h-4 text-gray-500" /> },
      { value: 'error', label: 'Error', icon: <AlertCircleIcon className="w-4 h-4 text-red-500" /> },
    ];

    return (
      <div className="space-y-4 w-80">
        <CustomSelect
          label="Status"
          value={value}
          onValueChange={setValue}
          options={statusOptions}
          placeholder="Select status"
        />
        <div className="p-3 bg-gray-100 rounded text-sm">
          <p>Selected value: <strong>{value || 'None'}</strong></p>
        </div>
      </div>
    );
  },
};

// Ejemplo de formulario
export const InForm: Story = {
  render: function Render() {
    const [formData, setFormData] = useState({
      theme: '',
      notifications: '',
      language: '',
    });

    const themeOptions: SelectOption[] = [
      { value: 'light', label: 'Light Theme' },
      { value: 'dark', label: 'Dark Theme' },
      { value: 'auto', label: 'Auto' },
    ];

    const notificationOptions: SelectOption[] = [
      { value: 'all', label: 'All notifications' },
      { value: 'important', label: 'Important only' },
      { value: 'none', label: 'None' },
    ];

    const languageOptions: SelectOption[] = [
      { value: 'en', label: 'English' },
      { value: 'es', label: 'Spanish' },
      { value: 'fr', label: 'French' },
      { value: 'de', label: 'German' },
    ];

    return (
      <div className="space-y-6 w-96 p-6 border rounded-lg">
        <h3 className="text-lg font-semibold">User Preferences</h3>
        
        <CustomSelect
          label="Theme"
          value={formData.theme}
          onValueChange={(value) => setFormData(prev => ({ ...prev, theme: value }))}
          options={themeOptions}
          placeholder="Select theme"
          required
        />

        <CustomSelect
          label="Notifications"
          value={formData.notifications}
          onValueChange={(value) => setFormData(prev => ({ ...prev, notifications: value }))}
          options={notificationOptions}
          placeholder="Select notification preference"
          helperText="Choose how you want to receive notifications"
        />

        <CustomSelect
          label="Language"
          value={formData.language}
          onValueChange={(value) => setFormData(prev => ({ ...prev, language: value }))}
          options={languageOptions}
          placeholder="Select language"
        />

        <div className="p-3 bg-blue-50 rounded text-sm">
          <h4 className="font-medium mb-2">Current Selection:</h4>
          <pre>{JSON.stringify(formData, null, 2)}</pre>
        </div>
      </div>
    );
  },
};

// Estado vacío
export const Empty: Story = {
  args: {
    label: 'Empty Select',
    placeholder: 'No options available',
    options: [],
  },
};

export default meta;