import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue,
  SelectGroup,
  SelectLabel,
} from './select'
import { cn } from '../../lib/utils'
import {type ReactNode } from 'react'

export interface SelectOption {
  value: string
  label: string
  disabled?: boolean
  icon?: ReactNode
}

export interface SelectGroup {
  label: string
  options: SelectOption[]
}

interface CustomSelectProps {
  // Props bAsicas
  value?: string 
  onValueChange?: (value: string) => void
  defaultValue?: string
  placeholder?: string
  disabled?: boolean
  required?: boolean
  
  // Opciones
  options?: SelectOption[]
  groups?: SelectGroup[]
  
  // Personalización
  className?: string
  triggerClassName?: string
  contentClassName?: string
  size?: 'sm' | 'md' | 'lg' | 'xs'
  variant?: 'default' | 'outline' | 'ghost'
  
  // Estados
  error?: boolean
  errorMessage?: string
  success?: boolean
  
  // Labels e info
  label?: string
  helperText?: string
  name?: string
  
  // Iconos
  startIcon?: ReactNode
  endIcon?: ReactNode
}

const sizeClasses = {
    xs:'h-6 text-xs',
  sm: 'h-8 text-sm',
  md: 'h-10 text-base',
  lg: 'h-12 text-lg',
}

const variantClasses = {
  default: 'bg-background border-input',
  outline: 'border border-input bg-transparent',
  ghost: 'border-0 bg-transparent shadow-none',
}

export const CustomSelect = ({
  value,
  onValueChange,
  defaultValue,
  placeholder = "Select an option",
  disabled = false,
  required = false,
  options = [],
  groups = [],
  className,
  triggerClassName,
  contentClassName,
  size = 'md',
  variant = 'default',
  error = false,
  errorMessage,
  success = false,
  label,
  helperText,
  name,
  startIcon,
  endIcon,
}: CustomSelectProps) => {
  const hasGroups = groups.length > 0
  const hasOptions = options.length > 0
  const hasError = error && errorMessage

  return (
    <div className={cn('space-y-2', className)}>
      {/* Label */}
      {label && (
        <label 
          htmlFor={name}
          className={cn(
            "text-sm font-medium leading-none",
            disabled && "opacity-50 cursor-not-allowed",
            hasError && "text-destructive"
          )}
        >
          {label}
          {required && <span className="text-destructive ml-1">*</span>}
        </label>
      )}

      {/* Select */}
      <Select 
        value={value} 
        onValueChange={onValueChange}
        defaultValue={defaultValue}
        disabled={disabled}
        required={required}
        name={name}
      >
        <SelectTrigger 
          className={cn(
            'w-full transition-colors',
            sizeClasses[size],
            variantClasses[variant],
            hasError && "border-destructive focus:ring-destructive",
            success && "border-success focus:ring-success",
            disabled && "opacity-50 cursor-not-allowed",
            triggerClassName
          )}
          id={name}
        >
          <div className="flex items-center gap-2 flex-1">
            {startIcon && (
              <span className={cn(
                "shrink-0",
                size === 'sm' ? 'w-3 h-3' : 
                size === 'md' ? 'w-4 h-4' : 'w-5 h-5'
              )}>
                {startIcon}
              </span>
            )}
            
            <SelectValue placeholder={placeholder} />
            
            {endIcon && (
              <span className={cn(
                "shrink-0 ml-auto",
                size === 'sm' ? 'w-2 h-2' : 
                size === 'md' ? 'w-3 h-3' : 'w-4 h-4'
              )}>
                {endIcon}
              </span>
            )}
          </div>
        </SelectTrigger>
        
        <SelectContent className={contentClassName}>
          {/* Opciones simples */}
          {hasOptions && !hasGroups && (
            options.map((option) => (
              <SelectItem 
                key={option.value} 
                value={option.value}
                disabled={option.disabled}
                className="flex items-center gap-2"
              >
                {option.icon && (
                  <span className="shrink-0 w-4 h-4">
                    {option.icon}
                  </span>
                )}
                {option.label}
              </SelectItem>
            ))
          )}

          {/* Grupos de opciones */}
          {hasGroups && groups.map((group, index) => (
            <SelectGroup key={index}>
              <SelectLabel className="text-xs font-semibold text-muted-foreground px-2 py-1.5">
                {group.label}
              </SelectLabel>
              {group.options.map((option) => (
                <SelectItem 
                  key={option.value} 
                  value={option.value}
                  disabled={option.disabled}
                  className="flex items-center gap-2"
                >
                  {option.icon && (
                    <span className="shrink-0 w-4 h-4">
                      {option.icon}
                    </span>
                  )}
                  {option.label}
                </SelectItem>
              ))}
            </SelectGroup>
          ))}

          {/* Estado vacío */}
          {!hasOptions && !hasGroups && (
            <SelectItem value="empty" disabled>
              No options available
            </SelectItem>
          )}
        </SelectContent>
      </Select>

      {/* Mensajes de ayuda y error */}
      {(helperText || hasError) && (
        <p className={cn(
          "text-xs",
          hasError ? "text-destructive" : "text-muted-foreground"
        )}>
          {hasError ? errorMessage : helperText}
        </p>
      )}
    </div>
  )
}