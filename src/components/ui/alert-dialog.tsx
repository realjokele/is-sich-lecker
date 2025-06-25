import { AlertDialog as BaseAlertDialog } from '@base-ui-components/react/alert-dialog'
import type * as React from 'react'

import { cn } from '~/utils/cn'

const AlertDialog = ({ ...props }: React.ComponentProps<typeof BaseAlertDialog.Root>) => {
  return <BaseAlertDialog.Root data-slot="alert-dialog" {...props} />
}

const AlertDialogTrigger = ({ ...props }: React.ComponentProps<typeof BaseAlertDialog.Trigger>) => {
  return <BaseAlertDialog.Trigger data-slot="alert-dialog-trigger" {...props} />
}

const AlertDialogPortal = ({ ...props }: React.ComponentProps<typeof BaseAlertDialog.Portal>) => {
  return <BaseAlertDialog.Portal data-slot="alert-dialog-portal" {...props} />
}

const AlertDialogBackdrop = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Backdrop>) => {
  return (
    <BaseAlertDialog.Backdrop
      data-slot="alert-dialog-backdrop"
      className={cn(
        'data-[open]:animate-in data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[open]:fade-in-0 fixed inset-0 z-50 bg-black/40 duration-250',
        className,
      )}
      {...props}
    />
  )
}

const AlertDialogPopup = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Popup>) => {
  return (
    <AlertDialogPortal>
      <AlertDialogBackdrop />
      <BaseAlertDialog.Popup
        data-slot="alert-dialog-popup"
        className={cn(
          'bg-background fixed top-[50%] left-[50%] z-50 grid w-full max-w-[calc(100%-2rem)] translate-x-[-50%] translate-y-[-50%] gap-4 rounded-lg border p-6 shadow-lg duration-200 sm:max-w-lg',
          'data-[open]:animate-in data-[open]:fade-in-0 data-[open]:zoom-in-95',
          'data-[ending-style]:animate-out data-[ending-style]:fade-out-0 data-[ending-style]:zoom-out-95',
          className,
        )}
        {...props}
      />
    </AlertDialogPortal>
  )
}

const AlertDialogHeader = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="alert-dialog-header"
      className={cn('flex flex-col gap-2 text-center sm:text-left', className)}
      {...props}
    />
  )
}

const AlertDialogFooter = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={cn('flex flex-col-reverse gap-2 sm:flex-row sm:justify-end', className)}
      {...props}
    />
  )
}

const AlertDialogTitle = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Title>) => {
  return (
    <BaseAlertDialog.Title
      data-slot="alert-dialog-title"
      className={cn('text-lg font-semibold', className)}
      {...props}
    />
  )
}

const AlertDialogDescription = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Description>) => {
  return (
    <BaseAlertDialog.Description
      data-slot="alert-dialog-description"
      className={cn('text-muted-foreground text-sm', className)}
      {...props}
    />
  )
}

const AlertDialogClose = ({
  className,
  ...props
}: React.ComponentProps<typeof BaseAlertDialog.Close>) => {
  return <BaseAlertDialog.Close className={className} {...props} />
}

AlertDialog.Portal = AlertDialogPortal
AlertDialog.Popup = AlertDialogPopup
AlertDialog.Trigger = AlertDialogTrigger
AlertDialog.Header = AlertDialogHeader
AlertDialog.Footer = AlertDialogFooter
AlertDialog.Title = AlertDialogTitle
AlertDialog.Description = AlertDialogDescription
AlertDialog.Close = AlertDialogClose

export { AlertDialog }
