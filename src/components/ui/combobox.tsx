import React from 'react'

import type {
  ComboBoxProps as ComboboxPrimitiveProps,
  InputProps,
  ListBoxProps,
  ValidationResult,
} from 'react-aria-components'
import {
  Button as ButtonPrimitive,
  ComboBoxContext,
  ComboBoxStateContext,
  ComboBox as ComboboxPrimitive,
  useSlottedContext,
} from 'react-aria-components'
import { Button } from './button'
import { DropdownItem, DropdownLabel, DropdownSection } from './dropdown'
import { Description, FieldError, FieldGroup, Input, Label } from './field'
import { ListBox } from './list-box'
import { PopoverContent, type PopoverContentProps } from './popover'
import { composeTailwindRenderProps } from './primitive'
import { ChevronDownIcon, XIcon } from 'lucide-react'
interface ComboBoxProps<T extends object> extends Omit<ComboboxPrimitiveProps<T>, 'children'> {
  label?: string
  placeholder?: string
  description?: string | null
  errorMessage?: string | ((validation: ValidationResult) => string)
  children: React.ReactNode
}

const ComboBox = <T extends object>({
  label,
  description,
  errorMessage,
  children,
  className,
  ...props
}: ComboBoxProps<T>) => {
  return (
    <ComboboxPrimitive
      {...props}
      className={composeTailwindRenderProps(className, 'group flex w-full flex-col gap-y-1.5')}
    >
      {label && <Label>{label}</Label>}
      {children}
      {description && <Description>{description}</Description>}
      <FieldError>{errorMessage}</FieldError>
    </ComboboxPrimitive>
  )
}

interface ComboBoxListProps<T extends object>
  extends Omit<ListBoxProps<T>, 'layout' | 'orientation'>,
    Pick<PopoverContentProps, 'placement'> {
  popoverClassName?: PopoverContentProps['className']
}

const ComboBoxList = <T extends object>({
  children,
  items,
  className,
  popoverClassName,
  ...props
}: ComboBoxListProps<T>) => {
  return (
    <PopoverContent
      showArrow={false}
      respectScreen={false}
      isNonModal
      className={composeTailwindRenderProps(popoverClassName, 'sm:min-w-(--trigger-width)')}
      placement={props.placement}
    >
      <ListBox
        className={composeTailwindRenderProps(className, 'border-0 shadow-none')}
        layout="stack"
        orientation="vertical"
        items={items}
        {...props}
      >
        {children}
      </ListBox>
    </PopoverContent>
  )
}

const ComboBoxInput = (props: InputProps) => {
  const context = useSlottedContext(ComboBoxContext)!
  return (
    <FieldGroup className="relative pl-0">
      <Input {...props} placeholder={props?.placeholder} />
      <Button
        size="square-petite"
        intent="plain"
        className="pressed:bg-transparent **:data-[slot=icon]:pressed:text-fg **:data-[slot=icon]:text-muted-fg **:data-[slot=icon]:hover:text-fg h-7 w-8 rounded outline-offset-0 hover:bg-transparent active:bg-transparent"
      >
        {!context?.inputValue && (
          <ChevronDownIcon className="group-open:text-fg size-4 shrink-0 transition duration-200 group-open:rotate-180" />
        )}
      </Button>
      {context?.inputValue && <ComboBoxClearButton />}
    </FieldGroup>
  )
}

const ComboBoxClearButton = () => {
  const state = React.use(ComboBoxStateContext)

  return (
    <ButtonPrimitive
      className="text-muted-fg hover:text-fg absolute inset-y-0 right-0 flex items-center pr-2 focus:outline-hidden"
      slot={null}
      aria-label="Clear"
      onPress={() => {
        state?.setSelectedKey(null)
        state?.open()
      }}
    >
      <XIcon className="animate-in size-4" />
    </ButtonPrimitive>
  )
}

const ComboBoxOption = DropdownItem
const ComboBoxLabel = DropdownLabel
const ComboBoxSection = DropdownSection

ComboBox.Input = ComboBoxInput
ComboBox.List = ComboBoxList
ComboBox.Option = ComboBoxOption
ComboBox.Label = ComboBoxLabel
ComboBox.Section = ComboBoxSection

export type { ComboBoxProps, ComboBoxListProps }
export { ComboBox }
