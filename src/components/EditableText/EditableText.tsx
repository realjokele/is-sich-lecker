import React from 'react'
import { Button as RACButton } from 'react-aria-components'
import { flushSync } from 'react-dom'

import { cn } from '~/utils/tw'
import { Button } from '../ui/button'
import { FieldGroup, Input } from '../ui/field'
import { Pencil, Check } from 'lucide-react'

type EditableTextProps = {
  fieldName: string
  value: string
  className?: string
  mutationFn: (test: string) => void
}

export function EditableText({ fieldName, value, className, mutationFn }: EditableTextProps) {
  const [isEditing, setIsEditing] = React.useState(false)
  const [displayValue, setDisplayValue] = React.useState(value)
  const inputRef = React.useRef<HTMLInputElement>(null)
  const buttonRef = React.useRef<HTMLButtonElement>(null)

  function handlePress() {
    // Force a synchronous update to ensure input.focus() runs after the state update
    flushSync(() => {
      setIsEditing(true)
    })
    inputRef.current?.focus()
  }

  function handleKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === 'Escape') {
      flushSync(() => {
        setIsEditing(false)
      })
      buttonRef.current?.focus()
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const formData = new FormData(e.currentTarget)
    mutationFn(String(formData.get(fieldName)))
    flushSync(() => {
      setIsEditing(false)
    })
    buttonRef.current?.focus()
  }

  return (
    <span className="inline-block">
      {isEditing ? (
        <form method="post" onSubmit={(e) => handleSubmit(e)}>
          <div className="flex items-center gap-2">
            <FieldGroup>
              <Input
                name={fieldName}
                type="text"
                defaultValue={value}
                className={cn(
                  'min-w-[100px] rounded py-1 pr-2 pl-0 text-left text-3xl outline-1 outline-gray-300 focus:outline-2 focus:outline-blue-500',
                  className,
                )}
                autoFocus
                onKeyDown={handleKeyDown}
                aria-label="Title"
                // onBlur={(event) => {
                //   if (inputRef.current?.value !== value) {
                //     mutationFn(inputRef.current?.value)
                //   } else {
                //     setIsEditing(false)
                //   }
                //   buttonRef.current?.focus()
                // }}
                // ref={inputRef}
              />
            </FieldGroup>
            <Button type="submit">
              <Check className="h-5 w-5" />
            </Button>
          </div>
        </form>
      ) : (
        <RACButton
          className={cn('min-w-[100px] py-1 pr-2 pl-0 text-left focus:outline-none', className)}
          onPress={handlePress}
          ref={buttonRef}
        >
          <span className="flex items-center gap-4">
            {displayValue} <Pencil className="h-5 w-5 text-gray-400" />
          </span>
        </RACButton>
      )}
    </span>
  )
}
