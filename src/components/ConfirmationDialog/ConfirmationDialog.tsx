import {
  AlertDialog,
  AlertDialogClose,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogPopup,
  AlertDialogTitle,
} from '~/components/ui/alert-dialog'
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
      <AlertDialogPopup>
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogClose className={buttonVariants({ variant: 'outline' })}>{cancelButtonText}</AlertDialogClose>
          <AlertDialogClose className={buttonVariants({ variant: 'default' })} onClick={onConfirm}>
            {confirmButtonText}
          </AlertDialogClose>
        </AlertDialogFooter>
      </AlertDialogPopup>
    </AlertDialog>
  )
}
