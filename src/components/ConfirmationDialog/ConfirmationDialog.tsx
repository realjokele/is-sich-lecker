import { AlertDialog } from '~/components/ui/alert-dialog'
import { buttonVariants } from '~/components/ui/button'

type ConfirmationDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  title: string
  description: string
  confirmButtonText?: string
  cancelButtonText?: string
  onConfirm: () => void
}

export function ConfirmationDialog({
  open = false,
  onOpenChange,
  title,
  description,
  confirmButtonText = 'Okay',
  cancelButtonText = 'Abbrechen',
  onConfirm,
}: ConfirmationDialogProps) {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialog.Popup>
        <AlertDialog.Header>
          <AlertDialog.Title>{title}</AlertDialog.Title>
          <AlertDialog.Description>{description}</AlertDialog.Description>
        </AlertDialog.Header>
        <AlertDialog.Footer>
          <AlertDialog.Close className={buttonVariants({ variant: 'outline' })}>
            {cancelButtonText}
          </AlertDialog.Close>
          <AlertDialog.Close
            className={buttonVariants({ variant: 'destructive' })}
            onClick={onConfirm}
          >
            {confirmButtonText}
          </AlertDialog.Close>
        </AlertDialog.Footer>
      </AlertDialog.Popup>
    </AlertDialog>
  )
}
