import React from 'react'
import { createFormHookContexts, createFormHook } from '@tanstack/react-form'
import { TextField } from '~/components/form/textfield'
import { SubmitButton } from '~/components/form/submit-button'

// export useFieldContext for use in your custom components
export const { formContext, fieldContext, useFormContext, useFieldContext } = createFormHookContexts()

export const { useAppForm, withForm } = createFormHook({
  fieldContext,
  formContext,
  fieldComponents: {
    TextField,
  },
  formComponents: {
    SubmitButton,
  },
})
